import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    
    prerender: {
      // /privacy is linked from the footer but not yet a route in this repo.
      // Warn rather than fail so the build succeeds until the page is added.
      handleHttpError: ({ path, message }) => {
        if (path === '/privacy') {
          console.warn(`Warning: ${message}`);
          return;
        }
        throw new Error(message);
      }
    },

    // Alias for cleaner imports
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils',
      $data: 'src/lib/data',
      $styles: 'src/lib/styles'
    }
  }
};

export default config;