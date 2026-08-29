const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MCDOC_ROOT = path.join(PROJECT_ROOT, 'mcdoc-src', 'mcdoc');
const OUT = path.join(PROJECT_ROOT, 'src', 'mcdocSchema.ts');
const OUT_JS = path.join(PROJECT_ROOT, 'media', 'mcdocSchema.js');

const KIND_TO_STRUCT = {
    dragon_ability: 'DragonAbility',
    dragon_species: 'DragonSpecies',
    dragon_stage: 'DragonStage',
    dragon_penalty: 'DragonPenalty',
    projectile_data: 'ProjectileData',
    dragon_body: 'DragonBody',
    dragon_emote_set: 'DragonEmoteSet'
};

// ---------------------------------------------------------------------------
// Low-level scanning helpers
// ---------------------------------------------------------------------------

function walk(dir, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, files);
        else if (entry.name.endsWith('.mcdoc')) files.push(full);
    }
    return files;
}

function isWhitespace(ch) {
    return ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n';
}

function skipWsAndComments(text, i) {
    while (i < text.length) {
        const ch = text[i];
        if (isWhitespace(ch)) {
            i++;
            continue;
        }
        if (ch === '/' && text[i + 1] === '/') {
            while (i < text.length && text[i] !== '\n') i++;
            continue;
        }
        break;
    }
    return i;
}

function readIdentifier(text, i) {
    const m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(text.slice(i));
    if (!m) return { value: '', end: i };
    return { value: m[0], end: i + m[0].length };
}

function readString(text, i) {
    // i points at opening quote
    let j = i + 1;
    let out = '';
    while (j < text.length) {
        const ch = text[j];
        if (ch === '\\') {
            out += text[j] + (text[j + 1] || '');
            j += 2;
            continue;
        }
        if (ch === '"') {
            return { value: out, end: j + 1 };
        }
        out += ch;
        j++;
    }
    return { value: out, end: j };
}

function readBalanced(text, i, open, close) {
    // i points at open char
    let depth = 0;
    let j = i;
    let inString = false;
    while (j < text.length) {
        const ch = text[j];
        if (ch === '"') {
            const str = readString(text, j);
            j = str.end;
            continue;
        }
        if (ch === open) depth++;
        else if (ch === close) {
            depth--;
            if (depth === 0) {
                return { inner: text.slice(i + 1, j), end: j + 1 };
            }
        }
        j++;
    }
    return { inner: text.slice(i + 1), end: text.length };
}

function readUntilTopLevel(text, i, terminators) {
    // Reads until one of terminators at nesting depth 0 (outside strings/comments).
    let depth = 0;
    let j = i;
    let inString = false;
    while (j < text.length) {
        const ch = text[j];
        if (ch === '"') {
            const str = readString(text, j);
            j = str.end;
            continue;
        }
        if (ch === '/' && text[j + 1] === '/') {
            // Inline comment: stop before it (the comma usually precedes it).
            break;
        }
        if ('([{<'.includes(ch)) depth++;
        else if (')]}>'.includes(ch)) depth--;
        if (depth === 0 && terminators.includes(ch)) {
            break;
        }
        j++;
    }
    return { value: text.slice(i, j).trim(), end: j };
}

function splitTopLevel(text, sep) {
    const parts = [];
    let depth = 0;
    let current = '';
    let inString = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '"') {
            const str = readString(text, i);
            current += text.slice(i, str.end);
            i = str.end - 1;
            continue;
        }
        if ('([{<'.includes(ch)) depth++;
        else if (')]}>'.includes(ch)) depth--;
        if (depth === 0 && ch === sep) {
            parts.push(current.trim());
            current = '';
        } else {
            current += ch;
        }
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
}

