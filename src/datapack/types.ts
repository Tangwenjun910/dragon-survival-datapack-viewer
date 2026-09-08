export const REGISTRY_KINDS = [
    'dragon_species',
    'dragon_stage',
    'dragon_ability',
    'dragon_penalty',
    'projectile_data',
    'dragon_body',
    'dragon_emote_set',
    'diet_entries',
    'stage_resources',
    'end_platforms',
    'dragon_beacon_data',
    'body_icons'
] as const;

export type RegistryKind = typeof REGISTRY_KINDS[number];

export const REGISTRY_LABELS: Record<RegistryKind, string> = {
    dragon_species: '龙种',
    dragon_stage: '阶段',
    dragon_ability: '能力',
    dragon_penalty: '惩罚',
    projectile_data: '弹射物',
    dragon_body: '龙体',
    dragon_emote_set: '表情组',
    diet_entries: '食物列表',
    stage_resources: '阶段资源',
    end_platforms: '末地平台',
    dragon_beacon_data: '祭坛/信标效果',
    body_icons: '龙体图标'
};

export const DATA_MAP_KINDS: RegistryKind[] = [
    'diet_entries',
    'stage_resources',
    'end_platforms',
    'dragon_beacon_data',
    'body_icons'
];

export interface DiscoveredFile {
    kind: RegistryKind;
    namespace: string;
    id: string;
    filePath: string;
    isTag: boolean;
}

export interface TagModel {
    registry: RegistryKind;
    namespace: string;
    id: string;
    filePath: string;
    values: string[];
}

export interface EntryModel {
    kind: RegistryKind;
    namespace: string;
    id: string;
    filePath: string;
    data: unknown;
    meta: {
        abilities?: string[];
        penalties?: string[];
        stages?: string[];
    };
}

export interface NamespaceModel {
    namespace: string;
    entries: EntryModel[];
    tags: TagModel[];
}

export interface FileError {
    filePath: string;
    message: string;
}

export interface AssetFile {
    namespace: string;
    category: string;
    filePath: string;
    relativePath: string;
}

export interface AssetNamespace {
    namespace: string;
    totalFiles: number;
    categories: {
        name: string;
        fileCount: number;
        files: AssetFile[];
    }[];
}

export interface CustomEffectDefinition {
    /** 兼容旧配置：自定义 effect_type 值。新配置推荐使用 key + value。 */
    type?: string;
    /** 可选：数据种类，例如 dragon_ability / projectile_data。 */
    target?: string;
    /** 可选：精确匹配的 mcdoc 结构名。 */
    struct?: string;
    /** 可选：JSON 路径前缀匹配，`*` 匹配任意一段。 */
    path?: (string | number)[];
    /** 判别字段，例如 effect_type / entity_effect / block_effect / world_effect / target_type。 */
    key?: string;
    /** 自定义判别值，例如 example:custom_effect。 */
    value?: string;
    fields?: string[];
    required?: string[];
    fieldInfo?: Record<string, string>;
    fieldNames?: Record<string, string>;
}

export interface ViewerSettings {
    openJsonOnDetail: boolean;
    showLocalizedNames: boolean;
    showRawFieldKeys: boolean;
    rememberScrollPosition: boolean;
    showResourcePreviews: boolean;
    showReferences: boolean;
    abilitySortOrder: 'alphabetical' | 'type';
    customEffectTypes: string[];
    customEffects: CustomEffectDefinition[];
}

export interface DSModel {
    roots: string[];
    namespaces: NamespaceModel[];
    assets: AssetNamespace[];
    errors: FileError[];
    settings?: ViewerSettings;
    localizedNames?: Record<string, string>;
}

export function isRegistryKind(value: string): value is RegistryKind {
    return (REGISTRY_KINDS as readonly string[]).includes(value);
}
