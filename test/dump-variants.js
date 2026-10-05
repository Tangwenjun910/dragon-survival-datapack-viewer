'use strict';
// Print per-variant field differences for each dispatch registry, so test cases
// can use fields that are unique to one variant.
const path = require('path');
const S = require(path.resolve(__dirname, '..', 'out', 'mcdocSchema.js'));

const fields = name => {
    const s = S.MCDOC_STRUCTS[name];
    if (!s) return null;
    return new Set([...(s.required || []), ...(s.optional || [])]);
};

const registries = process.argv.slice(2);
const all = registries.length ? registries : Object.keys(S.MCDOC_DISPATCH);

for (const reg of all) {
    const map = S.MCDOC_DISPATCH[reg] || {};
    const variants = Object.entries(map);
    console.log(`\n=== ${reg}  (${variants.length} variants)`);
    const sets = new Map();
    for (const [value, struct] of variants) {
        const f = fields(struct);
        if (!f) {
            console.log(`  ${value.padEnd(38)} -> ${struct}  [MISSING STRUCT]`);
            continue;
        }
        sets.set(value, f);
    }
    // union and per-variant unique fields
    const union = new Set();
    for (const f of sets.values()) for (const x of f) union.add(x);
    for (const [value, f] of sets) {
        const unique = [...f].filter(x => {
            let count = 0;
            for (const other of sets.values()) if (other.has(x)) count++;
            return count === 1;
        });
        console.log(`  ${value.padEnd(38)} -> ${map[value].padEnd(58)} unique=[${unique.join(', ')}]`);
    }
    console.log(`  union(${union.size}) = [${[...union].join(', ')}]`);
}
