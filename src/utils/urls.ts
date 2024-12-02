import slugify from 'slugify';
import { StationData } from '../types';

export const generateStationUrl = (station: StationData, isCanada: boolean = false): string => {
  const baseUrl = isCanada ? '/station/canada' : '/station/us';
  const storeSlug = slugify(station["Store Name"], { lower: true });
  const citySlug = slugify(station.City, { lower: true });
  const addressSlug = slugify(station.Address, { lower: true });
  
  return `${baseUrl}/${citySlug}/${storeSlug}/${addressSlug}`;
};

export const parseStationUrl = (url: string): { 
  isCanada: boolean; 
  city: string; 
  storeName: string;
  address: string;
} => {
  const parts = url.split('/');
  const isCanada = parts[0]?.toLowerCase() === 'canada';
  
  // Remove any empty strings and decode URL components
  const cleanParts = parts.filter(Boolean).map(part => decodeURIComponent(part));
  
  return {
    isCanada,
    city: cleanParts[0] || '',
    storeName: cleanParts[1] || '',
    address: cleanParts[2] || ''
  };
};