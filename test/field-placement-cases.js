'use strict';
/*
 * Field-placement probe: does the engine flag fields that sit in a place where
 * the schema does not allow them?
 *
 * Each case crafts a datapack document and declares which field names must be
 * reported as 未知字段 (unknown field), which required fields must be reported as
 * 缺少必需字段 (missing required), and/or which other messages must appear.
 *
 * Run: node test/field-placement-cases.js        (after npm run compile)
 *      $env:DSH_BUILD_DIR='_scratch/out'; node test/field-placement-cases.js
 */

const { runDiagnostics } = require('./harness');
const { baseAbility, baseProjectile, shortDragonBody } = require('./fixtures');

const ABILITY = 'data/test/dragonsurvival/dragon_ability/probe.json';
const PROJECTILE = 'data/test/dragonsurvival/projectile_data/probe.json';
const BODY = 'data/test/dragonsurvival/dragon_body/probe.json';

function relFor(kind) {
    if (kind === 'projectile_data') return PROJECTILE;
    if (kind === 'dragon_body') return BODY;
    return ABILITY;
}

const cases = [];
function add(name, kind, mutate, expected) {
    cases.push({
        name,
        rel: relFor(kind),
        mutate,
        expectUnknown: (expected && expected.unknown) || [],
        expectMissing: (expected && expected.missing) || [],
        expectMessages: (expected && expected.messages) || []
    });
}

// --- Control: untouched documents must be clean ----------------------------
add('ability: baseline valid document', 'dragon_ability', () => baseAbility(), {});
add('projectile: baseline valid document', 'projectile_data', () => baseProjectile(), {});

// --- Activation variant leakage -------------------------------------------
add('ability: activation simple + channeled-only max_duration', 'dragon_ability', () => {
    const d = baseAbility();
    d.activation.max_duration = 40; // ChanneledActivation only
    return d;
}, { unknown: ['max_duration'] });

// --- Targeting variant leakage --------------------------------------------
add('ability: target area + dragon_breath-only range_multiplier', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.range_multiplier = 2;
    return d;
}, { unknown: ['range_multiplier'] });

add('ability: target dragon_breath + area-only radius', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection = {
        target_type: 'dragonsurvival:dragon_breath',
        range_multiplier: 2,
        radius: 3,
        applied_effects: { entity_effect: [], targeting_mode: 'all' }
    };
    return d;
}, { unknown: ['radius'] });

add('ability: target self + area-only radius', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection = {
        target_type: 'dragonsurvival:self',
        radius: 3,
        applied_effects: { entity_effect: [], targeting_mode: 'all' }
    };
    return d;
}, { unknown: ['radius'] });

// --- applied_effects union (BlockTargeting | EntityTargeting) --------------
add('ability: applied_effects EntityTargeting + AreaTarget radius', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.radius = 5;
    return d;
}, { unknown: ['radius'] });

add('ability: applied_effects BlockTargeting + AreaTarget radius', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects = {
        block_effect: [{ effect_type: 'dragonsurvival:particle' }],
        radius: 5
    };
    return d;
}, { unknown: ['radius'] });

add('ability: applied_effects with neither union member', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects = { targeting_mode: 'enemies', bogus_field: 1 };
    return d;
}, { unknown: ['bogus_field'], missing: ['block_effect'] });

// --- Entity effect variant leakage ----------------------------------------
add('ability: damage effect + heal-only percentage', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        { effect_type: 'dragonsurvival:damage', damage_type: 'minecraft:generic', amount: 5, percentage: 0.5 }
    ];
    return d;
}, { unknown: ['percentage'] });

add('ability: heal effect + ignite-only ignite_ticks', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        { effect_type: 'dragonsurvival:heal', percentage: 0.5, ignite_ticks: 20 }
    ];
    return d;
}, { unknown: ['ignite_ticks'] });

add('ability: teleport effect + push-only push_force', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        {
            effect_type: 'dragonsurvival:teleport',
            target_direction: { direction: 'up' },
            range: 3,
            push_force: 1
        }
    ];
    return d;
}, { unknown: ['push_force'] });

