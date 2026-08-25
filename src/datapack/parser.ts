import * as fs from 'fs/promises';
import { DiscoveredFile, DSModel, EntryModel, FileError, NamespaceModel, RegistryKind, TagModel } from './types';
import { parseJsonc } from './jsonc';

export async function loadModel(files: DiscoveredFile[]): Promise<DSModel> {
    const entries: EntryModel[] = [];
    const tags: TagModel[] = [];
    const errors: FileError[] = [];

    for (const file of files) {
        try {
            const text = await fs.readFile(file.filePath, 'utf-8');
            const data = parseJsonc<unknown>(text);

            if (file.isTag) {
                const values = Array.isArray((data as { values?: unknown })?.values)
                    ? ((data as { values: unknown[] }).values.map(String))
                    : [];
                tags.push({
                    registry: file.kind,
                    namespace: file.namespace,
                    id: file.id,
                    filePath: file.filePath,
                    values
                });
            } else {
                entries.push({
                    kind: file.kind,
                    namespace: file.namespace,
                    id: file.id,
                    filePath: file.filePath,
                    data,
                    meta: {}
                });
            }
        } catch (error) {
            errors.push({
                filePath: file.filePath,
                message: error instanceof Error ? error.message : String(error)
            });
        }
    }

    const entryMap = new Map<string, EntryModel>();
    for (const entry of entries) {
        entryMap.set(`${entry.kind}:${entry.namespace}:${entry.id}`, entry);
    }

    const tagMap = new Map<string, TagModel>();
    for (const tag of tags) {
        tagMap.set(`${tag.registry}:${tag.namespace}:${tag.id}`, tag);
    }

    for (const entry of entries) {
        if (entry.kind === 'dragon_species') {
            const data = entry.data as Record<string, unknown>;
            entry.meta.abilities = resolveReferences(data.abilities, 'dragon_ability', tagMap);
            entry.meta.penalties = resolveReferences(data.penalties, 'dragon_penalty', tagMap);

            if (Array.isArray(data.custom_stage_progression)) {
                entry.meta.stages = data.custom_stage_progression.map(String);
            } else {
                entry.meta.stages = [];
            }
        }
    }

    const namespaceMap = new Map<string, EntryModel[]>();
    for (const entry of entries) {
        const list = namespaceMap.get(entry.namespace) ?? [];
        list.push(entry);
        namespaceMap.set(entry.namespace, list);
    }

    const namespaces: NamespaceModel[] = [...namespaceMap.keys()]
        .sort()
        .map(namespace => ({
            namespace,
            entries: namespaceMap.get(namespace)!,
            tags: tags.filter(tag => tag.namespace === namespace)
        }));

    const roots = new Set<string>();
    for (const file of files) {
        const dataIndex = file.filePath.split(/[\\/]+/).lastIndexOf('data');
        if (dataIndex > 0) {
            const parts = file.filePath.split(/[\\/]+/);
            roots.add(parts.slice(0, dataIndex).join('/'));
        }
    }

    return {
        roots: [...roots],
        namespaces,
        errors
    };
}

function resolveReferences(
    ref: unknown,
    registry: RegistryKind,
    tagMap: Map<string, TagModel>
): string[] {
    const seenTags = new Set<string>();
    const result: string[] = [];

    const visit = (value: unknown): void => {
        if (typeof value === 'string') {
            if (value.startsWith('#')) {
                const tagLocation = value.slice(1);
                const { namespace, id } = splitResourceLocation(tagLocation);
                const key = `${registry}:${namespace}:${id}`;
                if (seenTags.has(key)) {
                    return;
                }
                seenTags.add(key);

                const tag = tagMap.get(key);
                if (!tag) {
                    result.push(value);
                    return;
                }

                for (const tagValue of tag.values) {
                    visit(tagValue);
                }
            } else {
                result.push(value);
            }
        } else if (Array.isArray(value)) {
            for (const item of value) {
                visit(item);
            }
        }
    };

    visit(ref);
    return [...new Set(result)];
}

function splitResourceLocation(location: string): { namespace: string; id: string } {
    const index = location.indexOf(':');
    if (index >= 0) {
        return { namespace: location.slice(0, index), id: location.slice(index + 1) };
    }
    return { namespace: 'minecraft', id: location };
}
