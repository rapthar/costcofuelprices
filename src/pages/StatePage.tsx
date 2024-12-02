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
import { parseStateUrl } from '../utils/urls';

const StatePage = () => {
  const { state } = useParams();
  const { isCanada } = parseStateUrl(window.location.pathname);
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [filters, setFilters] = useState({
    fuelType: 'Regular',
    maxPrice: 5,
    maxDistance: 50
  });
  const [searchQuery, setSearchQuery] = useState('');

  const formattedState = state?.replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Set page title and meta description
  usePageTitle(
    `Costco Gas Prices ${formattedState}${isCanada ? ', Canada' : ''}`,
    `Find the best Costco gas prices in ${formattedState}${isCanada ? ', Canada' : ''}. Compare fuel costs and locate the nearest Costco gas station in your area.`
  );

  // Get stations for this state/province
  const normalizedState = state?.replace(/-/g, ' ').toLowerCase();
  console.log('State page params:', {
    state,
    normalizedState,
    isCanada,
    pathname: window.location.pathname
  });
  
  const stateStations = isCanada
    ? canadaStations[0].filter(station => 
        station["State Full"].toLowerCase() === normalizedState
      )
    : stations.filter(station => 
        station["State Full"].toLowerCase() === normalizedState
      );

  // Filter stations based on search query
  const filteredStations = stateStations.filter(station => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      station.City.toLowerCase().includes(searchLower) ||
      station.Address.toLowerCase().includes(searchLower) ||
      station["Store Name"].toLowerCase().includes(searchLower)
    );
  });

  // Sort stations by price
  const sortedStations = [...filteredStations].sort((a, b) => {
    const priceA = parseFloat(a[filters.fuelType].replace('$', ''));
    const priceB = parseFloat(b[filters.fuelType].replace('$', ''));
    return priceA - priceB;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          </li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <li>
            <Link 
              to={isCanada ? "/canada-map" : "/us-map"} 
              className="text-gray-500 hover:text-gray-700"
            >
              {isCanada ? "Canada" : "United States"}
            </Link>
          </li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <li>
            <span className="text-gray-900 font-medium">{formattedState}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Costco Gas Prices in {formattedState}
          </h1>
          
          <div className="mb-6">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by city or address..."
            />
          </div>

          <div className="mb-6">
            <FilterPanel 
              filters={filters}
              onChange={setFilters}
            />
          </div>

          <StationList 
            stations={sortedStations}
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
          />
        </div>

        <div className="lg:sticky lg:top-8">
          <Map 
            stations={sortedStations}
            selectedStation={selectedStation}
            onStationSelect={setSelectedStation}
            center={selectedStation ? {
              lat: selectedStation.Latitude,
              lng: selectedStation.Longitude
            } : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default StatePage;