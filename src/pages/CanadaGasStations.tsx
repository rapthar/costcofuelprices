import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProvinceGrid from '../components/ProvinceGrid';
import CanadianAverage from '../components/CanadianAverage';

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
      </div>

      <CanadianAverage />
      <ProvinceGrid />
    </div>
  );
};

export default CanadaGasStations;