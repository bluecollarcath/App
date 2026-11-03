import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// VITE_PREVIEW=1 builds a self-contained, backend-free preview (see src/lib/mockApi.ts):
// every asset is inlined so the output can be shipped as a single HTML file.
const preview = process.env.VITE_PREVIEW === '1';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api': 'http://localhost:8787' } },
  build: preview
    ? { outDir: 'dist-preview', assetsInlineLimit: 100_000_000, cssCodeSplit: false, rolldownOptions: { output: { codeSplitting: false } } }
    : {},
});
