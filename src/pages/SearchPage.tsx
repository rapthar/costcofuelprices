import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import StateGrid from '../components/StateGrid';

const SearchPage = () => {
  React.useEffect(() => {
    document.title = 'Search Costco Gas Stations by State or Province';
  }, []);

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Search By State/Province</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Costco Gas Stations
        </h1>
        <p className="text-gray-600 max-w-3xl mb-12">
          Find Costco gas stations and current fuel prices by selecting your state or province below.
        </p>

        {/* US States Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Costco Gas Stations by State
          </h2>
          <StateGrid />
        </section>

        {/* Canada Provinces Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Canada Gas Stations by Province
          </h2>
          <div className="bg-blue-50 rounded-lg p-8 text-center max-w-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Coming Soon to Canada
            </h3>
            <p className="text-gray-600">
              We're currently working on bringing Costco gas prices for Canadian locations. 
              Check back soon for updates!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchPage;