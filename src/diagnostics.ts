// Diagnostics engine: walks datapack JSON and reports fields the mcdoc schema
// does not allow at their position, plus missing required fields.
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { MCDOC_STRUCTS, KIND_TO_STRUCT, KIND_TO_UNION, MCDOC_DISPATCH, MCDOC_STRUCT_CHILDREN } from './mcdocSchema';
import { getCustomFieldContext, getCustomValuesForContext } from './customFields';

const KIND_PATTERNS: Record<string, RegExp> = {
    dragon_ability: /\/data\/[^/]+\/dragonsurvival\/dragon_ability\//i,
    dragon_species: /\/data\/[^/]+\/dragonsurvival\/dragon_species\//i,
    dragon_stage: /\/data\/[^/]+\/dragonsurvival\/dragon_stage\//i,
    dragon_penalty: /\/data\/[^/]+\/dragonsurvival\/dragon_penalty\//i,
    projectile_data: /\/data\/[^/]+\/dragonsurvival\/projectile_data\//i,
    dragon_body: /\/data\/[^/]+\/dragonsurvival\/dragon_body\//i,
    dragon_emote_set: /\/data\/[^/]+\/dragonsurvival\/dragon_emote_set\//i
};

interface StructInfo {
    required: string[];
    optional: string[];
}

interface ResolvedStruct {
    baseName?: string;
    /** Variant structs contributed by the resolved `...dispatch` spreads. */
    variantNames: string[];
    struct: StructInfo;
    missingRequired?: string[];
}

const ENUM_VALUES: Record<string, string[]> = {
    activation_type: ['dragonsurvival:passive', 'dragonsurvival:simple', 'dragonsurvival:channeled'],
    upgrade_type: ['dragonsurvival:experience_points', 'dragonsurvival:experience_levels', 'dragonsurvival:dragon_growth', 'dragonsurvival:item_based', 'dragonsurvival:condition_based'],
    target_type: ['dragonsurvival:area', 'dragonsurvival:dragon_breath', 'dragonsurvival:looking_at', 'dragonsurvival:self', 'dragonsurvival:disc'],
    projectile_target_type: ['dragonsurvival:area', 'dragonsurvival:point'],
    projectile_entity_effect_type: ['dragonsurvival:damage', 'dragonsurvival:potion', 'dragonsurvival:lightning', 'dragonsurvival:particle', 'dragonsurvival:run_function', 'dragonsurvival:push'],
    projectile_block_effect_type: ['dragonsurvival:particle', 'dragonsurvival:run_function', 'dragonsurvival:area_cloud'],
    projectile_world_effect_type: ['dragonsurvival:explosion', 'dragonsurvival:lightning', 'dragonsurvival:particle', 'dragonsurvival:run_function'],
    effect_type: [
        'dragonsurvival:damage', 'dragonsurvival:modifier', 'dragonsurvival:potion', 'dragonsurvival:projectile',
        'dragonsurvival:summon_entity', 'dragonsurvival:damage_modification', 'dragonsurvival:breath_particles',
        'dragonsurvival:ignite', 'dragonsurvival:harvest_bonus', 'dragonsurvival:on_attack', 'dragonsurvival:flight',
        'dragonsurvival:spin', 'dragonsurvival:item_conversion', 'dragonsurvival:swim', 'dragonsurvival:effect_modification',
        'dragonsurvival:particle', 'dragonsurvival:glow', 'dragonsurvival:oxygen_bonus', 'dragonsurvival:block_vision',
        'dragonsurvival:run_function', 'dragonsurvival:smelting', 'dragonsurvival:heal', 'dragonsurvival:teleport',
        'dragonsurvival:push', 'dragonsurvival:hunger', 'dragonsurvival:effect_removal', 'dragonsurvival:use_item',
        'dragonsurvival:dragon_growth', 'dragonsurvival:mana_recovery', 'dragonsurvival:experience',
        'dragonsurvival:cooldown_recovery',
        'dragonsurvival:bonemeal', 'dragonsurvival:conversion', 'dragonsurvival:fire', 'dragonsurvival:area_cloud',
        'dragonsurvival:block_break', 'dragonsurvival:explosion', 'dragonsurvival:block_harvest',
        'dragonsurvival:climbable'
    ],
    trigger_point: ['default', 'charging', 'channel_completion'],
    // Discriminator of ActivationTrigger; without it a typo would go unnoticed and
    // every trigger variant's fields would be accepted.
    trigger_type: [
        'dragonsurvival:constant', 'dragonsurvival:on_self_hit', 'dragonsurvival:on_target_hit',
        'dragonsurvival:on_target_killed', 'dragonsurvival:on_death', 'dragonsurvival:on_block_break',
        'dragonsurvival:on_key_pressed', 'dragonsurvival:on_key_released'
    ],
    direction: ['looking_at', 'towards_entity', 'up', 'down', 'east', 'west', 'south', 'north'],
    display_type: ['outline', 'particles', 'simple_shader', 'none'],
    modification_type: ['additive', 'multiplicative'],
    penalty_type: ['dragonsurvival:take_damage', 'dragonsurvival:mob_effect', 'dragonsurvival:item_blacklist', 'dragonsurvival:damage_modification', 'dragonsurvival:fear', 'dragonsurvival:informational', 'dragonsurvival:modifier', 'dragonsurvival:effect_modification', 'dragonsurvival:run_function'],
    penalty_trigger: ['dragonsurvival:supply', 'dragonsurvival:instant', 'dragonsurvival:item_used', 'dragonsurvival:hit_by_projectile', 'dragonsurvival:hit_by_water_potion'],
    adjustment_type: ['percent', 'flat'],
    experience_type: ['levels', 'points'],
    cooldown_recovery_action_type: ['set', 'reduce']
};

