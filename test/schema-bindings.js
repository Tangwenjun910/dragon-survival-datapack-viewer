'use strict';
/*
 * Keeps the hand-written dispatch tables in the two validation engines in sync
 * with the mcdoc sources.
 *
 * The generated schema files only describe static struct fields, so both engines
 * carry a table of the `...dispatch[[key]]` spreads. This test parses those
 * spreads from mcdoc-src and fails when a table drifts, misses a spread, or
 * names a registry/variant that does not exist.
 *
 * Run: node test/schema-bindings.js
 */

const fs = require('fs');
const path = require('path');
const { collectSpreadBindings, WORKSPACE } = require('./mcdoc-bindings');

const S = require(path.join(WORKSPACE, 'out', 'mcdocSchema.js'));

// Spreads that are deliberately not modelled, with the reason.
const NOT_MODELLED = {
    'SummonEntityEffect_NBT__data_dragonsurvival_dragon_ability':
        'spreads minecraft:entity[[%parent.entities]]: the value is arbitrary entity NBT, not document fields'
};

function parseBindingsTable(source, constName) {
    const block = new RegExp(`const ${constName}\\s*(?::[^=]+)?=\\s*\\{([\\s\\S]*?)\\n\\s*\\};`).exec(source);
    if (!block) throw new Error(`table ${constName} not found`);
    const table = {};
    const entryRe = /([A-Za-z0-9_]+)\s*:\s*\[([\s\S]*?)\]/g;
    let m;
    while ((m = entryRe.exec(block[1])) !== null) {
        const struct = m[1];
        const entries = [];
        const objectRe = /\{([^}]*)\}/g;
        let o;
        while ((o = objectRe.exec(m[2])) !== null) {
            const registry = /registry:\s*'([^']+)'/.exec(o[1]);
            if (!registry) continue;
            const key = /key:\s*'([^']+)'/.exec(o[1]);
            entries.push({ registry: registry[1], key: key ? key[1] : null });
        }
        table[struct] = entries;
    }
    return table;
}

function normalise(bindings) {
    return bindings
        .map(b => `${b.registry}::${b.key === null ? '<parent>' : b.key}`)
        .sort()
        .join(', ');
}

const mcdocBindings = collectSpreadBindings();
const expected = {};
for (const [struct, bindings] of Object.entries(mcdocBindings)) {
    if (NOT_MODELLED[struct]) continue;
    const modelled = bindings.filter(b => S.MCDOC_DISPATCH[b.registry]);
    if (modelled.length > 0) expected[struct] = modelled;
}

const engines = [
    { file: 'src/diagnostics.ts', constName: 'DISPATCH_BINDINGS' },
    { file: 'media/main.js', constName: 'MCDOC_DISPATCH_BINDINGS' }
];

let failures = 0;
function fail(message) {
    failures++;
    console.log(`FAIL  ${message}`);
}
function ok(message) {
    console.log(`PASS  ${message}`);
}

for (const engine of engines) {
    const full = path.join(WORKSPACE, engine.file);
    if (!fs.existsSync(full)) {
        fail(`${engine.file}: missing`);
        continue;
    }
    const table = parseBindingsTable(fs.readFileSync(full, 'utf8'), engine.constName);
    const problems = [];

    for (const [struct, bindings] of Object.entries(expected)) {
        if (!table[struct]) {
            problems.push(`missing binding for ${struct} (mcdoc: ${normalise(bindings)})`);
            continue;
        }
        if (normalise(table[struct]) !== normalise(bindings)) {
            problems.push(
                `${struct} differs: engine=[${normalise(table[struct])}] mcdoc=[${normalise(bindings)}]`
            );
        }
    }
    for (const struct of Object.keys(table)) {
        if (!expected[struct]) {
            problems.push(`extra binding for ${struct}, which has no modelled spread in the mcdoc`);
        }
    }
    for (const [struct, bindings] of Object.entries(table)) {
        for (const binding of bindings) {
            if (!S.MCDOC_DISPATCH[binding.registry]) {
                problems.push(`${struct}: registry "${binding.registry}" has no dispatch declaration`);
                continue;
            }
            if (binding.key && !Object.keys(S.MCDOC_DISPATCH[binding.registry]).length) {
                problems.push(`${struct}: registry "${binding.registry}" declares no variant`);
            }
        }
    }

    if (problems.length === 0) {
        ok(`${engine.file}: ${Object.keys(table).length} binding groups match the mcdoc`);
    } else {
        fail(`${engine.file}: ${engine.constName} is out of sync with mcdoc-src`);
        for (const problem of problems) console.log(`        - ${problem}`);
    }
}

// Also make sure the mcdoc really is the source of these registries.
console.log(
    `\nmcdoc spreads with a declared dispatch: ${Object.keys(expected).length} structs, ` +
    `${Object.values(expected).reduce((n, b) => n + b.length, 0)} bindings; ` +
    `not modelled: ${Object.keys(NOT_MODELLED).length}`
);

if (failures > 0) {
    process.exitCode = 1;
} else {
    console.log('all dispatch tables match the mcdoc sources');
}
