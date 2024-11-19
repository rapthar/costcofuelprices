import React from 'react';
import { Link } from 'react-router-dom';
import { stations } from '../data';
import { MapPin } from 'lucide-react';
import { stateAbbreviations } from '../utils/states';

const PopularStations = () => {
  // Get 8 representative stations from different states with good price coverage
  const popularStations = stations
    .filter(station => station.Regular !== "NA" && station["Gas Price Types"].includes("Regular"))
    .sort((a, b) => parseFloat(a.Regular.replace('$', '')) - parseFloat(b.Regular.replace('$', '')))
    .reduce((acc, station) => {
      // Only take one station per state to ensure diversity
      if (!acc.some(s => s["State Full"] === station["State Full"]) && acc.length < 8) {
        acc.push(station);
      }
      return acc;
    }, [] as typeof stations);

  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Popular Costco Gas Stations
      </h2>
      <p className="text-gray-600 text-center mb-8">
        The most searched Costco gas stations. Where to Find the Best Costco Deal on Fuel
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularStations.map((station) => (
          <Link
            key={station.Title}
            to={`/station/${station.Title.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#005DAA] rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/costco-logo.svg" alt="Costco" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Costco {station["Store Name"]}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {station.City}, {stateAbbreviations[station["State Full"]]}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Regular</p>
                <span className="text-lg font-bold text-green-600">{station.Regular}</span>
              </div>
              <span className="text-sm text-gray-500">Updated 6h ago</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularStations;