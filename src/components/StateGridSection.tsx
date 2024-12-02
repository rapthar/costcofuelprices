import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { stations } from '../data';
import { stateAbbreviations } from '../utils/states';
import { generateStationUrl } from '../utils/urls';

const StateGridSection: React.FC = () => {
  const stateStations = React.useMemo(() => {
    const grouped = stations.reduce((acc, station) => {
      const state = station['State Full'];
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(station);
      return acc;
    }, {} as Record<string, typeof stations>);

    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Find Costco Gas Prices By State
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Browse current gas prices at Costco locations across the United States
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stateStations.map(([state, stations]) => (
          <div key={state} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <Link
              to={`/state/${state.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                {state} <span className="text-gray-400 text-sm">({stateAbbreviations[state]})</span>
              </h3>
            </Link>
            <div className="text-sm text-gray-500 mb-4">
              {stations.length} location{stations.length !== 1 ? 's' : ''}
            </div>
            <div className="space-y-4">
              {stations.slice(0, 3).map((station, index) => (
                <Link
                  key={index}
                  to={generateStationUrl(station)}
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
                  to={`/state/${state.toLowerCase().replace(/\s+/g, '-')}`}
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

export default StateGridSection;