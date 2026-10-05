'use strict';
/*
 * Schema-driven document generator.
 *
 * Builds a schema-conformant datapack document from the compiled mcdoc tables, so
 * the validation tests can assert "valid data produces no diagnostics" and can
 * inject probe fields at every nested position.
 *
 * Deliberately simple: values are placeholders, but every field the schema
 * declares is present, every dispatch container carries exactly the discriminator
 * its own struct body requires, and list fields get one item per union member.
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = path.resolve(__dirname, '..');
const SCHEMA = require(path.join(process.env.DSH_BUILD_DIR
    ? path.resolve(WORKSPACE, process.env.DSH_BUILD_DIR)
    : path.join(WORKSPACE, 'out'), 'mcdocSchema.js'));

/** Dispatch bindings read from the engine source, so the generator stays in sync. */
function loadDispatchBindings() {
    const src = fs.readFileSync(path.join(WORKSPACE, 'src', 'diagnostics.ts'), 'utf8');
    const block = /const DISPATCH_BINDINGS[\s\S]*?=\s*\{([\s\S]*?)\n\};/.exec(src);
    const result = {};
    if (!block) throw new Error('DISPATCH_BINDINGS not found in src/diagnostics.ts');
    const groupRe = /([A-Za-z0-9_]+)\s*:\s*\[([\s\S]*?)\]/g;
    let group;
    while ((group = groupRe.exec(block[1])) !== null) {
        const bindings = [];
        const objectRe = /\{([^}]*)\}/g;
        let entry;
        while ((entry = objectRe.exec(group[2])) !== null) {
            const registry = /registry:\s*'([^']+)'/.exec(entry[1]);
            if (!registry) continue;
            const key = /key:\s*'([^']+)'/.exec(entry[1]);
            bindings.push({ key: key ? key[1] : null, registry: registry[1] });
        }
        result[group[1]] = bindings;
    }
    return result;
}

const DISPATCH_BINDINGS = loadDispatchBindings();

const LIST_FIELDS = new Set([
    'actions', 'entities', 'items', 'blocks', 'keys', 'categories', 'fluid_types',
    'valid_effects', 'valid_blocks', 'valid_entities', 'modifiers', 'modifications',
    'texture_entries', 'growth_items', 'conditions', 'bonuses', 'glows', 'block_visions',
    'attributes', 'damage_types', 'item_conversions', 'harvest_bonuses', 'attribute_scales',
    'effects', 'emotes', 'bodies', 'abilities', 'penalties', 'targeting_modes',
    'block_hit_effects', 'entity_hit_effects', 'common_hit_effects', 'ticking_effects',
    'on_destroy_effects', 'item_predicates', 'recovery_items', 'growth_range',
    'climbables', 'entries'
]);

const PLACEHOLDER_OVERRIDES = {
    trigger_point: 'default',
    direction: 'up',
    type: 'minecraft:constant'
};

function asObjectPlaceholder(name) {
    return /(condition|predicate|nbt|data|expression|usage_blocked|settings|config|particle_data|projectile_data)/.test(name);
}

function placeholder(name) {
    if (Object.prototype.hasOwnProperty.call(PLACEHOLDER_OVERRIDES, name)) return PLACEHOLDER_OVERRIDES[name];
    if (/^(is_|can_|should_|show_|has_|use_|locks_|allow|enabled)/.test(name)) return true;
    if (/(amount|level|rate|radius|range|height|duration|ticks|speed|scale|probability|chance|weight|count|cost|multiplier|progress|force|spread|amplifier|from_level|maximum|minimum|number|alpha|color|growth|mana|health|oxygen|hunger|saturation|experience|bonus)/.test(name)) return 1;
    return 'test:value';
}

function fieldsOf(structName) {
    const struct = SCHEMA.MCDOC_STRUCTS[structName];
    if (!struct) return [];
    return [...new Set([...(struct.required || []), ...(struct.optional || [])])];
}

function childrenFor(structName, variantName, field) {
    const out = new Set();
    for (const name of [structName, variantName]) {
        if (!name) continue;
        const map = SCHEMA.MCDOC_STRUCT_CHILDREN[name];
        if (map && map[field]) for (const child of map[field]) out.add(child);
    }
    return [...out];
}

/**
 * @param {string} rootStruct
 * @param {object} [options]
 * @param {Record<string, {registry: string, value: string}>} [options.overrides]
 *        Force a dispatch container to a specific variant.
 * @returns {{doc: object, containers: Array<{struct: string, registry: string, value: string}>}}
 */
