'use strict';
/*
 * Checks the sidebar (webview) field validation: media/main.js must resolve the
 * mcdoc struct for every nesting level, so a field sitting in the wrong branch is
 * marked as invalid instead of being rendered as normal.
 *
 * Run: node test/webview-resolve.js
 */

const { loadWebview } = require('./webview-harness');
const { baseAbility, baseProjectile, shortDragonBody, getAtPath } = require('./fixtures');

const windowStub = loadWebview();
const resolver = windowStub.__dragonResolver;
if (!resolver || typeof resolver.resolveStructAtPath !== 'function') {
    console.error('media/main.js did not expose window.__dragonResolver');
    process.exit(1);
}

function resolve(kind, doc, path) {
    const obj = getAtPath(doc, path);
    return resolver.resolveStructAtPath(kind, doc, path, obj);
}

function allowed(struct, field) {
    if (!struct) return null; // position is not validated at all
    return (struct.required || []).includes(field) || (struct.optional || []).includes(field);
}

let passed = 0;
const failures = [];

function check(name, condition, detail) {
    if (condition) {
        passed++;
        console.log(`PASS  ${name}`);
    } else {
        failures.push(`${name}${detail ? ` (${detail})` : ''}`);
        console.log(`FAIL  ${name}${detail ? ` -> ${detail}` : ''}`);
    }
}

/** The position must be validated and must reject `field`. */
function rejects(name, kind, doc, path, field) {
    const struct = resolve(kind, doc, path);
    const result = allowed(struct, field);
    check(name, result === false, result === null ? 'position not validated at all' : `"${field}" is allowed`);
}

/** The position must be validated and must accept `field`. */
function accepts(name, kind, doc, path, field) {
    const struct = resolve(kind, doc, path);
    const result = allowed(struct, field);
    check(name, result === true, result === null ? 'position not validated at all' : `"${field}" is rejected`);
}

/** The position must not be validated (detached value or unmodelled struct). */
function unchecked(name, kind, doc, path) {
    const struct = resolve(kind, doc, path);
    check(name, struct === null, 'position is validated');
}

// --- Control: valid data stays clean --------------------------------------
{
    const d = baseAbility();
    accepts('ability: root accepts activation', 'dragon_ability', d, [], 'activation');
    accepts('ability: activation accepts activation_type', 'dragon_ability', d, ['activation'], 'activation_type');
    accepts('ability: activation accepts cooldown (simple)', 'dragon_ability', d, ['activation'], 'cooldown');
    accepts('ability: targeting accepts radius (area)', 'dragon_ability', d, ['actions', 0, 'target_selection'], 'radius');
    accepts(
        'ability: applied_effects accepts entity_effect',
        'dragon_ability', d, ['actions', 0, 'target_selection', 'applied_effects'], 'entity_effect'
    );
    accepts(
        'ability: entity effect accepts damage_type',
        'dragon_ability', d,
        ['actions', 0, 'target_selection', 'applied_effects', 'entity_effect', 0], 'damage_type'
    );
}

// The potion position needs a potion effect in the document.
{
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        { effect_type: 'dragonsurvival:potion', potion: { effects: [], amplifier: 1, duration: 20 } }
    ];
    const potionPath = ['actions', 0, 'target_selection', 'applied_effects', 'entity_effect', 0, 'potion'];
    accepts('ability: nested potion accepts amplifier', 'dragon_ability', d, potionPath, 'amplifier');
    rejects('ability: nested potion rejects stray range', 'dragon_ability', d, potionPath, 'range');
}

