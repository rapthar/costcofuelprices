import slugify from 'slugify';
import { StationData } from '../types';

export const generateStationUrl = (station: StationData, isCanada: boolean = false): string => {
  const baseUrl = isCanada ? '/station/canada' : '/station/us';
  const addressSlug = slugify(station.Address, { lower: true });
  
  return `${baseUrl}/costco-${addressSlug}`;
};

export const generateStateUrl = (state: string, isCanada: boolean = false): string => {
  const baseUrl = isCanada ? '/canada' : '/us';
  const stateSlug = slugify(state, { lower: true });
  
  return `${baseUrl}/${stateSlug}`;
};

export const parseStateUrl = (url: string): {
  isCanada: boolean;
  state: string;
} => {
  // URL structure: /(us|canada)/[state]
  console.log('Parsing state URL:', { url });
  
  if (!url || typeof url !== 'string') {
    console.log('Invalid state URL:', url);
    return {
      isCanada: false,
      state: ''
    };
  }

  // Clean up the URL and split into parts
  const cleanUrl = url.replace(/^\/+|\/+$/g, '');
  const parts = cleanUrl.split('/');
  
  console.log('URL parts:', parts);
  
  // Check if we have enough parts
  if (parts.length < 2) {
    console.log('Not enough URL parts');
    return {
      isCanada: false,
      state: ''
    };
  }

  const isCanada = parts[0]?.toLowerCase() === 'canada';
  const stateSlug = parts[1];
  
  // Convert the state slug back to a proper name
  const state = stateSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  console.log('Parsed state URL:', { isCanada, state, stateSlug });
  return { isCanada, state };
};

export const parseStationUrl = (url: string): { 
  isCanada: boolean; 
  city: string; 
  storeName: string;
  address: string;
} => {
  // The URL structure should be: /station/(us|canada)/costco-[address]
  console.log('Parsing station URL:', { url });
  
  // Check if we have the correct format
  if (!url || typeof url !== 'string') {
    console.log('Invalid URL:', url);
    return {
      isCanada: false,
      city: '',
      storeName: '',
      address: ''
    };
  }

  // Extract the address part after "costco-"
  const addressMatch = url.match(/costco-(.+)$/);
  if (!addressMatch) {
    console.log('No address found in URL');
    return {
      isCanada: false,
      city: '',
      storeName: '',
      address: ''
    };
  }

  const address = decodeURIComponent(addressMatch[1]);
  console.log('Extracted address:', address);
  
  // Extract city from address (usually between street name and state)
  const addressParts = address.split('-');
  console.log('Address parts:', addressParts);
  
  let city = '';
  
  // Look for state abbreviation and take the part before it as city
  const stateIndex = addressParts.findIndex(part => 
    /^(al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy)$/i.test(part)
  );
  
  if (stateIndex > 0) {
    city = addressParts[stateIndex - 1];
  }
  
  const result = {
    isCanada: url.includes('/canada/'),
    city,
    storeName: 'costco',
    address
  };
  
  console.log('Parsed result:', result);
  return result;
};