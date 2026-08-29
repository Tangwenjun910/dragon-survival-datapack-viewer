import * as vscode from 'vscode';
import { MCDOC_STRUCTS, KIND_TO_STRUCT, MCDOC_DISPATCH, MCDOC_STRUCT_CHILDREN } from './mcdocSchema';

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
    variantName?: string;
    struct: StructInfo;
    missingRequired?: string[];
}

const ENUM_VALUES: Record<string, string[]> = {
    activation_type: ['dragonsurvival:passive', 'dragonsurvival:simple', 'dragonsurvival:channeled'],
    upgrade_type: ['dragonsurvival:experience_points', 'dragonsurvival:experience_levels', 'dragonsurvival:dragon_growth', 'dragonsurvival:item_based', 'dragonsurvival:condition_based'],
    target_type: ['dragonsurvival:area', 'dragonsurvival:dragon_breath', 'dragonsurvival:looking_at', 'dragonsurvival:self', 'dragonsurvival:disc'],
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
        'dragonsurvival:block_break', 'dragonsurvival:explosion', 'dragonsurvival:block_harvest'
    ],
    trigger_point: ['default', 'charging', 'channel_completion'],
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
}

function getCustomEffectDefinitions(): Record<string, CustomEffectDefinition> {
    const config = vscode.workspace.getConfiguration('dragonSurvivalDatapack');
    const result: Record<string, CustomEffectDefinition> = {};
    const defs = config.get<CustomEffectDefinition[]>('customEffects', []);
    for (const def of defs) {
        if (def && typeof def.type === 'string' && !result[def.type]) {
            result[def.type] = {
                type: def.type,
                fields: Array.isArray(def.fields) ? def.fields.filter((x): x is string => typeof x === 'string') : [],
                required: Array.isArray(def.required) ? def.required.filter((x): x is string => typeof x === 'string') : []
            };
        }
    }
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
    return [...all];
}

// Some mcdoc structs use dynamic `...dispatch[[...]]` spreads that the generated
// field list cannot fully express. Keep them permissive to avoid false positives.
const BLOCK_TARGETING = 'BlockTargeting__data_dragonsurvival_dragon_ability';
const ENTITY_TARGETING = 'EntityTargeting__data_dragonsurvival_dragon_ability';
const COMBINED_TARGETING = `${BLOCK_TARGETING}+${ENTITY_TARGETING}`;

function isPermissiveStruct(name?: string): boolean {
    if (!name) return false;
    if (name.startsWith('LevelBasedValueMap__')) return true;
    if (name === COMBINED_TARGETING) return true;
    return name === 'ProjectileWorldEffect__data_dragonsurvival_projectile_data'
        || name === 'ProjectileBlockEffect__data_dragonsurvival_projectile_data'
        || name === 'ProjectileEntityEffect__data_dragonsurvival_projectile_data';
}

// Fields introduced by dynamic spreads (not present in the static struct body).
const EXTRA_OPTIONAL_FIELDS: Record<string, string[]> = {
    Action__data_dragonsurvival_dragon_ability: ['trigger_point'],
    Animations__data_dragonsurvival_dragon_ability: ['looping'],
    Sound__data_dragonsurvival_dragon_ability: ['looping']
};

