import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { stations, canadaStations } from '../data';
import { stateAbbreviations } from '../utils/states';
import { usePageTitle } from '../hooks/usePageTitle';

const SearchPage = () => {
  // Group stations by state
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

  // Group stations by province
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

  usePageTitle(
    'Search Costco Gas Stations by State or Province',
    'Find Costco gas stations and current fuel prices by browsing through states and provinces across North America.'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Search By State/Province</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Search Costco Gas Stations
      </h1>
      <p className="text-gray-600 max-w-3xl mb-12">
        Find Costco gas stations and current fuel prices by selecting your state or province below.
      </p>

      {/* US States Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          United States Gas Stations by State
        </h2>
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
                    to={`/station/us/${station.City.toLowerCase()}/${station["Store Name"].toLowerCase()}/${station.Address.toLowerCase()}`.replace(/\s+/g, '-')}
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

      {/* Canada Provinces Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Canada Gas Stations by Province
        </h2>
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
                    to={`/station/canada/${station.City.toLowerCase()}/${station["Store Name"].toLowerCase()}/${station.Address.toLowerCase()}`.replace(/\s+/g, '-')}
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
    </div>
  );
};

export default SearchPage;