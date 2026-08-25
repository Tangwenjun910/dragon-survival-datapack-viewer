import * as vscode from 'vscode';
import { DiscoveredFile } from './datapack/types';
import { scanDirectory } from './datapack/scanner';

export async function discoverInWorkspace(): Promise<DiscoveredFile[]> {
    const folders = vscode.workspace.workspaceFolders ?? [];
    const fileMap = new Map<string, DiscoveredFile>();

    for (const folder of folders) {
        const files = await scanDirectory(folder.uri.fsPath);
        for (const file of files) {
            fileMap.set(file.filePath, file);
        }
    }

    return [...fileMap.values()];
}