const DISPATCH_BASES: Record<string, { key: string; registry: string }> = {
    Activation__data_dragonsurvival_dragon_ability: { key: 'activation_type', registry: 'dragonsurvival:activation' },
    Upgrade__data_dragonsurvival_dragon_ability: { key: 'upgrade_type', registry: 'dragonsurvival:upgrade_type' },
    Targeting__data_dragonsurvival_dragon_ability: { key: 'target_type', registry: 'dragonsurvival:ability_targeting' },
    EntityEffect__data_dragonsurvival_dragon_ability: { key: 'effect_type', registry: 'dragonsurvival:ability_entity_effect' },
    BlockEffect__data_dragonsurvival_dragon_ability: { key: 'effect_type', registry: 'dragonsurvival:ability_block_effect' },
    PenaltyEffect__data_dragonsurvival_dragon_penalty: { key: 'penalty_type', registry: 'dragonsurvival:penalty_effect' },
    PenaltyTrigger__data_dragonsurvival_dragon_penalty: { key: 'penalty_trigger', registry: 'dragonsurvival:penalty_trigger' },
    ActivationTrigger__data_dragonsurvival_dragon_ability: { key: 'trigger_type', registry: 'dragonsurvival:activation_trigger' },
    ProjectileTargeting__data_dragonsurvival_projectile_data: { key: 'target_type', registry: 'dragonsurvival:projectile_targeting' },
    ProjectileWorldEffect__data_dragonsurvival_projectile_data: { key: 'world_effect', registry: 'dragonsurvival:projectile_world_effect' },
    ProjectileBlockEffect__data_dragonsurvival_projectile_data: { key: 'block_effect', registry: 'dragonsurvival:projectile_block_effect' },
    ProjectileEntityEffect__data_dragonsurvival_projectile_data: { key: 'entity_effect', registry: 'dragonsurvival:projectile_entity_effect' }
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

function resolveDispatch(baseName: string, registry: string, value: string | undefined): ResolvedStruct | undefined {
    const base = getStructInfo(baseName);
    const variantName = value ? MCDOC_DISPATCH[registry]?.[value] : undefined;
    const variant = variantName ? getStructInfo(variantName) : undefined;
    if (!base && !variant) return undefined;
    return {
        baseName,
        variantName: variant ? variantName : undefined,
        struct: mergeStructs(base, variant)
    };
}

function resolveDiscriminatedStruct(path: (string | number)[], obj: Record<string, unknown>): ResolvedStruct | undefined {
    const effectType = typeof obj['effect_type'] === 'string' ? obj['effect_type'] as string : undefined;
    const activationType = typeof obj['activation_type'] === 'string' ? obj['activation_type'] as string : undefined;
    const upgradeType = typeof obj['upgrade_type'] === 'string' ? obj['upgrade_type'] as string : undefined;
    const targetType = typeof obj['target_type'] === 'string' ? obj['target_type'] as string : undefined;
    const penaltyType = typeof obj['penalty_type'] === 'string' ? obj['penalty_type'] as string : undefined;
    const penaltyTrigger = typeof obj['penalty_trigger'] === 'string' ? obj['penalty_trigger'] as string : undefined;
    const triggerType = typeof obj['trigger_type'] === 'string' ? obj['trigger_type'] as string : undefined;
    const blockEffect = typeof obj['block_effect'] === 'string' ? obj['block_effect'] as string : undefined;
    const entityEffect = typeof obj['entity_effect'] === 'string' ? obj['entity_effect'] as string : undefined;
    const worldEffect = typeof obj['world_effect'] === 'string' ? obj['world_effect'] as string : undefined;

    if (effectType && path.includes('entity_effect')) {
        return resolveDispatch('EntityEffect__data_dragonsurvival_dragon_ability', 'dragonsurvival:ability_entity_effect', effectType);
    }
    if (effectType && path.includes('block_effect')) {
        return resolveDispatch('BlockEffect__data_dragonsurvival_dragon_ability', 'dragonsurvival:ability_block_effect', effectType);
    }
    if (activationType && path.includes('activation')) {
        return resolveDispatch('Activation__data_dragonsurvival_dragon_ability', 'dragonsurvival:activation', activationType);
    }
    if (upgradeType && path.includes('upgrade')) {
        return resolveDispatch('Upgrade__data_dragonsurvival_dragon_ability', 'dragonsurvival:upgrade_type', upgradeType);
    }
    if (targetType && path.includes('target_selection')) {
        return resolveDispatch('Targeting__data_dragonsurvival_dragon_ability', 'dragonsurvival:ability_targeting', targetType);
    }
    if (penaltyType && path.includes('effect')) {
        return resolveDispatch('PenaltyEffect__data_dragonsurvival_dragon_penalty', 'dragonsurvival:penalty_effect', penaltyType);
    }
    if (penaltyTrigger && path.includes('trigger')) {
        return resolveDispatch('PenaltyTrigger__data_dragonsurvival_dragon_penalty', 'dragonsurvival:penalty_trigger', penaltyTrigger);
    }
    if (triggerType && path.includes('trigger')) {
        return resolveDispatch('ActivationTrigger__data_dragonsurvival_dragon_ability', 'dragonsurvival:activation_trigger', triggerType);
    }
    if (targetType && path.includes('target_type')) {
        return resolveDispatch('ProjectileTargeting__data_dragonsurvival_projectile_data', 'dragonsurvival:projectile_targeting', targetType);
    }
    if (blockEffect) {
        return resolveDispatch('ProjectileBlockEffect__data_dragonsurvival_projectile_data', 'dragonsurvival:projectile_block_effect', blockEffect);
    }
    if (entityEffect) {
        return resolveDispatch('ProjectileEntityEffect__data_dragonsurvival_projectile_data', 'dragonsurvival:projectile_entity_effect', entityEffect);
    }
    if (worldEffect) {
        return resolveDispatch('ProjectileWorldEffect__data_dragonsurvival_projectile_data', 'dragonsurvival:projectile_world_effect', worldEffect);
    }
    return undefined;
}

function getResolvedStruct(currentStruct: string | undefined, path: (string | number)[], obj: Record<string, unknown>): ResolvedStruct | undefined {
    if (currentStruct === COMBINED_TARGETING) {
        const blockStruct = getStructInfo(BLOCK_TARGETING);
        const entityStruct = getStructInfo(ENTITY_TARGETING);
        if (blockStruct && entityStruct) {
            return {
                baseName: BLOCK_TARGETING,
                variantName: ENTITY_TARGETING,
                struct: mergeStructs(blockStruct, entityStruct)
            };
        }
        return undefined;
    }
    if (currentStruct) {
        const base = getStructInfo(currentStruct);
        if (!base) return undefined;
        const dispatch = DISPATCH_BASES[currentStruct];
        if (dispatch) {
            const value = typeof obj[dispatch.key] === 'string' ? obj[dispatch.key] as string : undefined;
            const variantName = value ? MCDOC_DISPATCH[dispatch.registry]?.[value] : undefined;
            const variant = variantName ? getStructInfo(variantName) : undefined;
            if (variant) {
                return {
                    baseName: currentStruct,
                    variantName,
                    struct: mergeStructs(base, variant)
                };
            }
            // Discriminator missing/unknown: don't flag fields that belong to any
            // variant. Keep the base required key visible so "missing required"
            // still fires, but allow all variant fields.
            const allVariants = (Object.values(MCDOC_DISPATCH[dispatch.registry] || {}))
                .map(name => getStructInfo(name))
                .filter((s): s is StructInfo => !!s);
            return {
                baseName: currentStruct,
                struct: mergeStructs(base, ...allVariants),
                missingRequired: base.required
            };
        }
        return { baseName: currentStruct, struct: base };
    }
    return resolveDiscriminatedStruct(path, obj);
}

function getChildCandidates(resolved: ResolvedStruct | undefined, field: string): string[] {
    if (!resolved) return [];
    const names: string[] = [];
    if (resolved.baseName) names.push(resolved.baseName);
    if (resolved.variantName) names.push(resolved.variantName);
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
    if (json && typeof json === 'object' && !Array.isArray(json) && rootStruct) {
        validateNode(json, [], diagnostics, document, rootStruct);
    }

    collection.set(document.uri, diagnostics);
}

function validateNode(
    node: unknown,
    path: (string | number)[],
    diagnostics: vscode.Diagnostic[],
    document: vscode.TextDocument,
    currentStruct?: string
): void {
    if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
            validateNode(node[i], [...path, i], diagnostics, document, currentStruct);
        }
        return;
    }

    if (!node || typeof node !== 'object') {
        return;
    }

    const obj = node as Record<string, unknown>;
    let resolved = getResolvedStruct(currentStruct, path, obj);
    const customEffectType = typeof obj['effect_type'] === 'string' ? obj['effect_type'] as string : undefined;
    if (resolved && customEffectType &&
        (currentStruct === 'EntityEffect__data_dragonsurvival_dragon_ability' || currentStruct === 'BlockEffect__data_dragonsurvival_dragon_ability')) {
        const def = getCustomEffectDefinitions()[customEffectType];
        if (def) {
            const required = new Set<string>([...resolved.struct.required, ...(def.required || [])]);
            const optional = new Set<string>([...resolved.struct.optional, ...(def.fields || [])]);
            for (const key of required) optional.delete(key);
            resolved = {
                ...resolved,
                struct: {
                    required: [...required],
                    optional: [...optional]
                }
            };
        }
    }

    if (resolved && !isPermissiveStruct(currentStruct)) {
        const allowed = new Set<string>([...resolved.struct.required, ...resolved.struct.optional]);
        for (const extra of EXTRA_OPTIONAL_FIELDS[currentStruct || ''] || []) {
            allowed.add(extra);
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

        const missing = (resolved.missingRequired || resolved.struct.required).filter(key => !(key in obj));
        if (missing.length > 0) {
            const range = findDiscriminantRange(document, obj, path);
            for (const key of missing) {
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    `缺少必需字段: "${key}"`,
                    vscode.DiagnosticSeverity.Error
                ));
            }
        }
    }

    for (const [key, child] of Object.entries(obj)) {
        if (typeof child === 'string' && ENUM_VALUES[key] && !ENUM_VALUES[key].includes(child) && !(key === 'effect_type' && getCustomEffectTypes().includes(child))) {
            diagnostics.push(new vscode.Diagnostic(
                findValueRange(document, key, child),
                `无效的 ${key} 值: "${child}"`,
                vscode.DiagnosticSeverity.Warning
            ));
        }

        const candidates = resolved ? getChildCandidates(resolved, key) : [];
        let childStruct: string | undefined;
        if (candidates.length === 1) {
            childStruct = candidates[0];
        } else if (candidates.length > 1 && child && typeof child === 'object' && !Array.isArray(child)) {
            childStruct = inferChildStruct(candidates, child as Record<string, unknown>);
        }

        if (Array.isArray(child)) {
            for (let i = 0; i < child.length; i++) {
                const item = child[i];
                let itemStruct = childStruct;
                if (candidates.length > 1 && item && typeof item === 'object' && !Array.isArray(item)) {
                    itemStruct = inferChildStruct(candidates, item as Record<string, unknown>) || undefined;
                }
                validateNode(item, [...path, key, i], diagnostics, document, itemStruct);
            }
        } else {
            validateNode(child, [...path, key], diagnostics, document, childStruct);
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
