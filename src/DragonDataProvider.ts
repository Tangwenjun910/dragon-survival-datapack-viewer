import * as path from 'path';
import * as vscode from 'vscode';
import { DSModel } from './datapack/types';

export interface DragonDataMessageHandlers {
    onSave(filePath: string, text: string): Promise<void>;
    onSelect(): Promise<void>;
    onRefresh(): Promise<void>;
    onOpenFile(filePath: string): Promise<void>;
    onAddFile(kind: string, namespace: string): Promise<void>;
    onDeleteFile(filePath: string): Promise<void>;
}

export class DragonDataProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'dragonSurvivalDatapack.view';

    private _view?: vscode.WebviewView;
    private _model?: DSModel;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _handlers: DragonDataMessageHandlers
    ) { }

    public resolveWebviewView(webviewView: vscode.WebviewView): void {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'media')]
        };

        webviewView.webview.html = this._getHtml(webviewView.webview);

        webviewView.webview.onDidReceiveMessage((message) => {
            void this._handleMessage(message);
        });

        if (this._model) {
            this.postModel();
        }
    }

    public setModel(model: DSModel): void {
        this._model = model;
        this.postModel();
    }

    public postModel(): void {
        if (this._view && this._model) {
            void this._view.webview.postMessage({ type: 'state', model: this._model });
        }
    }

    public postMessage(message: unknown): void {
        if (this._view) {
            void this._view.webview.postMessage(message);
        }
    }

    private async _handleMessage(message: { type: string; [key: string]: unknown }): Promise<void> {
        switch (message.type) {
            case 'ready':
                this.postModel();
                break;
            case 'save': {
                const filePath = String(message.filePath ?? '');
                const text = String(message.text ?? '');
                if (filePath && text) {
                    await this._handlers.onSave(filePath, text);
                }
                break;
            }
            case 'select':
                await this._handlers.onSelect();
                break;
            case 'refresh':
                await this._handlers.onRefresh();
                break;
            case 'openSettings':
                await vscode.commands.executeCommand('workbench.action.openSettings', 'dragonSurvivalDatapack');
                break;
            case 'getResourcePreview': {
                const filePath = String(message.filePath ?? '');
                if (!filePath) break;
                try {
                    const bytes = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
                    const ext = path.extname(filePath).toLowerCase();
                    const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
                        : ext === '.gif' ? 'image/gif'
                        : ext === '.webp' ? 'image/webp'
                        : ext === '.svg' ? 'image/svg+xml'
                        : 'image/png';
                    const dataUri = `data:${mime};base64,${Buffer.from(bytes).toString('base64')}`;
                    this.postMessage({ type: 'assetPreview', filePath: filePath, dataUri });
                } catch (error) {
                    this.postMessage({ type: 'assetPreview', filePath, dataUri: '' });
                }
                break;
            }
            case 'openFile': {
                const filePath = String(message.filePath ?? '');
                if (filePath) {
                    await this._handlers.onOpenFile(filePath);
                }
                break;
            }
            case 'addFile': {
                const kind = String(message.kind ?? '');
                const namespace = String(message.namespace ?? '');
                if (kind && namespace) {
                    await this._handlers.onAddFile(kind, namespace);
                }
                break;
            }
            case 'deleteFile': {
                const filePath = String(message.filePath ?? '');
                if (filePath) {
                    await this._handlers.onDeleteFile(filePath);
                }
                break;
            }
        }
    }

    private _getHtml(webview: vscode.Webview): string {
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'style.css'));
        const schemaUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'mcdocSchema.js'));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
        const nonce = getNonce();

        return /* html */ `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; img-src ${webview.cspSource} data:; script-src 'nonce-${nonce}';">
    <link rel="stylesheet" href="${styleUri}">
    <title>龙之生存数据包</title>
</head>
<body>
    <div id="app">
        <header class="app-header">
            <div class="title-row">
                <span class="logo">🐉</span>
                <h1>龙之生存数据包</h1>
                <button id="langBtn" class="lang-btn" title="切换语言">EN</button>
            </div>
            <div class="toolbar">
                <button id="selectBtn" title="选择数据包目录">📂 选择目录</button>
                <button id="refreshBtn" title="重新扫描">🔄 刷新</button>
                <button id="settingsBtn" title="打开扩展设置">⚙ 设置</button>
            </div>
            <div id="roots" class="roots"></div>
            <div id="status" class="status"></div>
        </header>

        <nav id="namespaceTabs" class="namespace-tabs"></nav>

        <main id="content" class="content">
            <section id="overview" class="overview"></section>
            <section id="detail" class="detail" hidden></section>
        </main>
    </div>

    <div id="editorOverlay" class="editor-overlay" hidden>
        <div class="editor-box">
            <div class="editor-header">
                <span id="editorTitle">编辑 JSON</span>
                <button id="editorClose" title="关闭">✕</button>
            </div>
            <textarea id="editorText" spellcheck="false"></textarea>
            <div id="completionPanel" class="completion-panel" hidden></div>
            <div class="editor-actions">
                <span id="editorError" class="editor-error"></span>
                <button id="editorCancel">取消</button>
                <button id="editorSave" class="primary">保存</button>
            </div>
        </div>
    </div>

    <script nonce="${nonce}" src="${schemaUri}"></script>
    <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
    }
}

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
