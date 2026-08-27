import * as vscode from 'vscode';
import { MCDOC_STRUCTS, KIND_TO_STRUCT, MCDOC_DISPATCH } from './mcdocSchema';

const KIND_PATTERNS: Record<string, RegExp> = {
    dragon_ability: /\/data\/[^/]+\/dragonsurvival\/dragon_ability\//i,
    dragon_species: /\/data\/[^/]+\/dragonsurvival\/dragon_species\//i,
    dragon_stage: /\/data\/[^/]+\/dragonsurvival\/dragon_stage\//i,
    dragon_penalty: /\/data\/[^/]+\/dragonsurvival\/dragon_penalty\//i,
    projectile_data: /\/data\/[^/]+\/dragonsurvival\/projectile_data\//i,
    dragon_body: /\/data\/[^/]+\/dragonsurvival\/dragon_body\//i,
    dragon_emote_set: /\/data\/[^/]+\/dragonsurvival\/dragon_emote_set\//i
};

function getMcdocStruct(kind: string): { required: string[]; optional: string[] } | undefined {
    const structName = KIND_TO_STRUCT[kind];
    if (!structName) return undefined;
    const struct = MCDOC_STRUCTS[structName];
    if (!struct) return undefined;
    return { required: struct.required, optional: struct.optional };
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

function detectKind(uri: vscode.Uri): string | undefined {
    const normalized = uri.fsPath.replace(/\\/g, '/');
    for (const [name, pattern] of Object.entries(KIND_PATTERNS)) {
        if (pattern.test(normalized)) {
            return name;
        }
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

    if (json && typeof json === 'object' && !Array.isArray(json)) {
        const struct = getMcdocStruct(kind);
        const allowed = new Set<string>([
            ...(struct?.required || []),
            ...(struct?.optional || [])
        ]);
        for (const [key, value] of Object.entries(json as Record<string, unknown>)) {
            if (!allowed.has(key)) {
                const range = findKeyRange(document, key);
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    `未知字段: "${key}"（当前 ${kind} 不支持）`,
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }

        const range = findFirstKeyRange(document, json as Record<string, unknown>);
        for (const key of (struct?.required || [])) {
            if (!Object.prototype.hasOwnProperty.call(json, key)) {
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    `缺少必需字段: "${key}"`,
                    vscode.DiagnosticSeverity.Error
                ));
            }
        }

        validateNode(json, [], diagnostics, document);
    }

    collection.set(document.uri, diagnostics);
}

function resolveDiscriminatedStruct(path: string[], obj: Record<string, unknown>): { required: string[]; optional: string[] } | undefined {
    const effectType = typeof obj['effect_type'] === 'string' ? obj['effect_type'] as string : undefined;
    const activationType = typeof obj['activation_type'] === 'string' ? obj['activation_type'] as string : undefined;
    const upgradeType = typeof obj['upgrade_type'] === 'string' ? obj['upgrade_type'] as string : undefined;
    const targetType = typeof obj['target_type'] === 'string' ? obj['target_type'] as string : undefined;
    const penaltyType = typeof obj['penalty_type'] === 'string' ? obj['penalty_type'] as string : undefined;
    const penaltyTrigger = typeof obj['penalty_trigger'] === 'string' ? obj['penalty_trigger'] as string : undefined;

    if (effectType && path.includes('entity_effect')) {
        const name = MCDOC_DISPATCH['dragonsurvival:ability_entity_effect']?.[effectType];
        return name ? MCDOC_STRUCTS[name] : undefined;
    }
    if (effectType && path.includes('block_effect')) {
        const name = MCDOC_DISPATCH['dragonsurvival:ability_block_effect']?.[effectType];
        return name ? MCDOC_STRUCTS[name] : undefined;
    }
    if (activationType && path.includes('activation')) {
        const name = MCDOC_DISPATCH['dragonsurvival:activation']?.[activationType];
        return name ? MCDOC_STRUCTS[name] : undefined;
    }
    if (upgradeType && path.includes('upgrade')) {
        const name = MCDOC_DISPATCH['dragonsurvival:upgrade_type']?.[upgradeType];
        return name ? MCDOC_STRUCTS[name] : undefined;
    }
    if (targetType && path.includes('target_selection')) {
        const name = MCDOC_DISPATCH['dragonsurvival:ability_targeting']?.[targetType];
        return name ? MCDOC_STRUCTS[name] : undefined;
    }
    if (penaltyType && path.includes('effect')) {
        const name = MCDOC_DISPATCH['dragonsurvival:penalty_effect']?.[penaltyType];
        return name ? MCDOC_STRUCTS[name] : undefined;
    }
    if (penaltyTrigger && path.includes('trigger')) {
        const name = MCDOC_DISPATCH['dragonsurvival:penalty_trigger']?.[penaltyTrigger];
        return name ? MCDOC_STRUCTS[name] : undefined;
    }
    return undefined;
}

function validateNode(
    node: unknown,
    path: string[],
    diagnostics: vscode.Diagnostic[],
    document: vscode.TextDocument
): void {
    if (Array.isArray(node)) {
        for (const item of node) {
            validateNode(item, [...path, '[]'], diagnostics, document);
        }
        return;
    }

    if (!node || typeof node !== 'object') {
        return;
    }

    const obj = node as Record<string, unknown>;
    const struct = resolveDiscriminatedStruct(path, obj);
    if (struct) {
        const allowed = new Set<string>([...struct.required, ...struct.optional]);
        for (const key of Object.keys(obj)) {
            if (!allowed.has(key)) {
                diagnostics.push(new vscode.Diagnostic(
                    findKeyRange(document, key),
                    `未知字段: "${key}"（当前效果/类型不支持）`,
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        }

        const missing = struct.required.filter(key => !(key in obj));
        if (missing.length > 0) {
            const range = findDiscriminantRange(document, obj);
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
        if (typeof child === 'string' && ENUM_VALUES[key] && !ENUM_VALUES[key].includes(child)) {
            diagnostics.push(new vscode.Diagnostic(
                findValueRange(document, key, child),
                `无效的 ${key} 值: "${child}"`,
                vscode.DiagnosticSeverity.Warning
            ));
        }
        validateNode(child, [...path, key], diagnostics, document);
    }
}

function checkEnumValues(value: unknown, diagnostics: vscode.Diagnostic[], document: vscode.TextDocument): void {
    if (Array.isArray(value)) {
        for (const item of value) {
            checkEnumValues(item, diagnostics, document);
        }
        return;
    }

    if (value && typeof value === 'object') {
        for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
            if (typeof child === 'string' && ENUM_VALUES[key] && !ENUM_VALUES[key].includes(child)) {
                const range = findValueRange(document, key, child);
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    `无效的 ${key} 值: "${child}"`,
                    vscode.DiagnosticSeverity.Warning
                ));
            }
            checkEnumValues(child, diagnostics, document);
        }
    }
}

function findKeyRange(document: vscode.TextDocument, key: string): vscode.Range {
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

function findFirstKeyRange(document: vscode.TextDocument, obj: Record<string, unknown>): vscode.Range {
    const firstKey = Object.keys(obj)[0];
    if (firstKey) {
        return findKeyRange(document, firstKey);
    }
    return new vscode.Range(0, 0, 0, 1);
}

function findDiscriminantRange(document: vscode.TextDocument, obj: Record<string, unknown>): vscode.Range {
    const candidates = ['effect_type', 'activation_type', 'upgrade_type', 'target_type', 'penalty_type', 'penalty_trigger'];
    for (const key of candidates) {
        const value = obj[key];
        if (typeof value === 'string') {
            const range = findValueRange(document, key, value);
            if (!range.isEmpty) {
                return range;
            }
        }
    }
    return findFirstKeyRange(document, obj);
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
