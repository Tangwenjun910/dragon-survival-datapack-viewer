import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export interface CustomFieldDefinition {
    /**
     * 数据种类，例如 dragon_ability / projectile_data / dragon_species。
     * 不填表示对所有数据有效。
     */
    target?: string;
    /**
     * 可选的 mcdoc 结构名，例如 ProjectileTargeting__data_dragonsurvival_projectile_data。
     */
    struct?: string;
    /**
     * 可选的 JSON 路径前缀匹配；`*` 匹配任意一段。
     */
    path?: (string | number)[];
    /**
     * 判别字段，例如 effect_type / entity_effect / block_effect / world_effect / target_type。
     */
    key?: string;
    /**
     * 自定义判别值，例如 example:custom_effect。
     */
    value?: string;
    /**
     * 兼容旧配置：当只写 type 时等价于 value，并且默认 key=effect_type、target=dragon_ability。
     */
    type?: string;
    fields?: string[];
    required?: string[];
    fieldInfo?: Record<string, string>;
    fieldNames?: Record<string, string>;
}

function normalizeDefinition(def: Record<string, unknown>): CustomFieldDefinition {
    const result: CustomFieldDefinition = { ...def } as CustomFieldDefinition;
    if (result.value === undefined && result.type !== undefined) {
        result.value = String(result.type);
    }
    if ((result.value !== undefined || result.key !== undefined) && result.key === undefined) {
        // 旧版自定义效果配置只写 type，默认视为技能的 effect_type。
        result.key = 'effect_type';
        result.target = result.target || 'dragon_ability';
    }
    return result;
}

function readCustomDefinitionsFromConfig(): CustomFieldDefinition[] {
    const config = vscode.workspace.getConfiguration('dragonSurvivalDatapack');
    const defs = config.get<Record<string, unknown>[]>('customEffects', []);
    return (defs || []).map(normalizeDefinition).filter(d => !!d);
}

function readCustomDefinitionsFromProject(): CustomFieldDefinition[] {
    const result: CustomFieldDefinition[] = [];
    for (const folder of vscode.workspace.workspaceFolders ?? []) {
        const filePath = path.join(folder.uri.fsPath, '.vscode', 'dragon-survival-custom-effects.json');
        try {
            const text = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed)) {
                for (const def of parsed) {
                    if (def && typeof def === 'object') {
                        result.push(normalizeDefinition(def as Record<string, unknown>));
                    }
                }
            }
        } catch {
            // 文件可能不存在。
        }
    }
    return result;
}

export function getAllCustomDefinitions(): CustomFieldDefinition[] {
    return [...readCustomDefinitionsFromConfig(), ...readCustomDefinitionsFromProject()];
}

function pathMatches(pattern: (string | number)[], actual: (string | number)[]): boolean {
    if (!pattern || pattern.length === 0) return true;
    if (pattern.length > actual.length) return false;
    for (let i = 0; i < pattern.length; i++) {
        const p = pattern[i];
        if (p === '*') continue;
        if (p !== actual[i]) return false;
    }
    return true;
}

export interface CustomDefinitionContext {
    kind?: string;
    struct?: string;
    path?: (string | number)[];
    obj?: Record<string, unknown>;
}

export function definitionMatches(def: CustomFieldDefinition, context: CustomDefinitionContext): boolean {
    if (def.target && def.target !== context.kind) return false;
    if (def.struct && def.struct !== context.struct) return false;
    if (def.path && !pathMatches(def.path, context.path || [])) return false;
    if (def.key && def.value !== undefined) {
        if (!context.obj) return true;
        const actual = context.obj[def.key];
        if (actual !== def.value) return false;
    }
    return true;
}

export function getCustomValuesForContext(
    key: string,
    kind?: string,
    struct?: string,
    path?: (string | number)[]
): string[] {
    const values = new Set<string>();
    for (const def of getAllCustomDefinitions()) {
        if (!def.key || def.key !== key || def.value === undefined) continue;
        if (definitionMatches(def, { kind, struct, path })) {
            values.add(def.value);
        }
    }
    return [...values];
}

export interface CustomFieldContext {
    fields: Set<string>;
    required: Set<string>;
    fieldInfo: Record<string, string>;
    fieldNames: Record<string, string>;
}

export function getCustomFieldContext(
    kind: string | undefined,
    struct: string | undefined,
    path: (string | number)[],
    obj: Record<string, unknown>
): CustomFieldContext {
    const fields = new Set<string>();
    const required = new Set<string>();
    const fieldInfo: Record<string, string> = {};
    const fieldNames: Record<string, string> = {};

    for (const def of getAllCustomDefinitions()) {
        if (!definitionMatches(def, { kind, struct, path, obj })) continue;
        for (const field of def.fields || []) {
            if (field) fields.add(field);
        }
        for (const field of def.required || []) {
            if (field) {
                fields.add(field);
                required.add(field);
            }
        }
        if (def.fieldInfo) Object.assign(fieldInfo, def.fieldInfo);
        if (def.fieldNames) Object.assign(fieldNames, def.fieldNames);
    }
    return { fields, required, fieldInfo, fieldNames };
}