function cleanType(typeRaw) {
    let s = typeRaw || '';
    // Remove inline comments.
    let out = '';
    let i = 0;
    let inString = false;
    while (i < s.length) {
        const ch = s[i];
        if (ch === '"') {
            const str = readString(s, i);
            out += s.slice(i, str.end);
            i = str.end;
            continue;
        }
        if (ch === '/' && s[i + 1] === '/') break;
        out += ch;
        i++;
    }
    s = out;
    // Remove #[...] annotations.
    const cleaned = [];
    i = 0;
    while (i < s.length) {
        if (s[i] === '#' && s[i + 1] === '[') {
            const close = s.indexOf(']', i + 2);
            if (close < 0) {
                i = s.length;
            } else {
                i = close + 1;
            }
            continue;
        }
        cleaned.push(s[i]);
        i++;
    }
    return cleaned.join('').trim();
}

function extractIdentifiers(typeRaw) {
    const cleaned = cleanType(typeRaw);
    const result = [];
    const re = /[A-Za-z_][A-Za-z0-9_]*/g;
    let m;
    while ((m = re.exec(cleaned)) !== null) {
        result.push(m[0]);
    }
    return result;
}

// ---------------------------------------------------------------------------
// File AST parsing
// ---------------------------------------------------------------------------

function parseStructBody(body, parentName, ast) {
    const def = {
        name: parentName,
        fields: [],
        mapFields: [],
        spreads: []
    };
    let i = 0;
    while (i < body.length) {
        i = skipWsAndComments(body, i);
        if (i >= body.length) break;
        const ch = body[i];

        if (ch === '}') {
            i++;
            continue;
        }

        if (ch === '.') {
            // spread: ...registry[[expr]],
            const dot = body.indexOf('...', i);
            if (dot < 0) break;
            const res = readUntilTopLevel(body, dot + 3, [',', '}']);
            def.spreads.push(res.value);
            i = res.end;
            if (body[i] === ',') i++;
            continue;
        }

        if (ch === '[') {
            // map field: [KeyType]: ValueType
            const key = readBalanced(body, i, '[', ']');
            let j = skipWsAndComments(body, key.end);
            if (body[j] !== ':') {
                i = key.end;
                continue;
            }
            j = skipWsAndComments(body, j + 1);
            const val = readUntilTopLevel(body, j, [',', '}']);
            def.mapFields.push({ keyType: key.inner.trim(), valueType: val.value });
            i = val.end;
            if (body[i] === ',') i++;
            continue;
        }

        const id = readIdentifier(body, i);
        if (!id.value) {
            i++;
            continue;
        }
        let j = skipWsAndComments(body, id.end);
        let optional = false;
        if (body[j] === '?') {
            optional = true;
            j = skipWsAndComments(body, j + 1);
        }
        if (body[j] !== ':') {
            i = id.end;
            continue;
        }
        j = skipWsAndComments(body, j + 1);

        let typeRes = readUntilTopLevel(body, j, [',', '}']);
        let typeRaw = typeRes.value;
        let end = typeRes.end;

        // Inline named struct: `struct Name { ... }`
        if (/^struct\s+[A-Za-z_][A-Za-z0-9_]*/.test(typeRaw)) {
            const sm = /^struct\s+([A-Za-z_][A-Za-z0-9_]*)/.exec(typeRaw);
            const inlineName = sm[1];
            const brace = body.indexOf('{', j);
            const innerBody = readBalanced(body, brace, '{', '}');
            parseStructBody(innerBody.inner, inlineName, ast);
            if (!ast.structs.has(inlineName)) {
                ast.structs.set(inlineName, { name: inlineName, fields: [], mapFields: [], spreads: [] });
            }
            // Re-read the field type as the inline struct name.
            typeRaw = inlineName;
            end = innerBody.end;
        }

        def.fields.push({ name: id.value, optional, typeRaw });
        i = end;
        if (body[i] === ',') i++;
    }
    return def;
}

function parseStruct(text, start, ast) {
    const m = /^struct\s+([A-Za-z_][A-Za-z0-9_]*)/.exec(text.slice(start));
    if (!m) return { end: start };
    const name = m[1];
    let i = start + m[0].length;
    i = skipWsAndComments(text, i);
    if (text[i] !== '{') return { end: i };
    const body = readBalanced(text, i, '{', '}');
    const def = parseStructBody(body.inner, name, ast);
    ast.structs.set(name, def);
    return { end: body.end };
}

