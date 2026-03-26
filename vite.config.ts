import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],

  server: {
    host: true,
    allowedHosts: ['fermihome.local', 'FERMIHOME.local', 'testmachine.lightscalar.net']
  },

  optimizeDeps: {
    include: ['intersection-observer']
  },

  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep svelte runtime in a stable vendor chunk
          if (id.includes('node_modules/svelte')) {
            return 'vendor-svelte';
          }
          // Font files get their own chunk so they don't block the app chunk
          if (id.includes('@fontsource')) {
            return 'fonts';
          }
        }
      }
    }
  }
});