interface CustomEffectDefinition {
    type: string;
    fields?: string[];
    required?: string[];
    fieldInfo?: Record<string, string>;
}

function getProjectCustomEffectDefinitions(): Record<string, CustomEffectDefinition> {
    const result: Record<string, CustomEffectDefinition> = {};
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) return result;
    const filePath = path.join(folder.uri.fsPath, '.vscode', 'dragon-survival-custom-effects.json');
    try {
        const text = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
            for (const def of parsed) {
                if (def && typeof def.type === 'string' && !result[def.type]) {
                    result[def.type] = {
                        type: def.type,
                        fields: Array.isArray(def.fields) ? def.fields.filter((x: unknown): x is string => typeof x === 'string') : [],
                        required: Array.isArray(def.required) ? def.required.filter((x: unknown): x is string => typeof x === 'string') : [],
                        fieldInfo: def.fieldInfo && typeof def.fieldInfo === 'object' ? def.fieldInfo : undefined
                    };
                }
            }
        }
    } catch {
        // File may not exist yet.
    }
    return result;
}

function getCustomEffectDefinitions(): Record<string, CustomEffectDefinition> {
    const config = vscode.workspace.getConfiguration('dragonSurvivalDatapack');
    const result: Record<string, CustomEffectDefinition> = {};
    const defs = config.get<CustomEffectDefinition[]>('customEffects', []);
    for (const def of defs) {
        if (def && typeof def.type === 'string' && !result[def.type]) {
            result[def.type] = {
                type: def.type,
                fields: Array.isArray(def.fields) ? def.fields.filter((x: unknown): x is string => typeof x === 'string') : [],
                required: Array.isArray(def.required) ? def.required.filter((x: unknown): x is string => typeof x === 'string') : [],
                fieldInfo: def.fieldInfo && typeof def.fieldInfo === 'object' ? def.fieldInfo : undefined
            };
        }
    }
    Object.assign(result, getProjectCustomEffectDefinitions());
    return result;
}

function getCustomEffectTypes(): string[] {
    const config = vscode.workspace.getConfiguration('dragonSurvivalDatapack');
    const simple = config.get<string[]>('customEffectTypes', []);
    const defs = config.get<CustomEffectDefinition[]>('customEffects', []);
    const all = new Set<string>(simple);
    for (const def of defs) {
        if (def && typeof def.type === 'string') all.add(def.type);
    }
    for (const def of Object.values(getProjectCustomEffectDefinitions())) {
        all.add(def.type);
    }
    return [...all];
}

const BLOCK_TARGETING = 'BlockTargeting__data_dragonsurvival_dragon_ability';
const ENTITY_TARGETING = 'EntityTargeting__data_dragonsurvival_dragon_ability';
const COMBINED_TARGETING = `${BLOCK_TARGETING}+${ENTITY_TARGETING}`;

