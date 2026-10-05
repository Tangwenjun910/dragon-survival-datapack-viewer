'use strict';
/*
 * Parses the `...registry[[key]]` spreads out of the mcdoc sources.
 *
 * Both validation engines (src/diagnostics.ts and media/main.js) carry a
 * hand-written table of these spreads because the generated schema files only
 * describe static fields. This module is the ground truth those tables are
 * checked against (see test/schema-bindings.js).
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const MCDOC_ROOT = path.join(WORKSPACE, 'mcdoc-src', 'mcdoc');

function walk(dir, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, files);
        else if (entry.name.endsWith('.mcdoc')) files.push(full);
    }
    return files;
}

function stemOf(file) {
    return path.relative(MCDOC_ROOT, file).replace(/\.mcdoc$/, '').split(/[\\/]/).join('_');
}

/** Strips `//` comments and string contents so braces can be matched safely. */
function stripNoise(text) {
    let out = '';
    let i = 0;
    while (i < text.length) {
        const ch = text[i];
        if (ch === '/' && text[i + 1] === '/') {
            while (i < text.length && text[i] !== '\n') i++;
            continue;
        }
        if (ch === '"') {
            out += '""';
            i++;
            while (i < text.length) {
                if (text[i] === '\\') {
                    i += 2;
                    continue;
                }
                if (text[i] === '"') {
                    i++;
                    break;
                }
                i++;
            }
            continue;
        }
        out += ch;
        i++;
    }
    return out;
}

function matchingBrace(text, openIndex) {
    let depth = 0;
    for (let i = openIndex; i < text.length; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') {
            depth--;
            if (depth === 0) return i;
        }
    }
    return -1;
}

/** { structName: [{ registry, key|null, raw }] } for every spread in the mcdoc. */
function collectSpreadBindings() {
    const result = {};
    for (const file of walk(MCDOC_ROOT)) {
        const stem = stemOf(file);
        const text = stripNoise(fs.readFileSync(file, 'utf8'));
        const re = /(?:^|[\s,])struct\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/g;
        let m;
        while ((m = re.exec(text)) !== null) {
            const name = `${m[1]}__${stem}`;
            const open = text.indexOf('{', m.index);
            const close = matchingBrace(text, open);
            if (close < 0) continue;
            const body = text.slice(open + 1, close);
            const bindings = [];
            const spreadRe = /\.\.\.\s*([A-Za-z0-9_.:-]+)\s*(\[\[\s*([\s\S]*?)\s*\]\])?/g;
            let s;
            while ((s = spreadRe.exec(body)) !== null) {
                const registry = s[1];
                const raw = s[3] === undefined ? null : s[3].trim();
                if (raw === null) continue; // static `...StructName` spread
                const key = /^[A-Za-z_][A-Za-z0-9_]*$/.test(raw) ? raw : null;
                bindings.push({ registry, key, raw });
            }
            if (bindings.length > 0) {
                result[name] = (result[name] || []).concat(bindings);
            }
            re.lastIndex = close;
        }
    }
    return result;
}

module.exports = { collectSpreadBindings, MCDOC_ROOT, WORKSPACE };
