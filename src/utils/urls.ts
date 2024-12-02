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
  // Remove any leading/trailing slashes and split the path
  const cleanUrl = url.replace(/^\/+|\/+$/g, '');
  const parts = cleanUrl.split('/');
  
  // The URL structure is: station/(us|canada)/city/storeName/address
  const isCanada = parts[1]?.toLowerCase() === 'canada';
  
  return {
    isCanada,
    city: decodeURIComponent(parts[2] || ''),
    storeName: decodeURIComponent(parts[3] || ''),
    address: decodeURIComponent(parts[4] || '')
  };
};