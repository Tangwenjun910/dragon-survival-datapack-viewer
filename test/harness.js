'use strict';
/*
 * Headless harness for the compiled extension diagnostics (src/diagnostics.ts).
 *
 * The extension imports the `vscode` API, which only exists inside a VS Code
 * extension host. This harness injects a minimal stub and drives the engine
 * through the very same event handlers VS Code would call, so crafted datapack
 * JSON can be validated from plain Node.
 *
 * Usage:
 *   const { runDiagnostics } = require('./harness');
 *   const result = runDiagnostics('data/test/dragonsurvival/dragon_ability/x.json', jsonText);
 *   result.diagnostics -> [{ severity, message, line, character, lineText }]
 */

const path = require('path');
const Module = require('module');

const WORKSPACE = path.resolve(__dirname, '..');
// Compiled extension code; override with DSH_BUILD_DIR when building elsewhere.
const BUILD_DIR = process.env.DSH_BUILD_DIR
    ? path.resolve(WORKSPACE, process.env.DSH_BUILD_DIR)
    : path.join(WORKSPACE, 'out');

// ---------------------------------------------------------------------------
// vscode stub
// ---------------------------------------------------------------------------

class Position {
    constructor(line, character) {
        this.line = line;
        this.character = character;
    }
    translate(lineDelta = 0, characterDelta = 0) {
        return new Position(this.line + lineDelta, this.character + characterDelta);
    }
    isEqual(other) {
        return this.line === other.line && this.character === other.character;
    }
    isBefore(other) {
        return this.line < other.line || (this.line === other.line && this.character < other.character);
    }
}

class Range {
    constructor(start, end) {
        if (typeof start === 'number') {
            this.start = new Position(start, end === undefined ? start : end);
            this.end = this.start;
        } else {
            this.start = start;
            this.end = end === undefined ? start : end;
        }
    }
    get isEmpty() {
        return this.start.isEqual(this.end);
    }
    get isSingleLine() {
        return this.start.line === this.end.line;
    }
}

const DiagnosticSeverity = { Error: 0, Warning: 1, Information: 2, Hint: 3 };

class Diagnostic {
    constructor(range, message, severity) {
        this.range = range;
        this.message = message;
        this.severity = severity;
    }
}

class Disposable {
    constructor(fn) {
        this.dispose = fn || (() => {});
    }
    static from(...items) {
        return new Disposable(() => items.forEach(i => i && i.dispose && i.dispose()));
    }
}

class Uri {
    constructor(fsPath) {
        this.fsPath = fsPath;
        this.path = fsPath.replace(/\\/g, '/');
    }
    static file(p) {
        return new Uri(p);
    }
}

function makeDocument(fsPath, text) {
    const lineStarts = [0];
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') lineStarts.push(i + 1);
    }
    return {
        uri: new Uri(fsPath),
        fileName: fsPath,
        getText: () => text,
        positionAt(index) {
            if (index < 0) index = 0;
            if (index > text.length) index = text.length;
            let lo = 0;
            let hi = lineStarts.length - 1;
            while (lo < hi) {
                const mid = Math.ceil((lo + hi) / 2);
                if (lineStarts[mid] <= index) lo = mid;
                else hi = mid - 1;
            }
            return new Position(lo, index - lineStarts[lo]);
        },
        offsetAt(pos) {
            return lineStarts[pos.line] + pos.character;
        }
    };
}

const settings = {};
const handlers = {
    open: () => {},
    change: () => {},
    save: () => {},
    close: () => {}
};

function makeCollection() {
    const store = new Map();
    return {
        set(uri, diags) {
            store.set(uri.fsPath, diags);
        },
        delete(uri) {
            store.delete(uri.fsPath);
        },
        get(uri) {
            return store.get(uri.fsPath);
        },
        clear() {
            store.clear();
        },
        dispose() {}
    };
}

const vscodeStub = {
    Position,
    Range,
    Diagnostic,
    DiagnosticSeverity,
    Disposable,
    Uri,
    workspace: {
        workspaceFolders: [{ uri: new Uri(WORKSPACE), name: 'ws', index: 0 }],
        textDocuments: [],
        getConfiguration() {
            return {
                get(key, fallback) {
                    return Object.prototype.hasOwnProperty.call(settings, key) ? settings[key] : fallback;
                }
            };
        },
        onDidOpenTextDocument(fn) {
            handlers.open = fn;
            return new Disposable();
        },
        onDidChangeTextDocument(fn) {
            handlers.change = fn;
            return new Disposable();
        },
        onDidSaveTextDocument(fn) {
            handlers.save = fn;
            return new Disposable();
        },
        onDidCloseTextDocument(fn) {
            handlers.close = fn;
            return new Disposable();
        }
    },
    languages: {
        createDiagnosticCollection: makeCollection
    }
};

// Register the stub before the compiled extension code is required.
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
    if (request === 'vscode') return 'vscode';
    return originalResolve.call(this, request, ...rest);
};
const vscodeModule = new Module('vscode', null);
vscodeModule.filename = 'vscode';
vscodeModule.loaded = true;
vscodeModule.exports = vscodeStub;
require.cache['vscode'] = vscodeModule;

// ---------------------------------------------------------------------------
// Engine bootstrap
// ---------------------------------------------------------------------------

let activeCollection = null;
let bootstrapped = false;

function bootstrap() {
    if (bootstrapped) return;
    bootstrapped = true;
    const mod = require(path.join(BUILD_DIR, 'diagnostics.js'));
    // Capture the diagnostic collection the engine creates for itself.
    const original = vscodeStub.languages.createDiagnosticCollection;
    vscodeStub.languages.createDiagnosticCollection = () => {
        activeCollection = makeCollection();
        return activeCollection;
    };
    mod.registerDragonDiagnostics();
    vscodeStub.languages.createDiagnosticCollection = original;
}

/** Run the real engine over `text` as if the file lived at `relPath`. */
function runDiagnostics(relPath, text) {
    bootstrap();
    const fsPath = path.join(WORKSPACE, relPath);
    const doc = makeDocument(fsPath, text);
    handlers.open(doc);
    const diags = activeCollection.get(doc.uri) || [];
    const lines = text.split('\n');
    return {
        diagnostics: diags
            .map(d => ({
                severity: d.severity === DiagnosticSeverity.Error ? 'error' : 'warning',
                message: d.message,
                line: d.range.start.line,
                character: d.range.start.character,
                endCharacter: d.range.end.character,
                lineText: lines[d.range.start.line] || ''
            }))
            .sort((a, b) => a.line - b.line || a.character - b.character)
    };
}

function setSettings(next) {
    for (const key of Object.keys(settings)) delete settings[key];
    Object.assign(settings, next || {});
}

module.exports = { runDiagnostics, setSettings, WORKSPACE, BUILD_DIR };
