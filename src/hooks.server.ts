import type { Handle } from '@sveltejs/kit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const cssCache = new Map<string, string>();

function readCssFile(href: string): string | null {
	if (cssCache.has(href)) return cssCache.get(href)!;
	try {
		// During adapter-static prerendering, CSS lives in the client output
		const filePath = join(process.cwd(), '.svelte-kit/output/client', href);
		const content = readFileSync(filePath, 'utf-8');
		cssCache.set(href, content);
		return content;
	} catch {
		return null;
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			// Inline CSS file contents directly into <style> tags to eliminate
			// render-blocking round-trips while avoiding the CLS that async
			// loading causes. The original <link> is kept as a preload so
			// subsequent same-origin navigations can use the cached file.
			return html.replace(
				/<link href="([^"]+\.css)" rel="stylesheet">/g,
				(_match, href) => {
					const css = readCssFile(href);
					if (css) {
						return `<style>${css}</style>`;
					}
					return _match;
				}
			);
		}
	});
};
