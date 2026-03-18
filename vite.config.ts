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
    sourcemap: true
  }
});