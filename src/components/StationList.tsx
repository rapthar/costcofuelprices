import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { StationData } from '../types';

interface StationListProps {
  stations: StationData[];
  selectedStation: StationData | null;
  onStationSelect: (station: StationData) => void;
}

const getTimeAgo = (fuelType: 'Regular' | 'Premium' | 'Diesel'): string => {
  switch (fuelType) {
    case 'Regular':
      return '4h ago';
    case 'Premium':
      return '6h ago';
    case 'Diesel':
      return '3h ago';
    default:
      return '4h ago';
  }
};

const StationList: React.FC<StationListProps> = ({ stations, selectedStation, onStationSelect }) => {
  const getStationUrl = (station: StationData) => {
    const citySlug = station.City.toLowerCase().replace(/\s+/g, '-');
    const stateSlug = station["State Full"].toLowerCase().replace(/\s+/g, '-');
    return `/station/${citySlug}-${stateSlug}`;
  };

  return (
    <div className="divide-y divide-gray-200">
      {stations.map(station => (
        <div
          key={station.Title}
          className={`p-4 cursor-pointer transition-colors ${
            selectedStation?.Title === station.Title
              ? 'bg-blue-50'
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => onStationSelect(station)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <Link 
                to={getStationUrl(station)}
                className="inline-block hover:text-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Costco Gas {station["Store Name"]}
                </h3>
              </Link>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-gray-400" />
                <span>{station.Address}</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 text-right">
              <div className="text-lg font-semibold text-green-600">
                {station.Regular}
              </div>
              <div className="mt-1 flex items-center justify-end text-xs text-gray-500">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{getTimeAgo('Regular')}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            {['Regular', 'Premium', 'Diesel'].map((fuelType) => (
              <div
                key={fuelType}
                className="rounded-lg bg-gray-50 p-3 text-center"
              >
                <div className="text-sm font-medium text-gray-500">{fuelType}</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">
                  {station[fuelType] !== "NA" ? station[fuelType] : "—"}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {getTimeAgo(fuelType as 'Regular' | 'Premium' | 'Diesel')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationList;