'use strict';
/*
 * Loads media/main.js outside the browser so its schema resolver can be tested.
 *
 * main.js is a webview IIFE: it needs `window`, `document` and the VS Code API
 * shim. None of the DOM code runs at load time beyond guarded lookups, and the
 * resolver is exposed on window.__dragonResolver.
 */

const path = require('path');

// Webview sources to load; override with DSH_MEDIA_DIR to test an installed copy
// (e.g. %USERPROFILE%\.vscode\extensions\<publisher>.<name>-<version>\media).
const MEDIA = process.env.DSH_MEDIA_DIR
    ? path.resolve(process.env.DSH_MEDIA_DIR)
    : path.resolve(__dirname, '..', 'media');

function noopElement() {
    const element = {
        style: {},
        dataset: {},
        classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
        children: [],
        value: '',
        textContent: '',
        innerHTML: '',
        hidden: false,
        checked: false,
        appendChild(child) {
            element.children.push(child);
            return child;
        },
        removeChild() {},
        setAttribute() {},
        getAttribute: () => null,
        removeAttribute() {},
        addEventListener() {},
        removeEventListener() {},
        querySelector: () => null,
        querySelectorAll: () => [],
        closest: () => null,
        focus() {},
        scrollIntoView() {}
    };
    return element;
}

function loadWebview() {
    if (global.window && global.window.__dragonResolver) return global.window;

    const windowStub = {
        addEventListener() {},
        removeEventListener() {},
        postMessage() {},
        getState: () => ({}),
        setState() {},
        matchMedia: () => ({ matches: false, addEventListener() {} }),
        MCDOC_SCHEMA: null
    };
    global.window = windowStub;
    global.document = {
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        createElement: () => noopElement(),
        createDocumentFragment: () => noopElement(),
        addEventListener() {},
        removeEventListener() {},
        body: noopElement(),
        documentElement: noopElement(),
        hidden: false,
        execCommand: () => false
    };
    global.Element = class Element {};
    global.HTMLElement = class HTMLElement {};
    // Node exposes a read-only `navigator`; override it explicitly.
    Object.defineProperty(global, 'navigator', {
        value: { clipboard: { writeText: async () => {} }, language: 'zh-CN' },
        configurable: true,
        writable: true
    });
    global.acquireVsCodeApi = () => ({
        getState: () => ({}),
        setState() {},
        postMessage() {}
    });

    // The generated schema attaches itself to window.
    require(path.join(MEDIA, 'mcdocSchema.js'));
    require(path.join(MEDIA, 'main.js'));
    return windowStub;
}

module.exports = { loadWebview, MEDIA };
