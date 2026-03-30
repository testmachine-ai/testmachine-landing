import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			// Convert render-blocking stylesheets to async loading.
			// Critical CSS is already inlined in app.html, so these can
			// load without blocking first paint.
			return html.replace(
				/<link href="([^"]+\.css)" rel="stylesheet">/g,
				'<link rel="preload" href="$1" as="style" onload="this.rel=\'stylesheet\'">' +
				'<noscript><link href="$1" rel="stylesheet"></noscript>'
			);
		}
	});
};
