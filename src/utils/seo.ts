import { StationData } from '../types';

export interface SEOData {
  title: string;
  description: string;
  canonicalUrl?: string;
  imageUrl?: string;
  type?: string;
}

export const generateStationSEO = (station: StationData): SEOData => {
  const title = `Costco Gas Prices at ${station['Store Name']} - ${station.City}, ${station['State Full']}`;
  const description = `Current gas prices at Costco ${station['Store Name']} in ${station.City}. Find Regular, Premium, and Diesel fuel prices, hours, and directions.`;
  const canonicalUrl = `https://costcofuelprices.com/station/${station.City.toLowerCase()}-${station['Store Name'].toLowerCase()}`.replace(/\s+/g, '-');

  return {
    title,
    description,
    canonicalUrl,
    type: 'website',
    imageUrl: '/logo.svg'
  };
};

export const generateStateSEO = (state: string, stationCount: number): SEOData => {
  return {
    title: `Costco Gas Prices in ${state} - Find Cheap Fuel Near You`,
    description: `Compare Costco gas prices across ${stationCount} locations in ${state}. Find the cheapest fuel prices and save money on your next fill-up.`,
    canonicalUrl: `https://costcofuelprices.com/state/${state.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'website',
    imageUrl: '/logo.svg'
  };
};

export const generateCitySEO = (city: string, state: string, stationCount: number): SEOData => {
  return {
    title: `Costco Gas Prices in ${city}, ${state} - Local Fuel Prices`,
    description: `Find current Costco gas prices in ${city}, ${state}. Compare prices across ${stationCount} locations and save on your next fill-up.`,
    canonicalUrl: `https://costcofuelprices.com/state/${state.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'website',
    imageUrl: '/logo.svg'
  };
};

export const getDefaultSEO = (path: string): SEOData => {
  const defaultSEO: Record<string, SEOData> = {
    '/': {
      title: 'Costco Gas Prices - Find the Best Fuel Prices at Costco Gas Stations',
      description: 'Find real-time Costco gas prices, compare fuel costs, and locate the nearest Costco gas station. Save money on your next fill-up with our comprehensive price tracking.',
      canonicalUrl: 'https://costcofuelprices.com',
      type: 'website'
    },
    '/about': {
      title: 'About CostcoFuelPrices.com - Your Trusted Gas Price Source',
      description: 'Learn about CostcoFuelPrices.com, your trusted source for real-time Costco gas prices and fuel cost comparisons across North America.',
      canonicalUrl: 'https://costcofuelprices.com/about',
      type: 'website'
    },
    '/contact': {
      title: 'Contact Us - CostcoFuelPrices.com',
      description: 'Get in touch with our team for questions about Costco gas prices, website feedback, or support inquiries.',
      canonicalUrl: 'https://costcofuelprices.com/contact',
      type: 'website'
    }
  };

  return defaultSEO[path] || defaultSEO['/'];
};