import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { stations } from './src/data/usstations';
import fs from 'fs';
import path from 'path';

function generateSitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle: () => {
      // Get unique states and cities
      const states = new Set(stations.map(station => station['State Full']));
      const cities = new Set(stations.map(station => station.City));

      // Generate URLs
      const urls = [
        // Static pages
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/us-gas-stations', priority: '0.9', changefreq: 'daily' },
        { url: '/canada-gas-stations', priority: '0.8', changefreq: 'monthly' },
        { url: '/search', priority: '0.8', changefreq: 'weekly' },
        { url: '/about', priority: '0.6', changefreq: 'monthly' },
        { url: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
        { url: '/terms', priority: '0.5', changefreq: 'monthly' },
        { url: '/privacy', priority: '0.5', changefreq: 'monthly' },
        { url: '/faq', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact', priority: '0.6', changefreq: 'monthly' },
        { url: '/us-map', priority: '0.9', changefreq: 'daily' },
        { url: '/canada-map', priority: '0.9', changefreq: 'daily' },

        // Generate state URLs
        ...Array.from(states).map(state => ({
          url: `/state/${state.toLowerCase().replace(/\s+/g, '-')}`,
          priority: '0.8',
          changefreq: 'daily'
        })),

        // Generate city URLs
        ...Array.from(cities).map(city => ({
          url: `/city/${city.toLowerCase().replace(/\s+/g, '-')}`,
          priority: '0.7',
          changefreq: 'daily'
        })),

        // Generate station URLs
        ...stations.map(station => ({
          url: `/station/costco-gas-in-${station.City.toLowerCase().replace(/\s+/g, '-')}-${station['Street Address'].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
          priority: '0.6',
          changefreq: 'daily'
        }))
      ];

      // Generate sitemap XML
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, priority, changefreq }) => `  <url>
    <loc>https://costcofuelprices.com${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      // Write sitemap to public directory
      fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), sitemap);
      console.log('✓ Generated sitemap.xml');
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    generateSitemapPlugin()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
