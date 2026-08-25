/**
 * Minimal JSONC support: strips `//` and `/* ... *​/` comments and trailing commas.
 * Used because some Dragon Survival datapack files in the wild contain comments.
 */

export function stripJsonComments(text: string): string {
    if (text.charCodeAt(0) === 0xFEFF) {
        text = text.slice(1);
    }

    let out = '';
    let inString = false;
    let inLineComment = false;
    let inBlockComment = false;
    let escaped = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];

        if (inLineComment) {
            if (ch === '\n') {
                inLineComment = false;
                out += ch;
            }
            continue;
        }

        if (inBlockComment) {
            if (ch === '*' && next === '/') {
                inBlockComment = false;
                i++;
            }
            continue;
        }

        if (inString) {
            out += ch;
            if (escaped) {
                escaped = false;
            } else if (ch === '\\') {
                escaped = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            out += ch;
            continue;
        }

        if (ch === '/' && next === '/') {
            inLineComment = true;
            i++;
            continue;
        }

        if (ch === '/' && next === '*') {
            inBlockComment = true;
            i++;
            continue;
        }

        out += ch;
    }

    return removeTrailingCommas(out);
}

function removeTrailingCommas(text: string): string {
    let out = '';
    let inString = false;
    let escaped = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (inString) {
            out += ch;
            if (escaped) {
                escaped = false;
            } else if (ch === '\\') {
                escaped = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            out += ch;
            continue;
        }

        if (ch === '}' || ch === ']') {
            // Remove a comma that appears before this closing bracket.
            let end = out.length - 1;
            while (end >= 0 && /\s/.test(out[end])) {
                end--;
            }
            if (end >= 0 && out[end] === ',') {
                out = out.slice(0, end) + out.slice(end + 1);
            }
        }

        out += ch;
    }

    return out;
}

export function parseJsonc<T = unknown>(text: string): T {
    const cleaned = stripJsonComments(text);
    return JSON.parse(cleaned) as T;
}
