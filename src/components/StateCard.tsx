import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { StationData } from '../types';

interface StateCardProps {
  state: string;
  abbr: string;
  stations: StationData[];
  lowestPrice: number | null;
}

const StateCard: React.FC<StateCardProps> = ({ state, abbr, stations, lowestPrice }) => {
  return (
    <Link
      to={`/state/${state.toLowerCase().replace(/\s+/g, '-')}`}
      className="group bg-white rounded-lg hover:shadow-md transition-all relative overflow-hidden border border-gray-100"
    >
      <div className="absolute top-0 right-0 w-20 h-20">
        <div className="absolute transform rotate-45 bg-blue-600 text-white text-xs font-bold text-center py-1 right-[-35px] top-[12px] w-[100px]">
          {abbr}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1 pr-12">{state}</h3>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">
                {stations.length} Stations
              </p>
              {lowestPrice && (
                <p className="text-sm font-medium text-green-600">
                  From ${lowestPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StateCard;