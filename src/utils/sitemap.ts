import { stations, canadaStations } from '../data';
import { generateStationUrl } from './urls';

interface SitemapUrl {
  url: string;
  changefreq: string;
  priority: string;
}

export const generateSitemapUrls = (): SitemapUrl[] => {
  const urls: SitemapUrl[] = [
    // Static pages
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/us-gas-stations', changefreq: 'daily', priority: '0.9' },
    { url: '/canada-gas-stations', changefreq: 'daily', priority: '0.9' },
    { url: '/search', changefreq: 'weekly', priority: '0.8' },
    { url: '/us-map', changefreq: 'daily', priority: '0.8' },
    { url: '/canada-map', changefreq: 'daily', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.6' },
    { url: '/disclaimer', changefreq: 'monthly', priority: '0.5' },
    { url: '/terms', changefreq: 'monthly', priority: '0.5' },
    { url: '/privacy', changefreq: 'monthly', priority: '0.5' },
    { url: '/faq', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.6' }
  ];

  // Get unique states and add state pages
  const states = [...new Set(stations.map(s => s['State Full']))];
  states.forEach(state => {
    urls.push({
      url: `/state/${state.toLowerCase().replace(/\s+/g, '-')}`,
      changefreq: 'daily',
      priority: '0.8'
    });
  });

  // Get unique provinces and add province pages
  const provinces = [...new Set(canadaStations[0].map(s => s['State Full']))];
  provinces.forEach(province => {
    urls.push({
      url: `/canada/${province.toLowerCase().replace(/\s+/g, '-')}`,
      changefreq: 'daily',
      priority: '0.8'
    });
  });

  // Add city pages for US stations
  const citiesByState = stations.reduce((acc, station) => {
    const state = station['State Full'];
    const city = station.City;
    if (!acc[state]) acc[state] = new Set();
    acc[state].add(city);
    return acc;
  }, {} as Record<string, Set<string>>);

  Object.entries(citiesByState).forEach(([state, cities]) => {
    cities.forEach(city => {
      urls.push({
        url: `/state/${state.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`,
        changefreq: 'daily',
        priority: '0.7'
      });
    });
  });

  // Add city pages for Canadian stations
  const citiesByProvince = canadaStations[0].reduce((acc, station) => {
    const province = station['State Full'];
    const city = station.City;
    if (!acc[province]) acc[province] = new Set();
    acc[province].add(city);
    return acc;
  }, {} as Record<string, Set<string>>);

  Object.entries(citiesByProvince).forEach(([province, cities]) => {
    cities.forEach(city => {
      urls.push({
        url: `/canada/${province.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`,
        changefreq: 'daily',
        priority: '0.7'
      });
    });
  });

  // Add individual US station pages
  stations.forEach(station => {
    urls.push({
      url: generateStationUrl(station, false),
      changefreq: 'daily',
      priority: '0.6'
    });
  });

  // Add individual Canadian station pages
  canadaStations[0].forEach(station => {
    urls.push({
      url: generateStationUrl(station, true),
      changefreq: 'daily',
      priority: '0.6'
    });
  });

  return urls;
};

export const generateSitemapXml = (baseUrl: string): string => {
  const urls = generateSitemapUrls();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};