/**
 * Structs whose field list cannot be checked because the mcdoc describes them
 * only through a spread this schema subset cannot resolve.
 *
 * `SummonEntityEffect_NBT` spreads `minecraft:entity[[%parent.entities]]`: the
 * value is arbitrary entity NBT, not the field names used by the surrounding
 * document.
 */
function isPermissiveStruct(name?: string): boolean {
    if (!name) return false;
    return name.startsWith('SummonEntityEffect_NBT__');
}

/**
 * One `...dispatch[[...]]` spread of a struct body.
 *
 * `key` is the discriminator field that selects the variant. A spread whose
 * expression points at another node (`%parent...`) has no local discriminator:
 * the variant is chosen elsewhere in the document, so every variant of that
 * registry contributes fields.
 */
interface DispatchBinding {
    key?: string;
    registry: string;
}

/**
 * Dynamic spreads per struct. The mcdoc bodies carry `...registry[[key]]`
 * spreads; the generated struct field lists can only describe the static fields,
 * so the fields contributed by these spreads are resolved here.
 *
 * Keep in sync with mcdoc-src; `test/schema-bindings.js` checks this table
 * against the mcdoc sources.
 */
const DISPATCH_BINDINGS: Record<string, DispatchBinding[]> = {
    Activation__data_dragonsurvival_dragon_ability: [{ key: 'activation_type', registry: 'dragonsurvival:activation' }],
    Upgrade__data_dragonsurvival_dragon_ability: [{ key: 'upgrade_type', registry: 'dragonsurvival:upgrade_type' }],
    Targeting__data_dragonsurvival_dragon_ability: [{ key: 'target_type', registry: 'dragonsurvival:ability_targeting' }],
    EntityEffect__data_dragonsurvival_dragon_ability: [{ key: 'effect_type', registry: 'dragonsurvival:ability_entity_effect' }],
    BlockEffect__data_dragonsurvival_dragon_ability: [{ key: 'effect_type', registry: 'dragonsurvival:ability_block_effect' }],
    ActivationTrigger__data_dragonsurvival_dragon_ability: [{ key: 'trigger_type', registry: 'dragonsurvival:activation_trigger' }],
    PenaltyEffect__data_dragonsurvival_dragon_penalty: [{ key: 'penalty_type', registry: 'dragonsurvival:penalty_effect' }],
    PenaltyTrigger__data_dragonsurvival_dragon_penalty: [{ key: 'penalty_trigger', registry: 'dragonsurvival:penalty_trigger' }],
    ProjectileTargeting__data_dragonsurvival_projectile_data: [{ key: 'target_type', registry: 'dragonsurvival:projectile_targeting' }],
    // The three projectile effect containers spread all three registries, so the
    // variant is selected by whichever discriminator the object carries.
    ProjectileEntityEffect__data_dragonsurvival_projectile_data: [
        { key: 'entity_effect', registry: 'dragonsurvival:projectile_entity_effect' },
        { key: 'block_effect', registry: 'dragonsurvival:projectile_block_effect' },
        { key: 'world_effect', registry: 'dragonsurvival:projectile_world_effect' }
    ],
    ProjectileBlockEffect__data_dragonsurvival_projectile_data: [
        { key: 'entity_effect', registry: 'dragonsurvival:projectile_entity_effect' },
        { key: 'block_effect', registry: 'dragonsurvival:projectile_block_effect' },
        { key: 'world_effect', registry: 'dragonsurvival:projectile_world_effect' }
    ],
    ProjectileWorldEffect__data_dragonsurvival_projectile_data: [
        { key: 'entity_effect', registry: 'dragonsurvival:projectile_entity_effect' },
        { key: 'block_effect', registry: 'dragonsurvival:projectile_block_effect' },
        { key: 'world_effect', registry: 'dragonsurvival:projectile_world_effect' }
    ],
    // Selected by an ancestor node, not by a field of the object itself.
    Action__data_dragonsurvival_dragon_ability: [{ registry: 'dragonsurvival:trigger_point' }],
    Sound__data_dragonsurvival_dragon_ability: [{ registry: 'dragonsurvival:sound' }],
    Animations__data_dragonsurvival_dragon_ability: [{ registry: 'dragonsurvival:animatioin' }]
};

