'use strict';
/*
 * Keeps the hand-written enum tables of both engines in sync with the dispatch
 * registries of the mcdoc.
 *
 * A discriminator field (e.g. `effect_type`) must accept every value its
 * registry declares, otherwise a valid variant is reported as an invalid value
 * AND its fields can no longer be resolved. This is exactly how
 * `dragonsurvival:climbable` went missing when the mcdoc was updated, so the
 * check is part of the suite.
 *
 * Run: node test/enum-tables.js
 */

const fs = require('fs');
const path = require('path');
const { WORKSPACE, BUILD_DIR } = require('./harness');
const { DISPATCH_BINDINGS } = require('./docgen');

const S = require(path.join(BUILD_DIR, 'mcdocSchema.js'));

// Which table key each registry's values are listed under, per engine. Keys
// differ because the engines are field-name based and split projectile contexts.
const REGISTRY_TABLE_KEYS = {
    'dragonsurvival:activation': { diagnostics: 'activation_type', webview: 'activation_type' },
    'dragonsurvival:upgrade_type': { diagnostics: 'upgrade_type', webview: 'upgrade_type' },
    'dragonsurvival:ability_targeting': { diagnostics: 'target_type', webview: 'target_type' },
    'dragonsurvival:ability_entity_effect': { diagnostics: 'effect_type', webview: 'effect_type' },
    'dragonsurvival:ability_block_effect': { diagnostics: 'effect_type', webview: 'block_effect_type' },
    'dragonsurvival:activation_trigger': { diagnostics: 'trigger_type', webview: 'trigger_type' },
    'dragonsurvival:penalty_effect': { diagnostics: 'penalty_type', webview: 'penalty_type' },
    'dragonsurvival:penalty_trigger': { diagnostics: 'penalty_trigger', webview: 'penalty_trigger' },
    'dragonsurvival:projectile_targeting': { diagnostics: 'projectile_target_type', webview: 'projectile_target_type' },
    'dragonsurvival:projectile_entity_effect': { diagnostics: 'projectile_entity_effect_type', webview: 'projectile_entity_effect_type' },
    'dragonsurvival:projectile_block_effect': { diagnostics: 'projectile_block_effect_type', webview: 'projectile_block_effect_type' },
    'dragonsurvival:projectile_world_effect': { diagnostics: 'projectile_world_effect_type', webview: 'projectile_world_effect_type' }
};

/** `ENUM_VALUES: Record<string, string[]> = { key: ['a', 'b'], ... }` */
function parseDiagnosticsEnums(source) {
    const block = /const ENUM_VALUES[\s\S]*?=\s*\{([\s\S]*?)\n\};/.exec(source);
    if (!block) throw new Error('ENUM_VALUES not found in src/diagnostics.ts');
    const table = {};
    const entry = /([A-Za-z0-9_]+)\s*:\s*\[([\s\S]*?)\]/g;
    let m;
    while ((m = entry.exec(block[1])) !== null) {
        table[m[1]] = [...m[2].matchAll(/'([^']*)'/g)].map(x => x[1]);
    }
    return table;
}

/** `key: [{ value: 'a', label: '...' }, ...]` inside ENUM_OPTIONS */
function parseWebviewEnums(source) {
    const block = /const ENUM_OPTIONS[\s\S]*?=\s*\{([\s\S]*?)\n {4}\};/.exec(source);
    if (!block) throw new Error('ENUM_OPTIONS not found in media/main.js');
    const table = {};
    const entry = /([A-Za-z0-9_]+)\s*:\s*\[([\s\S]*?)\n\s{8}\]/g;
    let m;
    while ((m = entry.exec(block[1])) !== null) {
        table[m[1]] = [...m[2].matchAll(/value:\s*'([^']*)'/g)].map(x => x[1]);
    }
    return table;
}

const diagnosticsSource = fs.readFileSync(path.join(WORKSPACE, 'src', 'diagnostics.ts'), 'utf8');
const webviewSource = fs.readFileSync(path.join(WORKSPACE, 'media', 'main.js'), 'utf8');
const diagnosticsEnums = parseDiagnosticsEnums(diagnosticsSource);
const webviewEnums = parseWebviewEnums(webviewSource);

const engines = [
    { name: 'src/diagnostics.ts', table: diagnosticsEnums, pick: keys => keys.diagnostics },
    { name: 'media/main.js', table: webviewEnums, pick: keys => keys.webview }
];

// Collect the registries actually referenced by the dispatch tables.
const referenced = new Set();
for (const bindings of Object.values(DISPATCH_BINDINGS)) {
    for (const binding of bindings) {
        if (binding.key) referenced.add(binding.registry);
    }
}

let failures = 0;
let checked = 0;

for (const engine of engines) {
    const problems = [];
    for (const registry of [...referenced].sort()) {
        const keys = REGISTRY_TABLE_KEYS[registry];
        if (!keys) {
            problems.push(`registry "${registry}" has no enum table mapping in this test`);
            continue;
        }
        const tableKey = engine.pick(keys);
        const listed = engine.table[tableKey];
        if (!listed) {
            problems.push(`table key "${tableKey}" (${registry}) is missing`);
            continue;
        }
        const values = Object.keys(S.MCDOC_DISPATCH[registry] || {});
        const missing = values.filter(value => !listed.includes(value));
        checked += values.length;
        if (missing.length > 0) {
            problems.push(`${tableKey} is missing ${missing.length} mcdoc value(s): ${missing.join(', ')}`);
        }
    }
    if (problems.length === 0) {
        console.log(`PASS  ${engine.name}: every dispatch value of ${referenced.size} registries is listed`);
    } else {
        failures++;
        console.log(`FAIL  ${engine.name}: enum table out of sync with the mcdoc`);
        for (const problem of problems) console.log(`        - ${problem}`);
    }
}

console.log(`\nchecked ${checked} registry values across both engines`);
if (failures > 0) {
    process.exitCode = 1;
} else {
    console.log('enum tables cover every mcdoc dispatch value');
}
