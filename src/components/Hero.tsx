import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { stations } from '../data/stations';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = stations
      .filter(station => {
        const searchStr = query.toLowerCase();
        return (
          station.City.toLowerCase().includes(searchStr) ||
          station["State Full"].toLowerCase().includes(searchStr) ||
          (typeof station.Zipcode === 'string' && station.Zipcode.includes(searchStr))
        );
      })
      .map(station => `${station.City}, ${station["State Full"]} ${station.Zipcode}`)
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 5);

    setSearchResults(results);
  };

  const handleResultClick = (result: string) => {
    setSearchQuery(result);
    setSearchResults([]);
    // Navigate to appropriate state page
    const state = result.split(', ')[1].split(' ')[0];
    navigate(`/state/${state.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Get popular searches based on data
  const popularSearches = [
    // States with most stations
    ...Array.from(new Set(stations.map(s => s["State Full"])))
      .slice(0, 2),
    
    // Cities with lowest prices
    ...stations
      .filter(s => s.Regular !== "NA")
      .sort((a, b) => parseFloat(a.Regular.replace('$', '')) - parseFloat(b.Regular.replace('$', '')))
      .slice(0, 2)
      .map(s => s.City),
    
    // Sample zip codes
    ...Array.from(new Set(stations.map(s => s.Zipcode)))
      .slice(0, 2),
    
    'costco gas near me',
    'lowest gas prices'
  ];

  return (
    <div className="relative bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613743990305-736d763f3d70?q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      <div className="relative px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-center mb-8">
          Find A Costco Station Near Me
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="Enter city, state or zip code..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <button 
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => handleSearch(searchQuery)}
              >
                Find Gas Price
              </button>
            </div>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                <ul className="py-2">
                  {searchResults.map((result, index) => (
                    <li 
                      key={index}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleResultClick(result)}
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="mt-3 text-sm text-gray-300 text-center">
            <span className="font-medium">Popular Searches: </span>
            {popularSearches.map((search, index) => (
              <React.Fragment key={search}>
                <button
                  className="hover:text-white transition-colors"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </button>
                {index < popularSearches.length - 1 && <span className="mx-1">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;