function detectKind(uri: vscode.Uri): string | undefined {
    const normalized = uri.fsPath.replace(/\\/g, '/');
    for (const [name, pattern] of Object.entries(KIND_PATTERNS)) {
        if (pattern.test(normalized)) {
            return name;
        }
    }
    return undefined;
}

function getStructInfo(name: string): StructInfo | undefined {
    const struct = MCDOC_STRUCTS[name];
    if (!struct) return undefined;
    return { required: struct.required, optional: struct.optional };
}

function mergeStructs(...structs: Array<StructInfo | undefined>): StructInfo {
    const required = new Set<string>();
    const optional = new Set<string>();
    for (const struct of structs) {
        if (!struct) continue;
        for (const key of struct.required) required.add(key);
        for (const key of struct.optional) optional.add(key);
    }
    return {
        required: [...required],
        optional: [...optional].filter(key => !required.has(key))
    };
}

function variantNamesOf(registry: string): string[] {
    return Object.values(MCDOC_DISPATCH[registry] || {});
}

function missingFieldsIn(struct: StructInfo, obj: Record<string, unknown>): string[] {
    return struct.required.filter(key => !(key in obj));
}

/**
 * Struct of one object node: the struct body plus every field contributed by the
 * dynamic spreads the object's own discriminators select.
 *
 * A single-key container (e.g. an entity effect) is resolved by its discriminator
 * value. The three projectile effect containers carry any one of
 * `entity_effect` / `block_effect` / `world_effect`, so whichever key is present
 * selects the variant. When no key is present at all the variant cannot be
 * determined: every variant of the bound registries stays allowed so custom and
 * hand-written data keep validating, while the container's own required
 * discriminator is still reported as missing.
 */
function resolveStructForObject(name: string, obj: Record<string, unknown>): ResolvedStruct | undefined {
    const base = getStructInfo(name);
    if (!base) return undefined;

    const bindings = DISPATCH_BINDINGS[name];
    if (!bindings || bindings.length === 0) {
        return { baseName: name, variantNames: [], struct: base };
    }

    const selected = new Set<string>();
    let undeterminedKey = false;
    for (const binding of bindings) {
        if (!binding.key) {
            // The variant is chosen by an ancestor node, so all of them apply.
            for (const variant of variantNamesOf(binding.registry)) selected.add(variant);
            continue;
        }
        const raw = obj[binding.key];
        const value = typeof raw === 'string' ? raw : undefined;
        const variant = value ? MCDOC_DISPATCH[binding.registry]?.[value] : undefined;
        if (variant && getStructInfo(variant)) {
            selected.add(variant);
        } else if (value !== undefined) {
            // Unknown (datapack-provided) discriminator value: keep that
            // registry's variants allowed instead of reporting false unknowns.
            for (const name of variantNamesOf(binding.registry)) selected.add(name);
        } else {
            undeterminedKey = true;
        }
    }

    // Every discriminator of the struct body is a legal key, whether or not this
    // object uses it (the mcdoc declares them as independent spreads).
    const discriminatorKeys: StructInfo = {
        required: [],
        optional: bindings.map(binding => binding.key).filter((key): key is string => !!key)
    };

    if (undeterminedKey && selected.size === 0) {
        for (const binding of bindings) {
            for (const variant of variantNamesOf(binding.registry)) selected.add(variant);
        }
        const variantNames = [...selected].filter(candidate => !!getStructInfo(candidate));
        return {
            baseName: name,
            variantNames,
            struct: mergeStructs(base, discriminatorKeys, ...variantNames.map(getStructInfo)),
            missingRequired: base.required
        };
    }

    const variantNames = [...selected].filter(candidate => !!getStructInfo(candidate));
    return {
        baseName: name,
        variantNames,
        struct: mergeStructs(base, discriminatorKeys, ...variantNames.map(getStructInfo))
    };
}

/**
 * Struct for a value that may fit several candidate structs (a union in the
 * mcdoc, e.g. `BlockTargeting | EntityTargeting`). Fields are checked against
 * every candidate so a field of the wrong branch is reported, while "missing
 * required" follows the candidate the value comes closest to matching.
 */
