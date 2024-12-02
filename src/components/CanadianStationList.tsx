import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { StationData } from '../types';
import { formatCADPrice } from '../utils/currency';

interface CanadianStationListProps {
  stations: StationData[];
  selectedStation: StationData | null;
  onStationSelect: (station: StationData) => void;
  fuelType?: string;
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

const CanadianStationList: React.FC<CanadianStationListProps> = ({
  stations,
  selectedStation,
  onStationSelect,
  fuelType = 'Regular'
}) => {
  const getStationId = (station: StationData) => {
    return `costco-gas-in-${station.City.toLowerCase()}-${station.Address.toLowerCase()}`.replace(/\s+/g, '-');
  };

  return (
    <div className="divide-y divide-gray-200">
      {stations.map(station => (
        <div
          key={station["Store Name"] + station.City}
          className={`p-6 cursor-pointer transition-colors ${
            selectedStation?.["Store Name"] === station["Store Name"] && selectedStation?.City === station.City
              ? 'bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onStationSelect(station)}
        >
          <div className="flex justify-between items-start">
            <div>
              <Link 
                to={`/station/canada/${getStationId(station)}`}
                className="inline-block hover:text-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-gray-900">Costco {station["Store Name"]}</h3>
              </Link>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <p>{station.Address}, {station.City}, {station["State Full"]}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">
                {formatCADPrice(parseFloat(station[fuelType]))}
              </p>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Clock className="h-4 w-4 mr-1" />
                <p>{getTimeAgo(fuelType as 'Regular' | 'Premium' | 'Diesel')}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Regular</p>
              <p className="font-semibold text-gray-900">{formatCADPrice(parseFloat(station.Regular))}</p>
              <p className="text-xs text-gray-500 mt-1">{getTimeAgo('Regular')}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Premium</p>
              <p className="font-semibold text-gray-900">{formatCADPrice(parseFloat(station.Premium))}</p>
              <p className="text-xs text-gray-500 mt-1">{getTimeAgo('Premium')}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Diesel</p>
              <p className="font-semibold text-gray-900">
                {station.Diesel !== "NA" ? formatCADPrice(parseFloat(station.Diesel)) : "-"}
              </p>
              <p className="text-xs text-gray-500 mt-1">{getTimeAgo('Diesel')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CanadianStationList;