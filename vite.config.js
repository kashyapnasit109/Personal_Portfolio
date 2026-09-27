import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /Personal_Portfolio/; Vercel and local dev serve it from /.
const base = process.env.PAGES_BASE || '/';

// Public images are referenced as '/img/…' strings in components. When the site lives under a
// sub-path, prefix those strings with the base so every photo still resolves.
const publicBase = {
  name: 'public-base',
  enforce: 'pre',
  transform(code, id) {
    if (base === '/' || id.includes('node_modules') || !/\.(jsx?|tsx?)$/.test(id)) return null;
    return { code: code.replace(/(['"`])\/img\//g, `$1${base}img/`), map: null };
  },
};

export default defineConfig({
  base,
  plugins: [react(), publicBase],
  build: { chunkSizeWarningLimit: 700 },
});