function resolveUnionStruct(candidates: string[], obj: Record<string, unknown>): ResolvedStruct | undefined {
    const resolved = candidates
        .map(candidate => resolveStructForObject(candidate, obj))
        .filter((item): item is ResolvedStruct => !!item);
    if (resolved.length === 0) return undefined;

    let best = resolved[0];
    let bestMissing = missingFieldsIn(best.struct, obj);
    for (const candidate of resolved.slice(1)) {
        const missing = missingFieldsIn(candidate.struct, obj);
        if (missing.length < bestMissing.length) {
            best = candidate;
            bestMissing = missing;
        }
    }

    return {
        baseName: best.baseName,
        variantNames: [...new Set(resolved.flatMap(item => item.variantNames))],
        struct: mergeStructs(...resolved.map(item => item.struct)),
        missingRequired: bestMissing
    };
}

/**
 * Discriminator values that are valid enum members but have no `dispatch`
 * declaration of their own, so they contribute no variant fields.
 * `dragonsurvival:point` is a valid projectile target type; it must not inherit
 * radius/particle_trail from the declared `dragonsurvival:area` target.
 */
const DISPATCH_VALUES_WITHOUT_VARIANT: Record<string, string[]> = {
    'dragonsurvival:projectile_targeting': ['dragonsurvival:point']
};

function getResolvedStruct(currentStruct: string | undefined, obj: Record<string, unknown>): ResolvedStruct | undefined {
    if (!currentStruct) return undefined;
    if (currentStruct === COMBINED_TARGETING) {
        const blockStruct = getStructInfo(BLOCK_TARGETING);
        const entityStruct = getStructInfo(ENTITY_TARGETING);
        if (blockStruct && entityStruct) {
            return {
                baseName: BLOCK_TARGETING,
                variantNames: [ENTITY_TARGETING],
                struct: mergeStructs(blockStruct, entityStruct)
            };
        }
        return undefined;
    }
    return resolveStructForObject(currentStruct, obj);
}

function getChildCandidates(resolved: ResolvedStruct | undefined, field: string): string[] {
    if (!resolved) return [];
    const names: string[] = [];
    if (resolved.baseName) names.push(resolved.baseName);
    for (const variantName of resolved.variantNames) names.push(variantName);
    const result = new Set<string>();
    for (const name of names) {
        const map = MCDOC_STRUCT_CHILDREN[name];
        if (map && map[field]) {
            for (const child of map[field]) result.add(child);
        }
    }
    return [...result];
}

function inferChildStruct(candidates: string[], obj: Record<string, unknown>): string | undefined {
    if (candidates.length === 1) return candidates[0];

    const blockTargeting = BLOCK_TARGETING;
    const entityTargeting = ENTITY_TARGETING;
    if (candidates.includes(blockTargeting) && candidates.includes(entityTargeting)) {
        if ('entity_effect' in obj && 'block_effect' in obj) return COMBINED_TARGETING;
        if ('entity_effect' in obj) return entityTargeting;
        if ('block_effect' in obj) return blockTargeting;
    }

    const genericArrow = 'GenericArrowData__data_dragonsurvival_projectile_data';
    const genericBall = 'GenericBallData__data_dragonsurvival_projectile_data';
    if (candidates.includes(genericArrow) && candidates.includes(genericBall)) {
        if ('texture' in obj) return genericArrow;
        if ('resources' in obj || 'behaviour_data' in obj) return genericBall;
    }

    const compoundAnim = 'CompoundAbilityAnimation__data_dragonsurvival_dragon_ability';
    const simpleAnim = 'SimpleAbilityAnimation__data_dragonsurvival_dragon_ability';
    if (candidates.includes(compoundAnim) && candidates.includes(simpleAnim)) {
        if ('starting_animation_key' in obj) return compoundAnim;
        if ('animation_key' in obj) return simpleAnim;
    }

    const levelBasedEntry = 'LevelBasedResourceEntry__data_dragonsurvival_dragon_ability';
    const resourceLocation = 'ResourceLocation__data_dragonsurvival_projectile_data';
    if (candidates.includes(levelBasedEntry) && candidates.includes(resourceLocation)) {
        // Both entries have identical allowed fields; either struct validates the same way.
        return levelBasedEntry;
    }

    const projectileCandidates = [
        'ProjectileWorldEffect__data_dragonsurvival_projectile_data',
        'ProjectileBlockEffect__data_dragonsurvival_projectile_data',
        'ProjectileEntityEffect__data_dragonsurvival_projectile_data'
    ].filter(c => candidates.includes(c));
    if (projectileCandidates.length > 1) {
        if ('world_effect' in obj) return projectileCandidates[0];
        if ('block_effect' in obj) return projectileCandidates[1];
        if ('entity_effect' in obj) return projectileCandidates[2];
    }
    return undefined;
}