// --- Nested struct fields -------------------------------------------------
add('ability: nested potion data + stray teleport range', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        { effect_type: 'dragonsurvival:potion', potion: { effects: [], amplifier: 1, duration: 20, range: 3 } }
    ];
    return d;
}, { unknown: ['range'] });

add('ability: modifier entry + stray range', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        {
            effect_type: 'dragonsurvival:modifier',
            modifiers: [{ type: 'minecraft:generic.max_health', amount: 2, range: 3 }]
        }
    ];
    return d;
}, { unknown: ['range'] });

// --- Root level -----------------------------------------------------------
add('ability: root level field copied from a variant', 'dragon_ability', () => {
    const d = baseAbility();
    d.max_duration = 40;
    return d;
}, { unknown: ['max_duration'] });

add('ability: root level nonsense field', 'dragon_ability', () => {
    const d = baseAbility();
    d.bogus_root = true;
    return d;
}, { unknown: ['bogus_root'] });

// --- Missing required + enum checks ---------------------------------------
add('ability: target_selection without target_type', 'dragon_ability', () => {
    const d = baseAbility();
    delete d.actions[0].target_selection.target_type;
    return d;
}, { missing: ['target_type'] });

add('ability: invalid activation_type enum value', 'dragon_ability', () => {
    const d = baseAbility();
    d.activation.activation_type = 'dragonsurvival:not_a_type';
    return d;
}, { messages: ['无效的 activation_type 值'] });

// --- Trigger variant leakage ----------------------------------------------
add('ability: passive activation with constant trigger stays clean', 'dragon_ability', () => {
    const d = baseAbility();
    d.activation = {
        activation_type: 'dragonsurvival:passive',
        trigger: { trigger_type: 'dragonsurvival:constant' }
    };
    return d;
}, {});

add('ability: key-pressed trigger + on_self_hit-only condition', 'dragon_ability', () => {
    const d = baseAbility();
    d.activation = {
        activation_type: 'dragonsurvival:passive',
        trigger: { trigger_type: 'dragonsurvival:on_key_pressed', keys: ['key.jump'], condition: {} }
    };
    return d;
}, { unknown: ['condition'] });

add('ability: mistyped trigger_type is reported', 'dragon_ability', () => {
    const d = baseAbility();
    d.activation = {
        activation_type: 'dragonsurvival:passive',
        trigger: { trigger_type: 'dragonsurvival:on_key_presed', keys: ['key.jump'] }
    };
    return d;
}, { messages: ['无效的 trigger_type 值'] });

// --- Projectile effects: the variant is chosen by entity/block/world key ---
add('projectile: entity effect + world-only explosion_power', 'projectile_data', () => {
    const d = baseProjectile();
    d.general_data.entity_hit_effects[0].explosion_power = 3;
    return d;
}, { unknown: ['explosion_power'] });

add('projectile: entity effect + unknown field', 'projectile_data', () => {
    const d = baseProjectile();
    d.general_data.entity_hit_effects[0].zz_bogus = 1;
    return d;
}, { unknown: ['zz_bogus'] });

add('projectile: block effect particle + area_cloud-only potion', 'projectile_data', () => {
    const d = baseProjectile();
    d.general_data.block_hit_effects[0].potion = {};
    return d;
}, { unknown: ['potion'] });