// --- Branch / variant leakage ---------------------------------------------
{
    const d = baseAbility();
    d.activation.max_duration = 40;
    rejects('ability: simple activation rejects channeled max_duration', 'dragon_ability', d, ['activation'], 'max_duration');
}
{
    const d = baseAbility();
    d.actions[0].target_selection.range_multiplier = 2;
    rejects(
        'ability: area target rejects dragon_breath range_multiplier',
        'dragon_ability', d, ['actions', 0, 'target_selection'], 'range_multiplier'
    );
}
{
    const d = baseAbility();
    d.actions[0].target_selection = {
        target_type: 'dragonsurvival:self',
        radius: 3,
        applied_effects: { entity_effect: [], targeting_mode: 'all' }
    };
    rejects('ability: self target rejects area radius', 'dragon_ability', d, ['actions', 0, 'target_selection'], 'radius');
}
{
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.radius = 5;
    rejects(
        'ability: applied_effects rejects AreaTarget radius',
        'dragon_ability', d, ['actions', 0, 'target_selection', 'applied_effects'], 'radius'
    );
}
{
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects = { targeting_mode: 'enemies', bogus_field: 1 };
    rejects(
        'ability: applied_effects with no union member rejects bogus_field',
        'dragon_ability', d, ['actions', 0, 'target_selection', 'applied_effects'], 'bogus_field'
    );
}
{
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        { effect_type: 'dragonsurvival:damage', damage_type: 'minecraft:generic', amount: 5, percentage: 0.5 }
    ];
    rejects(
        'ability: damage effect rejects heal-only percentage',
        'dragon_ability', d,
        ['actions', 0, 'target_selection', 'applied_effects', 'entity_effect', 0], 'percentage'
    );
}
{
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        {
            effect_type: 'dragonsurvival:modifier',
            modifiers: [{ type: 'minecraft:generic.max_health', amount: 2, range: 3 }]
        }
    ];
    rejects(
        'ability: modifier entry rejects stray range',
        'dragon_ability', d,
        ['actions', 0, 'target_selection', 'applied_effects', 'entity_effect', 0, 'modifiers', 0], 'range'
    );
}
{
    const d = baseAbility();
    d.bogus_root = true;
    rejects('ability: root rejects bogus field', 'dragon_ability', d, [], 'bogus_root');
}

// --- Trigger variants ------------------------------------------------------
{
    const d = baseAbility();
    d.activation = {
        activation_type: 'dragonsurvival:passive',
        trigger: { trigger_type: 'dragonsurvival:on_key_pressed', keys: ['key.jump'] }
    };
    const triggerPath = ['activation', 'trigger'];
    accepts('ability: key-pressed trigger accepts keys', 'dragon_ability', d, triggerPath, 'keys');
    rejects('ability: key-pressed trigger rejects on_self_hit condition', 'dragon_ability', d, triggerPath, 'condition');
}
{
    const d = baseAbility();
    d.activation = {
        activation_type: 'dragonsurvival:passive',
        trigger: { trigger_type: 'dragonsurvival:constant' }
    };
    rejects(
        'ability: constant trigger rejects keys',
        'dragon_ability', d, ['activation', 'trigger'], 'keys'
    );
}

// --- Projectile effects ---------------------------------------------------
{
    const d = baseProjectile();
    accepts('projectile: entity effect accepts amount', 'projectile_data', d, ['general_data', 'entity_hit_effects', 0], 'amount');
    rejects(
        'projectile: entity effect rejects world-only explosion_power',
        'projectile_data', d, ['general_data', 'entity_hit_effects', 0], 'explosion_power'
    );
    rejects(
        'projectile: entity effect rejects unknown field',
        'projectile_data', d, ['general_data', 'entity_hit_effects', 0], 'zz_bogus'
    );
}
{
    const d = baseProjectile();
    d.general_data.block_hit_effects[0].potion = {};
    accepts(
        'projectile: block effect accepts particle_count',
        'projectile_data', d, ['general_data', 'block_hit_effects', 0], 'particle_count'
    );
    rejects(
        'projectile: block particle effect rejects area_cloud-only potion',
        'projectile_data', d, ['general_data', 'block_hit_effects', 0], 'potion'
    );
}
{
    const d = baseProjectile();
    d.general_data.common_hit_effects[0].general_data.effects = [
        {
            effect: {
                world_effect: 'dragonsurvival:explosion',
                damage_type: 'minecraft:generic',
                explosion_power: 2,
                fire: false,
                break_blocks: true,
                can_damage_self: false,
                amount: 5
            }
        }
    ];
    const effectPath = ['general_data', 'common_hit_effects', 0, 'general_data', 'effects', 0, 'effect'];
    accepts('projectile: world effect accepts explosion_power', 'projectile_data', d, effectPath, 'explosion_power');
    rejects('projectile: world effect rejects entity-only amount', 'projectile_data', d, effectPath, 'amount');
}
{
    const d = baseProjectile();
    d.type_data = { texture: { texture_entries: [] }, resources: {} };
    accepts('projectile: type_data arrow accepts texture', 'projectile_data', d, ['type_data'], 'texture');
    rejects('projectile: type_data arrow rejects ball-only resources', 'projectile_data', d, ['type_data'], 'resources');
}