function isProjectileContext(currentStruct: string | undefined, path: (string | number)[]): boolean {
    // Only structs from data/dragonsurvival/projectile_data are projectile
    // contexts. In particular ProjectileEffect_Entity__data_dragonsurvival_dragon_ability
    // is a dragon ability struct and must NOT be treated as projectile data.
    if (currentStruct && currentStruct.endsWith('__data_dragonsurvival_projectile_data')) return true;
    return path.includes('projectile_data') || path.includes('projectile_targeting') ||
        path.includes('entity_hit_effects') || path.includes('block_hit_effects') ||
        path.includes('common_hit_effects') || path.includes('ticking_effects') ||
        path.includes('on_destroy_effects');
}

function validateDocument(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    const kind = detectKind(document.uri);
    if (!kind) {
        return;
    }

    let json: unknown;
    try {
        json = JSON.parse(document.getText());
    } catch {
        return; // JSON syntax errors are already reported by VS Code.
    }

    const diagnostics: vscode.Diagnostic[] = [];
    const rootStruct = KIND_TO_STRUCT[kind];
    const rootUnion = KIND_TO_UNION[kind];
    if (json && typeof json === 'object' && !Array.isArray(json)) {
        if (rootUnion && rootUnion.length > 1) {
            // The kind accepts several root structs (e.g. dragon_body with and
            // without a custom model): check against all of them.
            validateNode(json, [], diagnostics, document, undefined, kind, rootUnion);
        } else if (rootStruct) {
            validateNode(json, [], diagnostics, document, rootStruct, kind);
        }
    }

    collection.set(document.uri, diagnostics);
}

function validateNode(
    node: unknown,
    path: (string | number)[],
    diagnostics: vscode.Diagnostic[],
    document: vscode.TextDocument,
    currentStruct: string | undefined,
    kind: string | undefined,
    unionStructs?: string[]
): void {
    if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
            validateNode(node[i], [...path, i], diagnostics, document, currentStruct, kind, unionStructs);
        }
        return;
    }

    if (!node || typeof node !== 'object') {
        return;
    }

    const obj = node as Record<string, unknown>;
    const resolved = unionStructs && unionStructs.length > 0
        ? resolveUnionStruct(unionStructs, obj)
        : getResolvedStruct(currentStruct, obj);
    const customContext = getCustomFieldContext(kind, currentStruct, path, obj);

    if (resolved && !isPermissiveStruct(currentStruct) && !isPermissiveStruct(resolved.baseName)) {
        const allowed = new Set<string>([...resolved.struct.required, ...resolved.struct.optional]);
        for (const key of customContext.fields) {
            allowed.add(key);
        }
        for (const key of Object.keys(obj)) {
            if (!allowed.has(key)) {
                const range = findKeyRange(document, key, [...path, key]);
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    `未知字段: "${key}"（当前 ${currentStruct || '类型'} 不支持）`,
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }

        const missing = new Set<string>((resolved.missingRequired || resolved.struct.required).filter(key => !(key in obj)));
        for (const key of customContext.required) {
            if (!(key in obj)) missing.add(key);
        }
        const missingArr = [...missing];
        if (missingArr.length > 0) {
            const range = findDiscriminantRange(document, obj, path);
            for (const key of missingArr) {
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    `缺少必需字段: "${key}"`,
                    vscode.DiagnosticSeverity.Error
                ));
            }
        }
    }

    for (const [key, child] of Object.entries(obj)) {
        const inProjectile = isProjectileContext(currentStruct, path);
        const enumValues = inProjectile && key === 'target_type'
            ? ENUM_VALUES['projectile_target_type']
            : inProjectile && key === 'entity_effect'
                ? ENUM_VALUES['projectile_entity_effect_type']
                : inProjectile && key === 'block_effect'
                    ? ENUM_VALUES['projectile_block_effect_type']
                    : inProjectile && key === 'world_effect'
                        ? ENUM_VALUES['projectile_world_effect_type']
                        : ENUM_VALUES[key];
        const customValues = getCustomValuesForContext(key, kind, currentStruct, path);
        if (typeof child === 'string' && enumValues && !enumValues.includes(child) && !customValues.includes(child)) {
            diagnostics.push(new vscode.Diagnostic(
                findValueRange(document, key, child),
                `无效的 ${key} 值: "${child}"`,
                vscode.DiagnosticSeverity.Warning
            ));
        }

        const candidates = resolved ? getChildCandidates(resolved, key) : [];
        let childStruct: string | undefined;
        let childUnion: string[] | undefined;
        if (candidates.length === 1) {
            childStruct = candidates[0];
        } else if (candidates.length > 1) {
            if (child && typeof child === 'object' && !Array.isArray(child)) {
                childStruct = inferChildStruct(candidates, child as Record<string, unknown>);
            }
            // The value fits no single member of the union (the mcdoc offers
            // alternative structs): check it against every member so a field of
            // the wrong branch is still reported.
            if (!childStruct) childUnion = candidates;
        }

        if (Array.isArray(child)) {
            for (let i = 0; i < child.length; i++) {
                const item = child[i];
                let itemStruct = childStruct;
                let itemUnion: string[] | undefined = childUnion;
                if (candidates.length > 1 && item && typeof item === 'object' && !Array.isArray(item)) {
                    itemStruct = inferChildStruct(candidates, item as Record<string, unknown>) || undefined;
                    itemUnion = itemStruct ? undefined : candidates;
                }
                validateNode(item, [...path, key, i], diagnostics, document, itemStruct, kind, itemUnion);
            }
        } else {
            validateNode(child, [...path, key], diagnostics, document, childStruct, kind, childUnion);
        }
    }
}