add('projectile: world effect explosion + entity-only amount', 'projectile_data', () => {
    const d = baseProjectile();
    d.general_data.ticking_effects[0].general_data.effects = [
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
    return d;
}, { unknown: ['amount'] });

add('projectile: world effect explosion missing required fields', 'projectile_data', () => {
    const d = baseProjectile();
    d.general_data.ticking_effects[0].general_data.effects = [
        { effect: { world_effect: 'dragonsurvival:explosion' } }
    ];
    return d;
}, { missing: ['explosion_power', 'damage_type'] });

add('projectile: common_hit_effects effect block_effect particle + wrong branch field', 'projectile_data', () => {
    const d = baseProjectile();
    d.general_data.common_hit_effects[0].general_data.effects = [
        {
            effect: {
                block_effect: 'dragonsurvival:particle',
                particle_data: {},
                particle_count: 1,
                radius: 2
            }
        }
    ];
    return d;
}, { unknown: ['radius'] });

add('projectile: type_data arrow + ball-only resources', 'projectile_data', () => {
    const d = baseProjectile();
    d.type_data = { texture: { texture_entries: [] }, resources: {} };
    return d;
}, { unknown: ['resources'] });

// --- mcdoc v2.1.0 additions ------------------------------------------------
add('ability: climbable effect stays clean', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        {
            effect_type: 'dragonsurvival:climbable',
            climbables: [
                {
                    base: { id: 'test:climb' },
                    blocks: { entries: [{ from_level: 1, value: {} }] },
                    can_stick_to_walls: true,
                    can_climb_ceilings: false
                }
            ]
        }
    ];
    return d;
}, {});

add('ability: climbable effect rejects another variant field', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        {
            effect_type: 'dragonsurvival:climbable',
            climbables: [],
            max_oxygen: 100
        }
    ];
    return d;
}, { unknown: ['max_oxygen'] });

add('projectile: point target rejects area-only radius', 'projectile_data', () => {
    const d = baseProjectile();
    d.general_data.common_hit_effects[0].radius = 3;
    return d;
}, { unknown: ['radius'] });

add('ability: projectile effect accepts projectile_type without projectile_data', 'dragon_ability', () => {
    const d = baseAbility();
    d.actions[0].target_selection.applied_effects.entity_effect = [
        {
            effect_type: 'dragonsurvival:projectile',
            target_direction: { direction: 'looking_at' },
            number_of_projectiles: 1,
            speed: 1,
            projectile_type: 'minecraft:arrow'
        }
    ];
    return d;
}, {});

add('dragon_body: model-less short form stays clean', 'dragon_body', () => {
    return shortDragonBody();
}, {});

add('dragon_body: short form rejects an unknown field', 'dragon_body', () => {
    const d = shortDragonBody();
    d.zz_bogus = 1;
    return d;
}, { unknown: ['zz_bogus'] });

add('dragon_body: short form is not asked for model fields', 'dragon_body', () => {
    return shortDragonBody();
}, {});

// ---------------------------------------------------------------------------

let passed = 0;
const failures = [];

for (const c of cases) {
    const obj = c.mutate();
    const text = JSON.stringify(obj, null, 2);
    const { diagnostics } = runDiagnostics(c.rel, text);
    const messages = diagnostics.map(d => `${d.severity}:${d.message}`);

    const problems = [];
    for (const field of c.expectUnknown) {
        if (!messages.some(m => m.includes(`未知字段: "${field}"`))) {
            problems.push(`expected unknown-field warning for "${field}"`);
        }
    }
    for (const field of c.expectMissing) {
        if (!messages.some(m => m.includes(`缺少必需字段: "${field}"`))) {
            problems.push(`expected missing-field error for "${field}"`);
        }
    }
    for (const needle of c.expectMessages) {
        if (!messages.some(m => m.includes(needle))) {
            problems.push(`expected message containing "${needle}"`);
        }
    }
    const expectsNothing = c.expectUnknown.length === 0 && c.expectMissing.length === 0 && c.expectMessages.length === 0;
    if (expectsNothing && diagnostics.length > 0) {
        problems.push(`expected no diagnostics, got ${diagnostics.length}`);
    }

    if (problems.length === 0) {
        passed++;
        console.log(`PASS  ${c.name}`);
    } else {
        failures.push({ name: c.name, problems, messages });
        console.log(`FAIL  ${c.name}`);
        for (const p of problems) console.log(`        - ${p}`);
        for (const m of messages) console.log(`        actual: ${m}`);
    }
}

console.log(`\n${passed}/${cases.length} cases passed`);
if (failures.length) {
    console.log(`\n${failures.length} failing case(s):`);
    for (const f of failures) console.log(`  - ${f.name}`);
    process.exitCode = 1;
}
