import slugify from 'slugify';
import { StationData } from '../types';

export const generateStationUrl = (station: StationData, isCanada: boolean = false): string => {
  const baseUrl = isCanada ? '/station/canada' : '/station/us';
  const addressSlug = slugify(station.Address, { lower: true });
  
  return `${baseUrl}/costco-${addressSlug}`;
};

export const parseStationUrl = (url: string): { 
  isCanada: boolean; 
  city: string; 
  storeName: string;
  address: string;
} => {
  // The URL structure should be: /station/(us|canada)/costco-[address]
  // First, clean the URL by removing leading/trailing slashes and 'station' prefix if present
  const cleanUrl = url.replace(/^\/+|\/+$/g, '').replace(/^station\//, '');
  const parts = cleanUrl.split('/');

  // Check if we have enough parts and correct format
  if (parts.length < 2 || !parts[1]?.startsWith('costco-')) {
    return {
      isCanada: false,
      city: '',
      storeName: '',
      address: ''
    };
  }

  const isCanada = parts[0]?.toLowerCase() === 'canada';
  const addressPart = parts[1].replace('costco-', '');
  
  // Extract city from the address (it's part of the address now)
  const addressParts = decodeURIComponent(addressPart).split('-');
  const cityIndex = addressParts.findIndex(part => 
    part.toLowerCase() === 'al' || 
    part.toLowerCase() === 'fl' || 
    part.toLowerCase() === 'ca'
  ) - 1;
  
  const city = cityIndex > 0 ? addressParts[cityIndex] : '';
  
  return {
    isCanada,
    city,
    storeName: 'costco', // Since all stores are Costco
    address: decodeURIComponent(addressPart)
  };
};