import slugify from 'slugify';
import { StationData } from '../types';

export const generateStationUrl = (station: StationData, isCanada: boolean = false): string => {
  const baseUrl = isCanada ? '/station/canada' : '/station/us';
  const citySlug = station.City.toLowerCase().replace(/\s+/g, '-');
  const addressSlug = station.Address.toLowerCase().replace(/\s+/g, '-');
  const stateSlug = station['State Full'].toLowerCase().replace(/\s+/g, '-');
  
  return `${baseUrl}/costco-${addressSlug}-${citySlug}-${stateSlug}`;
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

  const isCanada = url.includes('/canada/');

  // Extract the address part after "costco-"
  const addressMatch = url.match(/costco-(.+)$/);
  if (!addressMatch) {
    console.log('No address found in URL');
    return {
      isCanada,
      city: '',
      storeName: '',
      address: ''
    };
  }

  const address = decodeURIComponent(addressMatch[1]);
  console.log('Extracted address:', address);
  
  // Extract city from address (usually between street name and state/province)
  const addressParts = address.split('-');
  console.log('Address parts:', addressParts);
  
  let city = '';
  
  // Combined US states and Canadian provinces for detection
  const stateIndex = addressParts.findIndex(part => 
    /^(al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy|ab|bc|mb|nb|nl|ns|nt|nu|on|pe|qc|sk|yt)$/i.test(part)
  );
  
  if (stateIndex > 0) {
    // Take all parts before the state/province as the city name
    city = addressParts.slice(0, stateIndex).join(' ');
  } else {
    // If no state/province found, take the second-to-last part as the city
    city = addressParts[Math.max(0, addressParts.length - 2)];
  }
  
  const result = {
    isCanada,
    city,
    storeName: 'Costco',
    address
  };
  
  console.log('Parsed result:', result);
  return result;
};