function parseDispatchValues(valueList) {
    const values = [];
    for (let raw of splitTopLevel(valueList, ',')) {
        raw = raw.trim();
        if (!raw) continue;
        if (raw.includes('%')) continue; // dynamic dispatch value, not a concrete enum
        if (raw.startsWith('"') && raw.endsWith('"')) {
            const str = readString(raw, 0);
            raw = str.value;
        }
        if (raw) values.push(raw);
    }
    return values;
}

function parseDispatchTarget(text, start, ast) {
    // start points after "to"
    let i = skipWsAndComments(text, start);
    // Direct struct target: `struct Name { ... }`
    if (/^struct\s+[A-Za-z_][A-Za-z0-9_]*/.test(text.slice(i))) {
        const parsed = parseStruct(text, i, ast);
        const sm = /^struct\s+([A-Za-z_][A-Za-z0-9_]*)/.exec(text.slice(i));
        return { targetName: sm[1], end: parsed.end };
    }

    // Read a leading identifier (e.g. Conditions, ComplexRemovalDataMap, DataMap).
    const id = readIdentifier(text, i);
    if (!id.value) return { targetName: '', end: i };
    i = skipWsAndComments(text, id.end);

    if (text[i] === '<') {
        const angle = readBalanced(text, i, '<', '>');
        const inner = angle.inner;
        // If the angle content contains an inline struct, parse it.
        const sm = /struct\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/.exec(inner);
        if (sm) {
            const structKeyword = inner.indexOf('struct ');
            const absStart = angle.end - 1 - inner.length + structKeyword;
            const parsed = parseStruct(text, absStart, ast);
            return { targetName: sm[1], end: parsed.end };
        }
        // Generic alias target (no concrete struct to register).
        return { targetName: id.value, end: angle.end };
    }

    // Plain alias target, e.g. `to DataMap` (shouldn't normally appear without <>).
    return { targetName: id.value, end: i };
}

function parseDispatch(text, start, ast) {
    let i = start + 'dispatch'.length;
    i = skipWsAndComments(text, i);

    // Registry up to '['.
    const regMatch = /^[A-Za-z0-9_.:-]+/.exec(text.slice(i));
    if (!regMatch) return { end: i };
    const registry = regMatch[0];
    i += regMatch[0].length;
    i = skipWsAndComments(text, i);
    if (text[i] !== '[') return { end: i };

    const list = readBalanced(text, i, '[', ']');
    const values = parseDispatchValues(list.inner);
    i = skipWsAndComments(text, list.end);
    if (text.startsWith('to', i)) i += 2;

    const target = parseDispatchTarget(text, i, ast);

    if (!ast.dispatches.has(registry)) ast.dispatches.set(registry, new Map());
    const valueMap = ast.dispatches.get(registry);
    for (const value of values) {
        if (!valueMap.has(value)) valueMap.set(value, target.targetName);
    }
    return { end: target.end };
}

function parseTypeAlias(text, start, ast) {
    let i = start + 'type'.length;
    i = skipWsAndComments(text, i);
    const id = readIdentifier(text, i);
    if (!id.value) return { end: i };
    const name = id.value;
    i = skipWsAndComments(text, id.end);

    const params = [];
    if (text[i] === '<') {
        const angle = readBalanced(text, i, '<', '>');
        for (const p of splitTopLevel(angle.inner, ',')) {
            const pv = p.trim();
            if (pv) params.push(pv);
        }
        i = skipWsAndComments(text, angle.end);
    }

    if (text[i] !== '=') return { end: i };
    i = skipWsAndComments(text, i + 1);

    let expression;
    if (text[i] === 'struct') {
        const brace = text.indexOf('{', i);
        const body = readBalanced(text, brace, '{', '}');
        expression = text.slice(i, body.end).trim();
        i = body.end;
    } else {
        const lineEnd = text.indexOf('\n', i);
        const end = lineEnd < 0 ? text.length : lineEnd;
        expression = text.slice(i, end).trim();
        i = end;
    }

    ast.typeAliases.set(name, { name, params, expression });
    return { end: i };
}

