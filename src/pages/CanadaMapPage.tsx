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
  const filteredStations = canadaStations[0].filter(station => {
    const searchLower = searchQuery.toLowerCase();
    return (
      station.City.toLowerCase().includes(searchLower) ||
      station['State Full'].toLowerCase().includes(searchLower) ||
      station['Store Name'].toLowerCase().includes(searchLower)
    );
  });

  // Sort stations based on price
  const sortedStations = [...filteredStations].sort((a, b) => {
    if (a.Regular === 'NA' && b.Regular === 'NA') return 0;
    if (a.Regular === 'NA') return 1;
    if (b.Regular === 'NA') return -1;
    const priceA = parseFloat(a.Regular.replace('$', '') || '0');
    const priceB = parseFloat(b.Regular.replace('$', '') || '0');
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const handleStationClick = (station: StationData) => {
    setSelectedStation(station);
  };

  const handleStationSelect = (station: StationData) => {
    const stateSlug = station['State Full'].toLowerCase().replace(/\s+/g, '-');
    const citySlug = station.City.toLowerCase().replace(/\s+/g, '-');
    navigate(`/canada/${stateSlug}/${citySlug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Costco Canada Gas Prices Map</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search and List */}
          <div className="space-y-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by city, province, or store name..."
            />
            <FilterPanel />
            <StationList
              stations={sortedStations}
              onStationClick={handleStationClick}
              onStationSelect={handleStationSelect}
              selectedStation={selectedStation}
            />
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Map
                stations={sortedStations}
                selectedStation={selectedStation}
                onStationClick={handleStationClick}
                center={{ lat: 56.1304, lng: -106.3468 }} // Center of Canada
                zoom={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanadaMapPage;
