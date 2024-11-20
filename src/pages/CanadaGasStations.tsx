import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProvinceGrid from '../components/ProvinceGrid';
import CanadianAverage from '../components/CanadianAverage';
import { usePageTitle } from '../hooks/usePageTitle';

const CanadaGasStations = () => {
  usePageTitle(
    'Costco Gas Prices - Canada Locations',
    'Find current Costco gas prices across Canada. Compare fuel costs and locate the nearest Costco gas station in your province.'
  );

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
        <p className="text-gray-600 max-w-3xl mb-8">
          Find the most up-to-date Costco gas prices across Canada. Compare prices, 
          find the nearest location, and save money on your next fill-up.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Locations</h3>
            <p className="text-2xl font-bold text-gray-900">100+</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Provinces Covered</h3>
            <p className="text-2xl font-bold text-gray-900">13</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
            <p className="text-2xl font-bold text-gray-900">6 Hours Ago</p>
          </div>
        </div>
      </div>

      <CanadianAverage />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Browse by Province
        </h2>
        <ProvinceGrid />
      </div>
    </div>
  );
};

export default CanadaGasStations;