function parseEnum(text, start, ast) {
    const m = /^enum\(string\)\s+([A-Za-z_][A-Za-z0-9_]*)/.exec(text.slice(start));
    if (!m) return { end: start };
    const name = m[1];
    let i = start + m[0].length;
    i = skipWsAndComments(text, i);
    if (text[i] !== '{') return { end: i };
    const body = readBalanced(text, i, '{', '}');
    const values = [];
    const valueRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"([^"]+)"/gm;
    let vm;
    while ((vm = valueRe.exec(body.inner)) !== null) {
        if (!values.includes(vm[2])) values.push(vm[2]);
    }
    ast.enums.set(name, values);
    return { end: body.end };
}

function parseFieldInfo(text) {
    const map = {};
    const lines = text.split('\n');
    const fieldRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*(\?)?\s*:/;
    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(fieldRe);
        if (!match) continue;
        const name = match[1];
        if (map[name]) continue;
        const comments = [];
        let j = i - 1;
        while (j >= 0) {
            const comment = lines[j].match(/^\s*\/\/\/\s*(.+)$/);
            if (!comment) break;
            comments.unshift(comment[1].trim());
            j--;
        }
        if (comments.length > 0) map[name] = comments.join('\n');
    }
    return map;
}

function parseFile(file, text) {
    const stem = getFileStem(file);
    const ast = {
        file,
        stem,
        structs: new Map(),
        enums: new Map(),
        dispatches: new Map(),
        typeAliases: new Map(),
        fieldInfo: parseFieldInfo(text)
    };

    let i = 0;
    while (i < text.length) {
        i = skipWsAndComments(text, i);
        if (i >= text.length) break;
        if (text.startsWith('struct ', i)) {
            const r = parseStruct(text, i, ast);
            i = r.end;
        } else if (text.startsWith('dispatch ', i)) {
            const r = parseDispatch(text, i, ast);
            i = r.end;
        } else if (text.startsWith('type ', i)) {
            const r = parseTypeAlias(text, i, ast);
            i = r.end;
        } else if (text.startsWith('enum(string)', i)) {
            const r = parseEnum(text, i, ast);
            i = r.end;
        } else {
            // Skip unknown line/construct.
            const nl = text.indexOf('\n', i);
            i = nl < 0 ? text.length : nl + 1;
        }
    }

    return ast;
}

// ---------------------------------------------------------------------------
// Global assembly and namespacing
// ---------------------------------------------------------------------------

function getFileStem(file) {
    const rel = path.relative(MCDOC_ROOT, file).replace(/\.mcdoc$/, '');
    return rel.split(/[\\/]/).join('_');
}

function ns(name, stem) {
    return `${name}__${stem}`;
}

const fileEntries = walk(MCDOC_ROOT).map(file => ({ file, text: fs.readFileSync(file, 'utf8') }));
const fileAsts = fileEntries.map(entry => parseFile(entry.file, entry.text));
const fileAstByPath = new Map(fileAsts.map(ast => [ast.file, ast]));

const structs = {};
const structLocalToGlobal = new Map();
const localNameToFiles = new Map();
const aliasLocalToGlobal = new Map();
const localAliasToFiles = new Map();

for (const ast of fileAsts) {
    for (const [name, def] of ast.structs) {
        const globalName = ns(name, ast.stem);
        structLocalToGlobal.set(`${ast.file}::${name}`, globalName);
        if (!localNameToFiles.has(name)) localNameToFiles.set(name, new Set());
        localNameToFiles.get(name).add(ast.file);
        structs[globalName] = {
            required: def.fields.filter(f => !f.optional).map(f => f.name),
            optional: def.fields.filter(f => f.optional).map(f => f.name),
            fields: Object.fromEntries(def.fields.map(f => [f.name, f.optional ? 'optional' : 'required'])),
            fieldTypes: Object.fromEntries(def.fields.map(f => [f.name, f.typeRaw])),
            ownerFile: ast.file,
            ownerStem: ast.stem,
            spreads: def.spreads,
            mapFields: def.mapFields
        };
    }
    for (const [name, alias] of ast.typeAliases) {
        const globalName = ns(name, ast.stem);
        aliasLocalToGlobal.set(`${ast.file}::${name}`, globalName);
        if (!localAliasToFiles.has(name)) localAliasToFiles.set(name, new Set());
        localAliasToFiles.get(name).add(ast.file);
    }
}

