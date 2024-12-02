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
  const cleanUrl = url.replace(/^\/+|\/+$/g, '').replace(/^station\//, '');
  const parts = cleanUrl.split('/');
  
  console.log('Parsing URL:', {
    url,
    cleanUrl,
    parts
  });

  // Check if we have enough parts and correct format
  if (parts.length < 2 || !parts[1]?.startsWith('costco-')) {
    console.log('Invalid URL format');
    return {
      isCanada: false,
      city: '',
      storeName: '',
      address: ''
    };
  }

  const isCanada = parts[0]?.toLowerCase() === 'canada';
  const address = parts[1].replace('costco-', '');
  
  // Extract city from address (usually between street name and state)
  const addressParts = decodeURIComponent(address).split('-');
  console.log('Address parts:', addressParts);
  
  let city = '';
  
  // Look for state abbreviation and take the part before it as city
  const stateIndex = addressParts.findIndex(part => 
    /^(al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy)$/i.test(part)
  );
  
  if (stateIndex > 0) {
    city = addressParts[stateIndex - 1];
  }
  
  console.log('Parsed result:', {
    isCanada,
    city,
    address: decodeURIComponent(address)
  });

  return {
    isCanada,
    city,
    storeName: 'costco',
    address: decodeURIComponent(address)
  };
};