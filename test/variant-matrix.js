'use strict';
/*
 * False-positive guard: every dispatch variant and every union member must
 * validate cleanly.
 *
 * Builds a schema-conformant document per kind and walks the schema: for every
 * dispatch container it finds, it rebuilds the document with each variant of that
 * container selected; for every union field, it rebuilds with each member picked.
 * Newly reached branches are expanded too, until nothing new appears. Every
 * generated document must produce zero diagnostics, so valid data is never
 * flagged, however exotic the branch.
 *
 * Run: node test/variant-matrix.js [kind ...]
 */

const { runDiagnostics } = require('./harness');
const { SCHEMA: S, buildDoc, relPathForKind } = require('./docgen');

const kinds = process.argv.slice(2).filter(a => !a.startsWith('--'));
const kindList = kinds.length ? kinds : Object.keys(S.KIND_TO_STRUCT);

let checked = 0;
let failed = 0;
const failures = [];

for (const kind of kindList) {
    const rootStruct = S.KIND_TO_STRUCT[kind];
    if (!rootStruct || !S.MCDOC_STRUCTS[rootStruct]) continue;
    const rel = relPathForKind(kind);

    const containers = new Map();
    const unions = new Map();
    const record = built => {
        for (const container of built.containers) {
            containers.set(`${container.struct}|${container.registry}`, container);
        }
        for (const union of built.unions) {
            unions.set(`${union.struct}|${union.field}`, union);
        }
    };
    const evaluate = (label, options) => {
        const built = buildDoc(rootStruct, options);
        record(built);
        const diags = runDiagnostics(rel, JSON.stringify(built.doc, null, 2)).diagnostics;
        checked++;
        if (diags.length > 0) {
            failed++;
            failures.push(`${kind} ${label}: ${diags.length} diagnostics, first="${diags[0].severity}: ${diags[0].message}"`);
        }
    };

    evaluate('baseline', {});

    const doneContainers = new Set();
    const doneUnions = new Set();
    let progress = true;
    while (progress) {
        progress = false;
        for (const [key, container] of containers) {
            if (doneContainers.has(key)) continue;
            doneContainers.add(key);
            progress = true;
            const short = container.struct.replace(/__.*/, '');
            for (const value of Object.keys(S.MCDOC_DISPATCH[container.registry] || {})) {
                evaluate(`${short}=${value}`, {
                    overrides: { [container.struct]: { registry: container.registry, value } }
                });
            }
        }
        for (const [key, union] of unions) {
            if (doneUnions.has(key)) continue;
            doneUnions.add(key);
            progress = true;
            for (const candidate of union.candidates) {
                evaluate(`${union.struct.replace(/__.*/, '')}.${union.field}=${candidate.replace(/__.*/, '')}`, {
                    unionPicks: { [`${union.struct}|${union.field}`]: candidate }
                });
            }
        }
    }

    console.log(
        `${kind.padEnd(16)} containers: ${String(doneContainers.size).padStart(2)}  ` +
        `union fields: ${String(doneUnions.size).padStart(2)}`
    );
}

console.log(`\n${checked - failed}/${checked} generated documents are clean`);
if (failed > 0) {
    console.log(`\n${failed} failing document(s):`);
    for (const f of failures.slice(0, 40)) console.log(`  - ${f}`);
    if (failures.length > 40) console.log(`  ... and ${failures.length - 40} more`);
    process.exitCode = 1;
}
