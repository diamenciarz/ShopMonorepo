import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` makes the build portable so the same `dist/` works on
// Vercel/Netlify (root) and GitHub Pages (sub-path like /ShopMonorepo/).
export default defineConfig({
  plugins: [react()],
  base: './',
});