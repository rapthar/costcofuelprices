import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { canadaStations } from '../data';
import { generateStationUrl } from '../utils/urls';

const ProvinceGridSection: React.FC = () => {
  const provinceStations = React.useMemo(() => {
    const grouped = canadaStations[0].reduce((acc, station) => {
      const province = station['State Full'];
      if (!acc[province]) {
        acc[province] = [];
      }
      acc[province].push(station);
      return acc;
    }, {} as Record<string, typeof canadaStations[0]>);

    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Find Costco Gas Prices By Province
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Browse current gas prices at Costco locations across Canada
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {provinceStations.map(([province, stations]) => (
          <div key={province} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <Link
              to={`/canada/${province.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                {province}
              </h3>
            </Link>
            <div className="text-sm text-gray-500 mb-4">
              {stations.length} location{stations.length !== 1 ? 's' : ''}
            </div>
            <div className="space-y-4">
              {stations.slice(0, 3).map((station, index) => (
                <Link
                  key={index}
                  to={generateStationUrl(station, true)}
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
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
                  className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all {stations.length} locations →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProvinceGridSection;