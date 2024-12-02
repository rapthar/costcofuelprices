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
  
  return stationList.find(station => {
    // Extract the street number from both addresses
    const urlStreetNumber = address.split('-')[0];
    const stationStreetNumber = station.Address.split(' ')[0];
    
    // Create slugified versions of the full addresses for comparison
    const slugifiedStationAddr = slugify(station.Address, { lower: true });
    const slugifiedSearchAddr = address;
    
    // Match if either the street numbers match or the full addresses match
    const matchAddress = urlStreetNumber === stationStreetNumber || 
                        slugifiedStationAddr.includes(slugifiedSearchAddr) ||
                        slugifiedSearchAddr.includes(slugifiedStationAddr);
    
    return matchAddress;
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