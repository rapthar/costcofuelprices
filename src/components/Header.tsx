import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Globe2, Wrench, Mail, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img src="/logo.svg" alt="CostcoFuelPrices" className="h-14" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                <Globe2 className="w-4 h-4" />
                <span>Maps</span>
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/us-map" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  United States Map
                </Link>
                <Link to="/canada-map" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Canada Map
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                <Globe2 className="w-4 h-4" />
                <span>Locations</span>
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/us-gas-stations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Costco United States
                </Link>
                <Link to="/canada-gas-stations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Costco Canada
                </Link>
              </div>
            </div>

            <Link to="/search" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
              <Search className="w-4 h-4" />
              <span>Search By State/Province</span>
            </Link>

            <Link to="/tools" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
              <Wrench className="w-4 h-4" />
              <span>Gas Tools</span>
            </Link>

            <Link to="/contact" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </nav>
          
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;