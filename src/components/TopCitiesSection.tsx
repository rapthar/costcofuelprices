import React from 'react';
import { Link } from 'react-router-dom';
import { stations } from '../data';

interface City {
  name: string;
  state: string;
  stationCount: number;
  slug: string;
}

// Calculate actual station counts per city
const getCityCounts = () => {
  const cityCounts = stations.reduce((acc, station) => {
    const cityKey = `${station.City}|${station["State Full"]}`;
    if (!acc[cityKey]) {
      acc[cityKey] = {
        name: station.City,
        state: station["State Full"].slice(0, 2).toUpperCase(),
        stationCount: 1,
        slug: `${station.City.toLowerCase().replace(/\s+/g, '-')}-${station["State Full"].slice(0, 2).toLowerCase()}`
      };
    } else {
      acc[cityKey].stationCount++;
    }
    return acc;
  }, {} as Record<string, City>);

  return Object.values(cityCounts)
    .sort((a, b) => b.stationCount - a.stationCount)
    .slice(0, 8);
};

const topCities = getCityCounts();

const TopCitiesSection: React.FC = () => {
  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Top Costco Gas Cities
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Browse Popular Cities With Costco Gas Stations
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              to={`/us/${city.state.toLowerCase()}/${city.slug}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {city.name}, {city.state}
                </h3>
                <p className="text-gray-600">
                  {city.stationCount} Gas Station{city.stationCount !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCitiesSection;