function resolveStructRef(file, name) {
    const ast = fileAstByPath.get(file);
    if (ast && ast.structs.has(name)) return ns(name, ast.stem);
    const files = localNameToFiles.get(name);
    if (files && files.size === 1) {
        const onlyFile = [...files][0];
        const onlyAst = fileAstByPath.get(onlyFile);
        return ns(name, onlyAst.stem);
    }
    return undefined;
}

function resolveAlias(file, name) {
    const ast = fileAstByPath.get(file);
    if (ast && ast.typeAliases.has(name)) return ast.typeAliases.get(name);
    const files = localAliasToFiles.get(name);
    if (files && files.size === 1) {
        const onlyFile = [...files][0];
        const onlyAst = fileAstByPath.get(onlyFile);
        return onlyAst.typeAliases.get(name) || null;
    }
    return null;
}

function collectChildStructs(typeRaw, file, seen = new Set()) {
    const result = new Set();
    for (const name of extractIdentifiers(typeRaw)) {
        const struct = resolveStructRef(file, name);
        if (struct) {
            result.add(struct);
            continue;
        }
        const alias = resolveAlias(file, name);
        if (alias && alias.params.length === 0 && !seen.has(alias.name)) {
            seen.add(alias.name);
            const sub = collectChildStructs(alias.expression, file, seen);
            for (const s of sub) result.add(s);
        }
    }
    return [...result];
}

const dispatches = {};
for (const ast of fileAsts) {
    for (const [registry, valueMap] of ast.dispatches) {
        if (!dispatches[registry]) dispatches[registry] = {};
        for (const [value, targetRaw] of valueMap) {
            const target = resolveStructRef(ast.file, targetRaw) || targetRaw;
            if (!(value in dispatches[registry])) dispatches[registry][value] = target;
        }
    }
}

const childStructs = {};
for (const ast of fileAsts) {
    for (const [name, def] of ast.structs) {
        const globalName = ns(name, ast.stem);
        const map = {};
        for (const field of def.fields) {
            const children = collectChildStructs(field.typeRaw, ast.file);
            if (children.length > 0) map[field.name] = children;
        }
        if (Object.keys(map).length > 0) childStructs[globalName] = map;
    }
}

const enums = {};
for (const ast of fileAsts) {
    for (const [name, values] of ast.enums) {
        if (!enums[name]) enums[name] = [];
        for (const v of values) {
            if (!enums[name].includes(v)) enums[name].push(v);
        }
    }
}

const info = {};
for (const ast of fileAsts) {
    for (const [key, value] of Object.entries(ast.fieldInfo)) {
        if (!info[key]) info[key] = value;
    }
}

const kindToStruct = {};
for (const [kind, structName] of Object.entries(KIND_TO_STRUCT)) {
    const ast = fileAsts.find(a => a.structs.has(structName));
    kindToStruct[kind] = ast ? ns(structName, ast.stem) : structName;
}

const structOwners = {};
for (const [globalName, def] of Object.entries(structs)) {
    structOwners[globalName] = def.ownerStem;
}

const typeAliases = {};
for (const ast of fileAsts) {
    for (const [name, alias] of ast.typeAliases) {
        typeAliases[ns(name, ast.stem)] = { params: alias.params, expression: alias.expression };
    }
}

// ---------------------------------------------------------------------------
// Output generation
// ---------------------------------------------------------------------------

