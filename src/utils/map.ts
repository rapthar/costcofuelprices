import { StationData } from '../types';

interface MapBounds {
  center: [number, number];
  zoom: number;
}

export const calculateMapBounds = (stations: StationData[]): MapBounds => {
  if (!stations.length) {
    return {
      center: [39.8283, -98.5795], // Center of US
      zoom: 4
    };
  }

  const validStations = stations.filter(
    station => !isNaN(Number(station.Latitude)) && !isNaN(Number(station.Longitude))
  );

  if (!validStations.length) {
    return {
      center: [39.8283, -98.5795],
      zoom: 4
    };
  }

  const lats = validStations.map(s => Number(s.Latitude));
  const lngs = validStations.map(s => Number(s.Longitude));

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const center: [number, number] = [
    (minLat + maxLat) / 2,
    (minLng + maxLng) / 2
  ];

  // Calculate appropriate zoom level based on bounds
  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;
  const maxDiff = Math.max(latDiff, lngDiff);

  let zoom = 4;
  if (maxDiff <= 1) zoom = 10;
  else if (maxDiff <= 3) zoom = 8;
  else if (maxDiff <= 7) zoom = 7;
  else if (maxDiff <= 15) zoom = 6;
  else if (maxDiff <= 30) zoom = 5;

  return { center, zoom };
};

export const getDefaultCenter = (isCanada: boolean): [number, number] => {
  return isCanada ? [56.1304, -106.3468] : [39.8283, -98.5795];
};