function buildDoc(rootStruct, options = {}) {
    const overrides = options.overrides || {};
    const unionPicks = options.unionPicks || {};
    const containers = [];
    const unions = [];
    const seenContainers = new Set();
    const seenUnions = new Set();

    function expand(structName, depth, stack) {
        if (depth > 10 || !SCHEMA.MCDOC_STRUCTS[structName] || stack.includes(structName)) return null;
        const obj = {};
        const struct = SCHEMA.MCDOC_STRUCTS[structName];
        const ownFields = new Set([...(struct.required || []), ...(struct.optional || [])]);
        const bindings = DISPATCH_BINDINGS[structName] || [];
        const keyed = bindings.filter(binding => binding.key);
        const override = overrides[structName];
        // Prefer the discriminator the struct body declares itself: the projectile
        // effect containers spread three registries but require exactly one key.
        const chosen = (override && keyed.find(binding => binding.registry === override.registry))
            || keyed.find(binding => ownFields.has(binding.key))
            || keyed[0]
            || null;

        let variantName = null;
        for (const binding of bindings) {
            const variants = Object.entries(SCHEMA.MCDOC_DISPATCH[binding.registry] || {});
            if (binding === chosen && variants.length > 0) {
                const forced = override && override.registry === binding.registry ? override.value : null;
                const value = forced || variants[0][0];
                const target = forced ? SCHEMA.MCDOC_DISPATCH[binding.registry][forced] : variants[0][1];
                if (SCHEMA.MCDOC_STRUCTS[target]) {
                    obj[binding.key] = value;
                    variantName = target;
                    if (keyed.some(b => ownFields.has(b.key))) {
                        const id = `${structName}|${binding.registry}|${value}`;
                        if (!seenContainers.has(id)) {
                            seenContainers.add(id);
                            containers.push({ struct: structName, registry: binding.registry, value });
                        }
                    }
                }
            } else if (!binding.key && !variantName) {
                for (const [, target] of variants) {
                    if (SCHEMA.MCDOC_STRUCTS[target]) {
                        variantName = target;
                        break;
                    }
                }
            }
        }

        const names = [...new Set([...fieldsOf(structName), ...(variantName ? fieldsOf(variantName) : [])])];
        for (const field of names) {
            if (field in obj) continue;
            const candidates = childrenFor(structName, variantName, field).filter(name => SCHEMA.MCDOC_STRUCTS[name]);
            if (candidates.length > 1) {
                const id = `${structName}|${field}`;
                if (!seenUnions.has(id)) {
                    seenUnions.add(id);
                    unions.push({ struct: structName, field, candidates });
                }
            }
            if (candidates.length > 0) {
                const picked = candidates.length > 1 && unionPicks[`${structName}|${field}`]
                    ? candidates.find(name => name === unionPicks[`${structName}|${field}`]) || candidates[0]
                    : candidates[0];
                if (LIST_FIELDS.has(field) && candidates.length > 1 && !unionPicks[`${structName}|${field}`]) {
                    // One item per union member keeps every branch covered.
                    const items = [];
                    for (const candidate of candidates) {
                        const child = expand(candidate, depth + 1, [...stack, structName]);
                        if (child !== null) items.push(child);
                    }
                    obj[field] = items;
                } else {
                    const child = expand(picked, depth + 1, [...stack, structName]);
                    if (child === null) continue;
                    obj[field] = LIST_FIELDS.has(field) ? [child] : child;
                }
            } else if (asObjectPlaceholder(field)) {
                obj[field] = {};
            } else {
                obj[field] = placeholder(field);
            }
        }
        return obj;
    }

    return { doc: expand(rootStruct, 0, []), containers, unions };
}

/** Every object position inside `node`, as JSON paths. */
function collectPositions(node, pathArr = [], out = []) {
    if (Array.isArray(node)) {
        node.forEach((item, i) => collectPositions(item, [...pathArr, i], out));
        return out;
    }
    if (!node || typeof node !== 'object') return out;
    out.push({ path: pathArr, obj: node });
    for (const [key, value] of Object.entries(node)) collectPositions(value, [...pathArr, key], out);
    return out;
}

function getAtPath(root, path) {
    let node = root;
    for (const segment of path) node = node[segment];
    return node;
}

module.exports = {
    SCHEMA,
    DISPATCH_BINDINGS,
    buildDoc,
    collectPositions,
    getAtPath,
    relPathForKind: kind => `data/test/dragonsurvival/${kind}/probe.json`
};
