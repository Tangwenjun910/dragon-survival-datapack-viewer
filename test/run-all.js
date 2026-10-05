'use strict';
/*
 * Runs every validation test and reports a summary.
 *
 * Run: npm test         (uses out/, so compile first)
 *      node test/run-all.js
 *      $env:DSH_BUILD_DIR='_scratch/out'; node test/run-all.js
 */

const tests = [
    ['schema-bindings', 'dispatch tables match mcdoc-src'],
    ['enum-tables', 'enum tables cover every mcdoc dispatch value'],
    ['field-placement-cases', 'editor: fields in a wrong place are reported'],
    ['webview-resolve', 'sidebar: fields in a wrong place are marked invalid'],
    ['variant-matrix', 'valid data of every variant stays clean (no false positives)'],
    ['scan-unvalidated', 'position coverage report (informational)']
];

const failed = [];
for (const [name, description] of tests) {
    console.log(`\n===== ${name}: ${description} =====`);
    process.exitCode = 0;
    try {
        require(`./${name}.js`);
    } catch (error) {
        process.exitCode = 1;
        console.log(`THREW: ${error && error.stack ? error.stack.split('\n')[0] : error}`);
    }
    if (process.exitCode) failed.push(name);
}

console.log('\n=============================');
if (failed.length === 0) {
    console.log('ALL TESTS PASSED');
    process.exitCode = 0;
} else {
    console.log(`FAILED: ${failed.join(', ')}`);
    process.exitCode = 1;
}
