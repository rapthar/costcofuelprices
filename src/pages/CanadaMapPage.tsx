import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpDown, ChevronRight } from 'lucide-react';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CanadianStationList from '../components/CanadianStationList';
import { canadaStations } from '../data';
import { StationData } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatCADPrice } from '../utils/currency';

const CanadaMapPage = () => {
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [filters, setFilters] = useState({
    fuelType: 'Regular',
    maxPrice: 5,
    maxDistance: 50
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Set page title and meta description
  usePageTitle(
    'Costco Gas Prices Map - Canada Locations',
    'Interactive map of all Costco gas stations in Canada. Compare fuel prices and find the nearest location to you.'
  );

  // Filter stations based on search and filters
  const filteredStations = canadaStations[0].filter(station => {
    const matchesSearch = 
      station.City.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station["State Full"].toLowerCase().includes(searchQuery.toLowerCase());
    const price = station[filters.fuelType];
    const matchesPrice = price !== 'NA' && !isNaN(parseFloat(price)) && parseFloat(price) <= filters.maxPrice;
    return matchesSearch && matchesPrice;
  });

  const validPrices = filteredStations.filter(s => s[filters.fuelType] !== "NA" && !isNaN(parseFloat(s[filters.fuelType])));
  const averagePrice = validPrices.length > 0
    ? validPrices.reduce((acc, station) => acc + parseFloat(station[filters.fuelType]), 0) / validPrices.length
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Canada Gas Price Map</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Costco Canada Gas Price Map
      </h1>

      {/* Map */}
      <div className="w-full h-[600px] mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Map
          stations={filteredStations}
          selectedStation={selectedStation}
          onStationSelect={setSelectedStation}
          center={[56.1304, -106.3468]} // Center of Canada
          zoom={3.5}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Average {filters.fuelType} Price</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCADPrice(averagePrice)}
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
            <CanadianStationList
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

export default CanadaMapPage;
