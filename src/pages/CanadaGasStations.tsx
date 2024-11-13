import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CanadaGasStations = () => {
  React.useEffect(() => {
    document.title = 'Costco Gas Prices - Canada Locations';
  }, []);

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Canada Gas Stations</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Costco Gas Prices in Canada
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Find the most up-to-date Costco gas prices across Canada. Compare prices, 
          find the nearest location, and save money on your next fill-up.
        </p>

        {/* Coming Soon Message */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Coming Soon to Canada
          </h2>
          <p className="text-gray-600 mb-4">
            We're currently working on bringing Costco gas prices for Canadian locations. 
            Check back soon for updates!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CanadaGasStations;