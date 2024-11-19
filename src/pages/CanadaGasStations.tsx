import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { canadaStations } from '../data';

const CanadaGasStations = () => {
  React.useEffect(() => {
    document.title = 'Costco Gas Prices - Canada Locations';
  }, []);

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

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Canada Gas Stations</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Costco Gas Prices in Canada
        </h1>
        <p className="text-gray-600 max-w-3xl mb-8">
          Find the most up-to-date Costco gas prices across Canada. Compare prices, 
          find the nearest location, and save money on your next fill-up.
        </p>

        {/* Provinces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stationsByProvince.map(([province, stations]) => (
            <div key={province} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {province}
              </h2>
              <div className="space-y-3">
                {stations.map(station => (
                  <Link
                    key={station['Store Name']}
                    to={`/canada/${province.toLowerCase().replace(/\s+/g, '-')}/${station.City.toLowerCase().replace(/\s+/g, '-')}`}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanadaGasStations;