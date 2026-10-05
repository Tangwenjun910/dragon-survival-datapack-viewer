'use strict';
/*
 * Exhaustive "is this position validated?" scan.
 *
 * Generates a schema-conformant document for every data kind, confirms it is
 * clean, then injects a bogus field into every nested object position and checks
 * whether the engine reports it. Positions where the injected field is accepted
 * are places where a field can sit where it should not and still look normal.
 *
 * Run: node test/scan-unvalidated.js [kind ...]
 *      node test/scan-unvalidated.js --dump <kind>
 */

const { runDiagnostics } = require('./harness');
const { SCHEMA: S, buildDoc, collectPositions, getAtPath, relPathForKind } = require('./docgen');

const PROBE = 'zz_probe_field';

function withInjected(root, pathArr) {
    const copy = JSON.parse(JSON.stringify(root));
    getAtPath(copy, pathArr)[PROBE] = 'x';
    return copy;
}

const args = process.argv.slice(2);
const dumpKind = args.includes('--dump') ? args[args.indexOf('--dump') + 1] : null;
const kinds = args.filter(a => !a.startsWith('--') && a !== dumpKind);

if (dumpKind) {
    const rel = relPathForKind(dumpKind);
    const { doc } = buildDoc(S.KIND_TO_STRUCT[dumpKind]);
    const result = runDiagnostics(rel, JSON.stringify(doc, null, 2));
    console.log(JSON.stringify(doc, null, 2));
    console.log(`\n=== diagnostics: ${result.diagnostics.length}`);
    for (const d of result.diagnostics) console.log(`  ${d.severity}: ${d.message}  @line ${d.line + 1}`);
    process.exit(0);
}

const kindList = kinds.length ? kinds : Object.keys(S.KIND_TO_STRUCT);
let totalPositions = 0;
let unvalidated = 0;
let noisy = 0;

for (const kind of kindList) {
    const rootStruct = S.KIND_TO_STRUCT[kind];
    if (!rootStruct || !S.MCDOC_STRUCTS[rootStruct]) {
        console.log(`\n### ${kind}: no root struct`);
        continue;
    }
    const rel = relPathForKind(kind);
    const { doc } = buildDoc(rootStruct);
    const positions = collectPositions(doc);
    const baseline = runDiagnostics(rel, JSON.stringify(doc, null, 2)).diagnostics;
    if (baseline.length > 0) {
        noisy++;
        console.log(`\n### ${kind}: generated document produced ${baseline.length} diagnostics (fixture defect)`);
        for (const d of baseline.slice(0, 5)) console.log(`      ${d.severity}: ${d.message}`);
    }

    console.log(`\n### ${kind}  (${positions.length} object positions, baseline diagnostics: ${baseline.length})`);
    for (const position of positions) {
        totalPositions++;
        const diags = runDiagnostics(rel, JSON.stringify(withInjected(doc, position.path), null, 2)).diagnostics;
        if (!diags.some(d => d.message.includes(`未知字段: "${PROBE}"`))) {
            unvalidated++;
            const fieldAt = position.path.filter(segment => typeof segment === 'string').join('.');
            console.log(`  NOT VALIDATED  ${fieldAt || '<root>'}   keys=[${Object.keys(position.obj).join(', ')}]`);
        }
    }
}

console.log(`\n== ${unvalidated}/${totalPositions} object positions do not flag an injected unknown field`);
if (noisy > 0) {
    console.log(`== ${noisy} kind(s) produced diagnostics on a generated document`);
    process.exitCode = 1;
}