// --- Positions that must stay unchecked -----------------------------------
{
    const d = baseAbility();
    unchecked(
        'ability: LevelBasedValueMap (radius) is not key-checked',
        'dragon_ability', d, ['actions', 0, 'target_selection', 'radius']
    );
    // Some detail views render a detached sub-object at path []; those must stay
    // unchecked instead of being validated as the document root.
    const detached = { abilities: ['test:one'], penalties: [] };
    const struct = resolver.resolveStructAtPath('dragon_ability', d, [], detached);
    check('ability: detached object at path [] is not key-checked', struct === null, 'detached object was validated');
}

// --- Data-map kinds have no mcdoc struct ----------------------------------
{
    const d = { values: { 'minecraft:apple': { nutrition: 4 } } };
    unchecked('diet entries: no mcdoc struct', 'diet_entries', d, []);
}

// --- mcdoc v2.1.0 additions ------------------------------------------------
{
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        {
            effect_type: 'dragonsurvival:climbable',
            climbables: [
                {
                    base: { id: 'test:climb' },
                    blocks: { entries: [{ from_level: 1, value: {} }] }
                }
            ]
        }
    ];
    const effectPath = ['actions', 0, 'target_selection', 'applied_effects', 'entity_effect', 0];
    accepts('ability: climbable effect accepts climbables', 'dragon_ability', d, effectPath, 'climbables');
    rejects('ability: climbable effect rejects swim-only max_oxygen', 'dragon_ability', d, effectPath, 'max_oxygen');
}
{
    const d = baseProjectile();
    d.general_data.common_hit_effects[0].radius = 3;
    rejects(
        'projectile: point target rejects area-only radius',
        'projectile_data', d, ['general_data', 'common_hit_effects', 0], 'radius'
    );
    accepts(
        'projectile: point target accepts target_type',
        'projectile_data', d, ['general_data', 'common_hit_effects', 0], 'target_type'
    );
}
{
    // The model-less short form must be checked (not skipped) and must not be
    // asked for the full-body fields.
    const d = shortDragonBody();
    accepts('dragon_body: short form accepts modifiers', 'dragon_body', d, [], 'modifiers');
    accepts('dragon_body: short form accepts default_icon', 'dragon_body', d, [], 'default_icon');
    rejects('dragon_body: short form rejects unknown field', 'dragon_body', d, [], 'zz_bogus');
}
{
    const d = baseProjectile();
    d.type_data = { texture: { texture_entries: [{ from_level: 0, texture_resource: 'test:icon' }] } };
    accepts('projectile: type_data accepts texture', 'projectile_data', d, ['type_data'], 'texture');
}

console.log(`\n${passed}/${passed + failures.length} checks passed`);
if (failures.length) {
    console.log('\nfailing checks:');
    for (const f of failures) console.log(`  - ${f}`);
    process.exitCode = 1;
}
