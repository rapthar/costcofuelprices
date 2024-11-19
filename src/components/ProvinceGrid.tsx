import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { canadaStations } from '../data';

const ProvinceGrid = () => {
  // Group stations by province
  const stationsByProvince = React.useMemo(() => {
    const grouped = canadaStations[0].reduce((acc, station) => {
      const province = station['State Full'];
      if (!acc[province]) {
        acc[province] = [];
      }
      acc[province].push(station);
      return acc;
    }, {} as Record<string, typeof canadaStations[0]>);

    // Sort provinces alphabetically
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  const getStationId = (station: any) => {
    return `costco-gas-in-${station.City.toLowerCase()}-${station.Address.toLowerCase()}`.replace(/\s+/g, '-');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stationsByProvince.map(([province, stations]) => (
          <div key={province} className="bg-white rounded-lg shadow-sm p-6">
            <Link
              to={`/canada/${province.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 hover:text-blue-600">
                {province}
              </h2>
            </Link>
            <div className="text-sm text-gray-500 mb-4">
              {stations.length} location{stations.length !== 1 ? 's' : ''}
            </div>
            <div className="space-y-3">
              {stations.slice(0, 3).map((station, index) => (
                <Link
                  key={index}
                  to={`/station/${getStationId(station)}`}
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      {station.City}
                    </div>
                    <div className="text-sm text-gray-500">
                      {station['Store Name']}
                    </div>
                  </div>
                </Link>
              ))}
              {stations.length > 3 && (
                <Link
                  to={`/canada/${province.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all {stations.length} locations
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProvinceGrid;
