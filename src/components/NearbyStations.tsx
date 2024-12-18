import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { formatCADPrice } from '../utils/currency';

interface Props {
  stations: any[];
  isCanada?: boolean;
}

const NearbyStations: React.FC<Props> = ({ stations, isCanada = false }) => {
  const getStationId = (station: any) => {
    const citySlug = station.City.toLowerCase().replace(/\s+/g, '-');
    const addressSlug = station.Address.toLowerCase().replace(/\s+/g, '-');
    const stateSlug = station['State Full'].toLowerCase().replace(/\s+/g, '-');
    
    return `${isCanada ? 'canada' : 'us'}/costco-${addressSlug}-${citySlug}-${stateSlug}`;
  };

  return (
    <div className="space-y-4">
      {stations.map((station, index) => (
        <Link
          key={index}
          to={`/station/${getStationId(station)}`}
          className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">{station["Store Name"]}</p>
              <p className="text-gray-600 text-sm">{station.Address}</p>
              <div className="mt-2 flex items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500">Regular</p>
                  <p className="font-medium text-green-600">
                    {isCanada ? formatCADPrice(parseFloat(station.Regular)) : station.Regular}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Premium</p>
                  <p className="font-medium text-green-600">
                    {isCanada ? formatCADPrice(parseFloat(station.Premium)) : station.Premium}
                  </p>
                </div>
                {station.Diesel !== "NA" && (
                  <div>
                    <p className="text-xs text-gray-500">Diesel</p>
                    <p className="font-medium text-green-600">
                      {isCanada ? formatCADPrice(parseFloat(station.Diesel)) : station.Diesel}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NearbyStations;