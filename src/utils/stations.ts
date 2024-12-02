import { StationData } from '../types';
import { stations, canadaStations } from '../data';
import slugify from 'slugify';

export const findStation = (
  city: string,
  storeName: string,
  address: string,
  isCanada: boolean
): StationData | undefined => {
  const stationList = isCanada ? canadaStations[0] : stations;
  
  // Normalize the search address
  const normalizedSearchAddr = address.toLowerCase();
  console.log('Searching for station:', { 
    normalizedSearchAddr, 
    city, 
    isCanada 
  });
  
  return stationList.find(station => {
    // Create normalized versions of addresses for comparison
    const normalizedStationAddr = slugify(station.Address, { lower: true });
    
    // Extract street numbers
    const urlStreetNumber = normalizedSearchAddr.split('-')[0];
    const stationStreetNumber = station.Address.split(' ')[0];
    
    // Log matching attempts
    console.log('Trying to match:', {
      station: station.Address,
      normalizedStation: normalizedStationAddr,
      urlStreetNumber,
      stationStreetNumber,
      stationCity: station.City
    });
    
    // Try different matching strategies
    const exactMatch = normalizedStationAddr === normalizedSearchAddr;
    const streetNumberMatch = urlStreetNumber === stationStreetNumber;
    const containsMatch = normalizedStationAddr.includes(normalizedSearchAddr) || 
                         normalizedSearchAddr.includes(normalizedStationAddr);
    
    // Log match results
    console.log('Match results:', {
      exactMatch,
      streetNumberMatch,
      containsMatch,
      cityMatch: station.City.toLowerCase() === city.toLowerCase()
    });
    
    // If we have an exact match, use that
    if (exactMatch) return true;
    
    // If street numbers match and addresses are similar, use that
    if (streetNumberMatch && containsMatch) return true;
    
    // Last resort: try matching just the street number and city
    if (streetNumberMatch && 
        station.City.toLowerCase() === city.toLowerCase()) {
      return true;
    }
    
    return false;
  });
};

export const findNearbyStations = (
  station: StationData,
  isCanada: boolean,
  maxDistance: number = 80 // kilometers
): StationData[] => {
  const stationList = isCanada ? canadaStations[0] : stations;
  
  return stationList
    .filter(s => {
      if (s.Title === station.Title) return false;
      
      // Calculate distance using Haversine formula
      const R = 6371; // Earth's radius in kilometers
      const lat1 = station.Latitude * Math.PI / 180;
      const lat2 = s.Latitude * Math.PI / 180;
      const dLat = (s.Latitude - station.Latitude) * Math.PI / 180;
      const dLon = (s.Longitude - station.Longitude) * Math.PI / 180;
      
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;

      return distance <= maxDistance;
    })
    .slice(0, 3);
};