import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { generateSitemapXml } from './src/utils/sitemap';

const generateSitemapPlugin = () => ({
  name: 'generate-sitemap',
  closeBundle: () => {
    const sitemap = generateSitemapXml('https://costcofuelprices.com');
    fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), sitemap);
    console.log('✓ Generated sitemap.xml');
  }
});

export default defineConfig({
  plugins: [
    react(),
    generateSitemapPlugin()
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});