import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { StationData } from '../types';

interface StationListProps {
  stations: StationData[];
  selectedStation: StationData | null;
  onStationSelect: (station: StationData) => void;
}

const StationList: React.FC<StationListProps> = ({ stations, selectedStation, onStationSelect }) => {
  const getStationUrl = (station: StationData) => {
    const isCanada = window.location.pathname.startsWith('/canada');
    if (isCanada) {
      return `/station/canada/costco-gas-in-${station.City.toLowerCase()}-${station.Address.toLowerCase()}`.replace(/\s+/g, '-');
    }
    // For US stations, create URL with full location info
    const streetAddress = station.Address.split(',')[0];
    return `/station/us/costco-gas-in-${station.City.toLowerCase()}-${streetAddress.toLowerCase()}-${station.City.toLowerCase()}-${station["State Full"].toLowerCase()}-${station.Zipcode}`.replace(/\s+/g, '-');
  };

  return (
    <div className="space-y-4">
      {stations.map(station => (
        <div
          key={station.Title}
          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
            selectedStation?.Title === station.Title
              ? 'bg-blue-50 border-blue-200'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => onStationSelect(station)}
        >
          <div className="flex justify-between items-start">
            <div>
              <Link 
                to={getStationUrl(station)}
                className="inline-block hover:text-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-semibold">Costco {station["Store Name"]}</h3>
              </Link>
              <Link
                to={`/state/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}/${station.City.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center text-sm text-gray-500 mt-1 hover:text-blue-600"
                onClick={(e) => e.stopPropagation()}
              >
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <p>{station.Address}</p>
              </Link>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">{station.Regular}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <p>Updated {station["Last Updated"]}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-gray-600">Regular</p>
              <p className="font-semibold">{station.Regular}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-gray-600">Premium</p>
              <p className="font-semibold">{station.Premium}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-gray-600">Diesel</p>
              <p className="font-semibold">{station.Diesel !== "NA" ? station.Diesel : "-"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationList;