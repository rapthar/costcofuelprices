import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowUpDown, ChevronRight } from 'lucide-react';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import StationList from '../components/StationList';
import { canadaStations } from '../data';
import { StationData } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';

const CanadaMapPage = () => {
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  usePageTitle('Costco Canada Gas Prices Map - Find Cheap Fuel Near You');

  // Filter stations based on search query
  const filteredStations = canadaStations.filter(station => {
    const searchLower = searchQuery.toLowerCase();
    return (
      station.City.toLowerCase().includes(searchLower) ||
      station['State Full'].toLowerCase().includes(searchLower) ||
      station['Store Name'].toLowerCase().includes(searchLower)
    );
  });

  // Sort stations based on price
  const sortedStations = [...filteredStations].sort((a, b) => {
    const priceA = parseFloat(a.Regular.replace('$', ''));
    const priceB = parseFloat(b.Regular.replace('$', ''));
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const handleStationClick = (station: StationData) => {
    setSelectedStation(station);
  };

  const handleStationSelect = (station: StationData) => {
    navigate(`/station/${station['Store Name'].toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Costco Canada Gas Prices Map</h1>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort by Price
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search and List */}
          <div className="space-y-6">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search by city, province, or store name..."
            />
            <FilterPanel />
            <StationList
              stations={sortedStations}
              selectedStation={selectedStation}
              onStationClick={handleStationClick}
              onStationSelect={handleStationSelect}
            />
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[800px]">
              <Map
                stations={sortedStations}
                selectedStation={selectedStation}
                onStationClick={handleStationClick}
                onStationSelect={handleStationSelect}
                center={[56.1304, -106.3468]} // Center of Canada's populated regions
                zoom={2.5} // Adjusted zoom level as requested
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanadaMapPage;
