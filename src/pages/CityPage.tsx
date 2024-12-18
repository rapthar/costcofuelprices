import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowUpDown, ChevronRight, Fuel, Clock, MapPinned } from 'lucide-react';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import StationList from '../components/StationList';
import { stations, canadaStations } from '../data';
import { StationData } from '../types';
import { stateAbbreviations } from '../utils/states';
import { usePageTitle } from '../hooks/usePageTitle';

const CityPage = () => {
  const { state, city } = useParams();
  const isCanada = window.location.pathname.startsWith('/canada/');
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [filters, setFilters] = useState({
    fuelType: 'Regular',
    maxPrice: 5,
    maxDistance: 50
  });
  const [searchQuery, setSearchQuery] = useState('');

  const formattedCity = city?.replace(/-[a-z]{2}$/, '') // Remove state suffix from city slug
    .replace(/-/g, ' ') // Replace remaining hyphens with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get full state name from abbreviation
  const getFullStateName = (abbr: string) => {
    const fullName = Object.entries(stateAbbreviations).find(([_, abb]) => abb.toLowerCase() === abbr.toLowerCase())?.[0];
    return fullName || abbr.toUpperCase();
  };

  const formattedState = state ? getFullStateName(state) : '';
  const stateSlug = formattedState.toLowerCase().replace(/\s+/g, '-');

  // Set page title and meta description
  usePageTitle(
    `Costco Gas Prices in ${formattedCity}, ${state?.toUpperCase()}${isCanada ? ', Canada' : ''}`,
    `Find current Costco gas prices in ${formattedCity}, ${state?.toUpperCase()}${isCanada ? ', Canada' : ''}. Compare fuel costs and get directions to your nearest Costco gas station.`
  );

  // Get stations for this city with memoization
  const cityStations = useMemo(() => {
    if (!city || !state) return [];

    // Get state abbreviation from stateAbbreviations
    const stateAbbr = Object.entries(stateAbbreviations)
      .find(([name, abbr]) => abbr.toLowerCase() === state.toLowerCase())?.[0]
      ?.toLowerCase();

    if (!stateAbbr) return [];

    // Remove state suffix from city (e.g., "phoenix-az" -> "phoenix")
    const cityName = city.replace(/-[a-z]{2}$/, '').replace(/-/g, ' ');
    const normalizedCity = cityName.toLowerCase();
    
    return isCanada
      ? canadaStations[0].filter(station => {
          const stationCity = station.City.toLowerCase();
          const stationState = station["State Full"].toLowerCase();
          return stationCity === normalizedCity && stationState === stateAbbr;
        })
      : stations.filter(station => {
          const stationCity = station.City.toLowerCase();
          const stationState = station["State Full"].toLowerCase();
          return stationCity === normalizedCity && stationState === stateAbbr;
        });
  }, [city, state, isCanada]);

  // Log station data for debugging
  useEffect(() => {
    console.log('City Stations:', {
      city,
      state,
      stationsFound: cityStations.length,
      firstStation: cityStations[0],
      allStations: cityStations
    });
  }, [cityStations, city, state]);

  // Filter stations based on search and filters
  const filteredStations = useMemo(() => {
    return cityStations.filter(station => {
      const matchesSearch = station.Address.toLowerCase().includes(searchQuery.toLowerCase());
      if (station[filters.fuelType] === 'NA') return matchesSearch;
      const matchesPrice = parseFloat(station[filters.fuelType].replace('$', '') || '0') <= filters.maxPrice;
      return matchesSearch && matchesPrice;
    });
  }, [cityStations, searchQuery, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const validPrices = filteredStations
      .filter(s => s[filters.fuelType] !== "NA")
      .map(s => parseFloat(s[filters.fuelType].replace('$', '')));

    const avgPrice = validPrices.length > 0
      ? validPrices.reduce((acc, price) => acc + price, 0) / validPrices.length
      : 0;

    const lowestPrice = validPrices.length > 0
      ? Math.min(...validPrices)
      : 0;

    const highestPrice = validPrices.length > 0
      ? Math.max(...validPrices)
      : 0;

    return {
      averagePrice: avgPrice,
      lowestPrice,
      highestPrice,
      totalStations: filteredStations.length
    };
  }, [filteredStations, filters.fuelType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={isCanada ? "/canada-gas-stations" : "/us-gas-stations"} className="hover:text-gray-700">
          {isCanada ? 'Canada Gas Stations' : 'US Gas Stations'}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`${isCanada ? '/canada' : '/state'}/${stateSlug}`} className="hover:text-gray-700">
          {formattedState}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{formattedCity}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Costco Gas Prices in {formattedCity}, {state?.toUpperCase()}
      </h1>

      {/* Map */}
      <div className="w-full h-[400px] mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Map
          stations={filteredStations}
          selectedStation={selectedStation}
          onStationSelect={setSelectedStation}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Fuel className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500">Average {filters.fuelType} Price</p>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${stats.averagePrice.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpDown className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-gray-500">Price Range</p>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            ${stats.lowestPrice.toFixed(2)} - ${stats.highestPrice.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <MapPinned className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-500">Total Stations</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {stats.totalStations}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-orange-600" />
            <p className="text-sm text-gray-500">Last Updated</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">6h ago</p>
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

        {/* Station List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                Costco Gas Stations in {formattedCity}
              </h2>
              <p className="text-sm text-gray-500">
                Showing {filteredStations.length} {filteredStations.length === 1 ? 'location' : 'locations'}
              </p>
            </div>
            {filteredStations.length > 0 ? (
              <StationList
                stations={filteredStations}
                selectedStation={selectedStation}
                onStationSelect={setSelectedStation}
                fuelType={filters.fuelType}
              />
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No gas stations found in this area.</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;