function skipWhitespace(text: string, index: number): number {
    while (index < text.length && /\s/.test(text[index])) index++;
    return index;
}

function skipString(text: string, index: number): number {
    // index points at the opening quote.
    index++;
    while (index < text.length) {
        if (text[index] === '\\') {
            index += 2;
            continue;
        }
        if (text[index] === '"') return index + 1;
        index++;
    }
    return index;
}

function skipValue(text: string, index: number): number {
    const ch = text[index];
    if (ch === '"') return skipString(text, index);
    if (ch === '{' || ch === '[') {
        let depth = 0;
        let inString = false;
        let i = index;
        while (i < text.length) {
            const c = text[i];
            if (c === '"') inString = !inString;
            if (!inString) {
                if (c === '{' || c === '[') depth++;
                else if (c === '}' || c === ']') {
                    depth--;
                    if (depth === 0) return i + 1;
                }
            }
            i++;
        }
        return i;
    }
    while (index < text.length && !/[,\}\]\s]/.test(text[index])) index++;
    return index;
}

function locateContainerStart(text: string, path: (string | number)[]): number | undefined {
    let i = skipWhitespace(text, 0);
    for (const segment of path) {
        if (typeof segment === 'number') {
            if (text[i] !== '[') return undefined;
            i = skipWhitespace(text, i + 1);
            let index = 0;
            while (true) {
                if (index === segment) break;
                const after = skipValue(text, i);
                if (after >= text.length) return undefined;
                i = skipWhitespace(text, after);
                if (text[i] !== ',') return undefined;
                i = skipWhitespace(text, i + 1);
                index++;
            }
        } else {
            if (text[i] !== '{') return undefined;
            i = skipWhitespace(text, i + 1);
            while (true) {
                if (i >= text.length || text[i] === '}') return undefined;
                if (text[i] !== '"') return undefined;
                const keyEnd = skipString(text, i);
                const key = text.slice(i + 1, keyEnd - 1);
                let j = skipWhitespace(text, keyEnd);
                if (text[j] !== ':') return undefined;
                j = skipWhitespace(text, j + 1);
                if (key === segment) {
                    i = j;
                    break;
                }
                const after = skipValue(text, j);
                if (after >= text.length) return undefined;
                i = skipWhitespace(text, after);
                if (text[i] !== ',') return undefined;
                i = skipWhitespace(text, i + 1);
            }
        }
    }
    return i;
}

