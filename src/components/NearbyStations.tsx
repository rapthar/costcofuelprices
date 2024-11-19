import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { StationData } from '../types';

interface NearbyStationsProps {
  stations: StationData[];
  currentStation: StationData;
}

const NearbyStations: React.FC<NearbyStationsProps> = ({ stations, currentStation }) => {
  if (stations.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Costco Stations Near This Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stations.map(station => {
          // Calculate distance between stations
          const R = 3959; // Earth's radius in miles
          const lat1 = currentStation.Latitude * Math.PI / 180;
          const lat2 = station.Latitude * Math.PI / 180;
          const dLat = (station.Latitude - currentStation.Latitude) * Math.PI / 180;
          const dLon = (station.Longitude - currentStation.Longitude) * Math.PI / 180;
          
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                   Math.cos(lat1) * Math.cos(lat2) *
                   Math.sin(dLon/2) * Math.sin(dLon/2);
          
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const distance = Math.round(R * c);

          return (
            <Link
              key={station.Title}
              to={`/station/${station.Title.toLowerCase().replace(/\s+/g, '-')}`}
              className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Costco {station["Store Name"]}</h3>
                  <p className="text-sm text-gray-500 mt-1">{station.Address}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{distance} miles away</span>
                    <span className="font-medium text-green-600">{station.Regular}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NearbyStations;