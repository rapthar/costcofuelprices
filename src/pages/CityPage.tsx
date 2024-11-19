import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowUpDown, ChevronRight } from 'lucide-react';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import StationList from '../components/StationList';
import { stations, canadaStations } from '../data';
import { StationData } from '../types';
import { stateAbbreviations } from '../utils/states';
import { usePageTitle } from '../hooks/usePageTitle';

const CityPage = () => {
  const { state, city, country } = useParams();
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [filters, setFilters] = useState({
    fuelType: 'Regular',
    maxPrice: 5,
    maxDistance: 50
  });
  const [searchQuery, setSearchQuery] = useState('');

  const formattedCity = city?.replace('-', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const formattedState = state?.replace('-', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Set page title and meta description
  usePageTitle(
    `Costco Gas Prices ${formattedCity}, ${formattedState}${country === 'canada' ? ', Canada' : ''}`,
    `Find current Costco gas prices in ${formattedCity}, ${formattedState}${country === 'canada' ? ', Canada' : ''}. Compare fuel costs and get directions to your nearest Costco gas station.`
  );

  // Get stations for this city
  const cityStations = country === 'canada' 
    ? canadaStations[0].filter(station => 
        station.City.toLowerCase() === city?.replace('-', ' ').toLowerCase() &&
        station["State Full"].toLowerCase() === state?.replace('-', ' ').toLowerCase()
      )
    : stations.filter(station => 
        station.City.toLowerCase() === city?.replace('-', ' ').toLowerCase() &&
        station["State Full"].toLowerCase() === state?.replace('-', ' ').toLowerCase()
      );

  // Filter stations based on search and filters
  const filteredStations = cityStations.filter(station => {
    const matchesSearch = station.Address.toLowerCase().includes(searchQuery.toLowerCase());
    if (station[filters.fuelType] === 'NA') return matchesSearch;
    const matchesPrice = parseFloat(station[filters.fuelType].replace('$', '') || '0') <= filters.maxPrice;
    return matchesSearch && matchesPrice;
  });

  const averagePrice = filteredStations
    .filter(s => s[filters.fuelType] !== "NA")
    .reduce((acc, station) => acc + parseFloat(station[filters.fuelType].replace('$', '')), 0) / 
    filteredStations.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/us-gas-stations" className="hover:text-gray-700">US Gas Stations</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/state/${state}`} className="hover:text-gray-700">{formattedState}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{formattedCity}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Costco Gas Prices in {formattedCity}, {formattedState}
      </h1>

      {/* Map */}
      <div className="w-full h-[400px] mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Map
          stations={filteredStations}
          selectedStation={selectedStation}
          onStationSelect={setSelectedStation}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Average {filters.fuelType} Price</p>
          <p className="text-2xl font-bold text-green-600">
            ${averagePrice.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Stations</p>
          <p className="text-2xl font-bold text-gray-900">
            {filteredStations.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="text-2xl font-bold text-gray-900">6 Hours Ago</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Search & Filters</h2>
            <div className="space-y-4">
              <SearchBar onSearch={setSearchQuery} />
              <FilterPanel filters={filters} onFilterChange={setFilters} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Station List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <StationList
              stations={filteredStations}
              selectedStation={selectedStation}
              onStationSelect={setSelectedStation}
              fuelType={filters.fuelType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;