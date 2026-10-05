'use strict';
/*
 * Datapack documents shared by the validation tests, so the editor engine and the
 * webview resolver are exercised on exactly the same data.
 */

/** Minimally valid dragon_ability. */
function baseAbility() {
    return {
        activation: { activation_type: 'dragonsurvival:simple', cooldown: 4 },
        actions: [
            {
                target_selection: {
                    target_type: 'dragonsurvival:area',
                    radius: 3,
                    applied_effects: {
                        entity_effect: [
                            { effect_type: 'dragonsurvival:damage', damage_type: 'minecraft:generic', amount: 5 }
                        ],
                        targeting_mode: 'enemies'
                    }
                }
            }
        ],
        icon: { texture_entries: [{ texture_resource: 'test:icon', from_level: 0 }] }
    };
}

/** Minimally valid projectile definition. */
function baseProjectile() {
    return {
        general_data: {
            name: 'test:probe',
            block_hit_effects: [
                { block_effect: 'dragonsurvival:particle', particle_data: {}, particle_count: 4 }
            ],
            common_hit_effects: [
                {
                    general_data: {
                        effects: [
                            {
                                effect: {
                                    entity_effect: 'dragonsurvival:damage',
                                    damage_type: 'minecraft:generic',
                                    amount: 2
                                }
                            }
                        ]
                    },
                    target_type: 'dragonsurvival:point'
                }
            ],
            entity_hit_condition: {},
            entity_hit_effects: [
                { entity_effect: 'dragonsurvival:damage', damage_type: 'minecraft:generic', amount: 3 }
            ],
            ticking_effects: [
                {
                    general_data: { effects: [] },
                    target_type: 'dragonsurvival:area',
                    radius: 1
                }
            ]
        },
        // Required since mcdoc v2.1.0.
        type_data: {
            texture: { texture_entries: [{ from_level: 0, texture_resource: 'test:icon' }] }
        }
    };
}

/** Minimally valid dragon_body in the model-less short form. */
function shortDragonBody() {
    return {
        modifiers: [],
        is_default: false,
        default_icon: 'test:icon'
    };
}

/** Value at a JSON path. */
function getAtPath(root, path) {
    let node = root;
    for (const segment of path) node = node[segment];
    return node;
}

module.exports = { baseAbility, baseProjectile, shortDragonBody, getAtPath };
