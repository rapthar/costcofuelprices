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
  // The URL structure should be: /station/(us|canada)/city/storeName/address
  // First, clean the URL by removing leading/trailing slashes and 'station' prefix if present
  const cleanUrl = url.replace(/^\/+|\/+$/g, '').replace(/^station\//, '');
  const parts = cleanUrl.split('/');

  // Check if we have enough parts
  if (parts.length < 4) {
    return {
      isCanada: false,
      city: '',
      storeName: '',
      address: ''
    };
  }

  // parts[0] should be 'us' or 'canada'
  // parts[1] is city
  // parts[2] is store name
  // parts[3] is address
  const isCanada = parts[0]?.toLowerCase() === 'canada';
  
  return {
    isCanada,
    city: decodeURIComponent(parts[1] || ''),
    storeName: decodeURIComponent(parts[2] || ''),
    address: decodeURIComponent(parts[3] || '')
  };
};