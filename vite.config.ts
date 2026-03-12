import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  
  optimizeDeps: {
    include: ['intersection-observer']
  },
  
  build: {
    target: 'es2022',
    sourcemap: true
  }
});