function jsonLines(obj, indent = '    ') {
    return Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${indent}${JSON.stringify(k)}: ${JSON.stringify(v)},`)
        .join('\n');
}

const lines = [];
lines.push('// Auto-generated from dragonsurvival-mcdoc-completion-zh-2.0.4');
lines.push('export interface McdocStruct {');
lines.push('    required: string[];');
lines.push('    optional: string[];');
lines.push('    fields: Record<string, "required" | "optional">;');
lines.push('}');
lines.push('');
lines.push('export const MCDOC_STRUCTS: Record<string, McdocStruct> = {');
for (const [name, s] of Object.entries(structs).sort()) {
    lines.push(`    ${JSON.stringify(name)}: {`);
    lines.push(`        required: ${JSON.stringify(s.required)},`);
    lines.push(`        optional: ${JSON.stringify(s.optional)},`);
    lines.push(`        fields: ${JSON.stringify(s.fields)}`);
    lines.push('    },');
}
lines.push('};');
lines.push('');
lines.push('export const MCDOC_STRUCT_CHILDREN: Record<string, Record<string, string[]>> = {');
lines.push(jsonLines(childStructs));
lines.push('};');
lines.push('');
lines.push('export const MCDOC_ENUM_VALUES: Record<string, string[]> = {');
lines.push(jsonLines(enums));
lines.push('};');
lines.push('');
lines.push('export const MCDOC_FIELD_INFO: Record<string, string> = {');
lines.push(jsonLines(info));
lines.push('};');
lines.push('');
lines.push('export const MCDOC_DISPATCH: Record<string, Record<string, string>> = {');
lines.push(jsonLines(dispatches));
lines.push('};');
lines.push('');
lines.push('export const MCDOC_STRUCT_OWNERS: Record<string, string> = {');
lines.push(jsonLines(structOwners));
lines.push('};');
lines.push('');
lines.push('export const MCDOC_TYPE_ALIASES: Record<string, { params: string[]; expression: string }> = {');
lines.push(jsonLines(typeAliases));
lines.push('};');
lines.push('');
lines.push('export const KIND_TO_STRUCT: Record<string, string> = ' + JSON.stringify(kindToStruct) + ';');
lines.push('');

fs.writeFileSync(OUT, lines.join('\n'), 'utf8');

const jsLines = [];
jsLines.push('// Auto-generated from dragonsurvival-mcdoc-completion-zh-2.0.4');
jsLines.push('(function () {');
jsLines.push('    window.MCDOC_SCHEMA = {');
jsLines.push('        structs: ' + JSON.stringify(structs) + ',');
jsLines.push('        childStructs: ' + JSON.stringify(childStructs) + ',');
jsLines.push('        enums: ' + JSON.stringify(enums) + ',');
jsLines.push('        fieldInfo: ' + JSON.stringify(info) + ',');
jsLines.push('        dispatch: ' + JSON.stringify(dispatches) + ',');
jsLines.push('        structOwners: ' + JSON.stringify(structOwners) + ',');
jsLines.push('        typeAliases: ' + JSON.stringify(typeAliases) + ',');
jsLines.push('        kindToStruct: ' + JSON.stringify(kindToStruct));
jsLines.push('    };');
jsLines.push('})();');
fs.writeFileSync(OUT_JS, jsLines.join('\n'), 'utf8');

// ---------------------------------------------------------------------------
// Self-check / statistics
// ---------------------------------------------------------------------------

console.log('=== mcdoc parse summary ===');
for (const ast of fileAsts) {
    console.log(
        `${ast.stem.padEnd(24)} structs:${String(ast.structs.size).padStart(3)} ` +
        `enums:${String(ast.enums.size).padStart(3)} ` +
        `dispatches:${String(ast.dispatches.size).padStart(3)} ` +
        `aliases:${String(ast.typeAliases.size).padStart(3)}`
    );
}
console.log('--- totals ---');
console.log('structs:', Object.keys(structs).length);
console.log('childStructs:', Object.keys(childStructs).length);
console.log('enums:', Object.keys(enums).length);
console.log('fieldInfo:', Object.keys(info).length);
console.log('dispatch registries:', Object.keys(dispatches).length);
console.log('typeAliases:', Object.keys(typeAliases).length);
console.log('->', OUT_JS);