function findKeyRangeAtPath(document: vscode.TextDocument, path: (string | number)[]): vscode.Range | undefined {
    if (path.length === 0) return undefined;
    const key = path[path.length - 1] as string;
    const containerPath = path.slice(0, -1);
    const text = document.getText();

    let i: number;
    if (containerPath.length === 0) {
        i = skipWhitespace(text, 0);
        if (text[i] !== '{') return undefined;
        i = skipWhitespace(text, i + 1);
    } else {
        const start = locateContainerStart(text, containerPath);
        if (start === undefined) return undefined;
        i = skipWhitespace(text, start);
        if (text[i] !== '{') return undefined;
        i = skipWhitespace(text, i + 1);
    }

    while (i < text.length) {
        if (text[i] === '}') return undefined;
        if (text[i] !== '"') return undefined;
        const keyStart = i;
        const keyEnd = skipString(text, i);
        const foundKey = text.slice(keyStart + 1, keyEnd - 1);
        let j = skipWhitespace(text, keyEnd);
        if (text[j] !== ':') return undefined;
        if (foundKey === key) {
            return new vscode.Range(document.positionAt(keyStart), document.positionAt(keyEnd));
        }
        j = skipWhitespace(text, j + 1);
        const after = skipValue(text, j);
        if (after >= text.length) return undefined;
        i = skipWhitespace(text, after);
        if (text[i] !== ',') return undefined;
        i = skipWhitespace(text, i + 1);
    }
    return undefined;
}

function findKeyRange(document: vscode.TextDocument, key: string, path?: (string | number)[]): vscode.Range {
    if (path) {
        const range = findKeyRangeAtPath(document, path);
        if (range) return range;
    }
    const text = document.getText();
    const index = text.lastIndexOf(`"${key}"`);
    if (index >= 0) {
        const pos = document.positionAt(index);
        return new vscode.Range(pos, pos);
    }
    return new vscode.Range(0, 0, 0, 0);
}

function findValueRange(document: vscode.TextDocument, key: string, value: string): vscode.Range {
    const text = document.getText();
    const pattern = `"${key}"\\s*:\\s*"` + value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + `"`;
    const regex = new RegExp(pattern, 'g');
    let match: RegExpExecArray | null;
    let last: RegExpExecArray | null = null;
    while ((match = regex.exec(text)) !== null) {
        last = match;
    }
    if (last) {
        const start = document.positionAt(last.index + last[0].indexOf(value));
        return new vscode.Range(start, start.translate(0, value.length));
    }
    return new vscode.Range(0, 0, 0, 0);
}

function findFirstKeyRange(document: vscode.TextDocument, obj: Record<string, unknown>, path?: (string | number)[]): vscode.Range {
    const firstKey = Object.keys(obj)[0];
    if (firstKey) {
        return findKeyRange(document, firstKey, path ? [...path, firstKey] : undefined);
    }
    return new vscode.Range(0, 0, 0, 1);
}

function findDiscriminantRange(document: vscode.TextDocument, obj: Record<string, unknown>, path?: (string | number)[]): vscode.Range {
    const candidates = ['effect_type', 'activation_type', 'upgrade_type', 'target_type', 'penalty_type', 'penalty_trigger', 'trigger_type'];
    for (const key of candidates) {
        const value = obj[key];
        if (typeof value === 'string') {
            const range = findValueRange(document, key, value);
            if (!range.isEmpty) {
                return range;
            }
        }
    }
    return findFirstKeyRange(document, obj, path);
}

function refreshDocument(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    validateDocument(document, collection);
}

export function registerDragonDiagnostics(): vscode.Disposable {
    const collection = vscode.languages.createDiagnosticCollection('dragonSurvivalDatapack');

    const disposables: vscode.Disposable[] = [
        collection,
        vscode.workspace.onDidOpenTextDocument(doc => refreshDocument(doc, collection)),
        vscode.workspace.onDidChangeTextDocument(event => refreshDocument(event.document, collection)),
        vscode.workspace.onDidSaveTextDocument(doc => refreshDocument(doc, collection)),
        vscode.workspace.onDidCloseTextDocument(doc => collection.delete(doc.uri))
    ];

    for (const doc of vscode.workspace.textDocuments) {
        refreshDocument(doc, collection);
    }

    return vscode.Disposable.from(...disposables);
}
