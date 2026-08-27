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

function walk(dir, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, files);
        else if (entry.name.endsWith('.mcdoc')) files.push(full);
    }
    return files;
}

function extractBraced(text, openIndex) {
    let depth = 0;
    for (let i = openIndex; i < text.length; i++) {
        const ch = text[i];
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) return text.slice(openIndex + 1, i);
        }
    }
    return '';
}

function parseStructs(text) {
    const structs = {};
    const re = /struct\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{|dispatch[^{]*?to\s+struct\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/g;
    let match;
    while ((match = re.exec(text)) !== null) {
        const name = match[1] || match[2];
        const brace = text.indexOf('{', match.index);
        if (brace < 0) continue;
        const body = extractBraced(text, brace);
        const fields = [];
        const fieldRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*(\?)?\s*:/gm;
        let fm;
        while ((fm = fieldRe.exec(body)) !== null) {
            fields.push({ name: fm[1], optional: !!fm[2] });
        }
        if (!structs[name]) structs[name] = { fields: [], required: [], optional: [] };
        for (const f of fields) {
            if (!structs[name].fields.find(x => x.name === f.name)) {
                structs[name].fields.push(f);
                if (f.optional) structs[name].optional.push(f.name);
                else structs[name].required.push(f.name);
            }
        }
    }
    return structs;
}

function parseEnums(text) {
    const enums = {};
    const re = /enum\(string\)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{([\s\S]*?)\}/g;
    let match;
    while ((match = re.exec(text)) !== null) {
        const name = match[1];
        const values = [];
        const valueRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"([^"]+)"/gm;
        let vm;
        while ((vm = valueRe.exec(match[2])) !== null) {
            values.push(vm[2]);
        }
        if (!enums[name]) enums[name] = [];
        for (const v of values) {
            if (!enums[name].includes(v)) enums[name].push(v);
        }
    }
    return enums;
}

function parseDispatches(text) {
    const map = {};
    const re = /dispatch\s+([A-Za-z0-9_:]+)\s*\[([^\]]+)\]\s*to\s+struct\s+([A-Za-z_][A-Za-z0-9_]*)/g;
    let match;
    while ((match = re.exec(text)) !== null) {
        const registry = match[1];
        const value = match[2];
        if (value.includes('%')) continue;
        if (!map[registry]) map[registry] = {};
        if (!map[registry][value]) map[registry][value] = match[3];
    }
    return map;
}

function getFieldInfo(text) {
    const map = {};
    const re = /\/\/\/\s*(.+)\n\s*([A-Za-z_][A-Za-z0-9_]*)\s*(\?)?\s*:/g;
    let match;
    while ((match = re.exec(text)) !== null) {
        if (!map[match[2]]) map[match[2]] = match[1].trim();
    }
    return map;
}

const files = [];
for (const file of walk(MCDOC_ROOT)) {
    files.push(fs.readFileSync(file, 'utf8'));
}

const structs = {};
const enums = {};
const info = {};
const dispatches = {};
for (const text of files) {
    const s = parseStructs(text);
    for (const [k, v] of Object.entries(s)) {
        if (!structs[k]) structs[k] = { required: [], optional: [], fields: {} };
        for (const f of v.fields) {
            if (!(f.name in structs[k].fields)) {
                structs[k].fields[f.name] = f.optional ? 'optional' : 'required';
                if (f.optional) structs[k].optional.push(f.name);
                else structs[k].required.push(f.name);
            }
        }
    }
    Object.assign(enums, parseEnums(text));
    Object.assign(info, getFieldInfo(text));
    const d = parseDispatches(text);
    for (const [reg, values] of Object.entries(d)) {
        if (!dispatches[reg]) dispatches[reg] = {};
        Object.assign(dispatches[reg], values);
    }
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
lines.push('export const MCDOC_ENUM_VALUES: Record<string, string[]> = {');
for (const [name, values] of Object.entries(enums).sort()) {
    lines.push(`    ${JSON.stringify(name)}: ${JSON.stringify(values)},`);
}
lines.push('};');
lines.push('');
lines.push('export const MCDOC_FIELD_INFO: Record<string, string> = {');
for (const [key, value] of Object.entries(info).sort()) {
    lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(value)},`);
}
lines.push('};');
lines.push('');
lines.push('export const MCDOC_DISPATCH: Record<string, Record<string, string>> = {');
for (const [reg, values] of Object.entries(dispatches).sort()) {
    lines.push(`    ${JSON.stringify(reg)}: ${JSON.stringify(values)},`);
}
lines.push('};');
lines.push('');
lines.push('export const KIND_TO_STRUCT: Record<string, string> = ' + JSON.stringify(KIND_TO_STRUCT) + ';');
lines.push('');

fs.writeFileSync(OUT, lines.join('\n'), 'utf8');

const jsLines = [];
jsLines.push('// Auto-generated from dragonsurvival-mcdoc-completion-zh-2.0.4');
jsLines.push('(function () {');
jsLines.push('    window.MCDOC_SCHEMA = {');
jsLines.push('        structs: ' + JSON.stringify(structs) + ',');
jsLines.push('        enums: ' + JSON.stringify(enums) + ',');
jsLines.push('        fieldInfo: ' + JSON.stringify(info) + ',');
jsLines.push('        dispatch: ' + JSON.stringify(dispatches) + ',');
jsLines.push('        kindToStruct: ' + JSON.stringify(KIND_TO_STRUCT));
jsLines.push('    };');
jsLines.push('})();');
fs.writeFileSync(OUT_JS, jsLines.join('\n'), 'utf8');
console.log('structs:', Object.keys(structs).length, 'enums:', Object.keys(enums).length, 'info:', Object.keys(info).length, '->', OUT_JS);
