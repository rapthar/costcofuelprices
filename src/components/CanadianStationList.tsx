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

const CanadianStationList: React.FC<CanadianStationListProps> = ({
  stations,
  selectedStation,
  onStationSelect,
  fuelType = 'Regular'
}) => {
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
                to={`/canada/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}/${station.City.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block hover:text-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-semibold">Costco {station["Store Name"]}</h3>
              </Link>
              <div
                className="flex items-center text-sm text-gray-500 mt-1"
              >
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <p>{station.Address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">
                {formatCADPrice(station[fuelType])}/L
              </p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <p>Updated {station["Last Updated"]}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-gray-600">Regular</p>
              <p className="font-semibold">{formatCADPrice(station.Regular)}/L</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-gray-600">Premium</p>
              <p className="font-semibold">{formatCADPrice(station.Premium)}/L</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-gray-600">Diesel</p>
              <p className="font-semibold">
                {station.Diesel !== "NA" ? `${formatCADPrice(station.Diesel)}/L` : "-"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CanadianStationList;
