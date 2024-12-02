import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { parseStationUrl } from '../utils/urls';
import { findStation, findNearbyStations } from '../utils/stations';
import JsonLd from '../components/JsonLd';
import StationHeader from '../components/station/StationHeader';
import StationPrices from '../components/station/StationPrices';
import StationDetails from '../components/station/StationDetails';
import StationMap from '../components/station/StationMap';
import PriceChart from '../components/PriceChart';
import NearbyStations from '../components/NearbyStations';

const StationPage = () => {
  const { id } = useParams();
  const { isCanada, city, storeName, address } = parseStationUrl(id || '');
  const station = findStation(city, storeName, address, isCanada);
  const nearbyStations = station ? findNearbyStations(station, isCanada) : [];

  usePageTitle(
    station 
      ? `Costco Gas Prices at ${station['Store Name']} - ${station.City}, ${station['State Full']}` 
      : 'Station Not Found - CostcoFuelPrices.com',
    station
      ? `Current gas prices at Costco ${station['Store Name']} located at ${station.Address}, ${station.City}, ${station['State Full']}. Find the latest fuel costs and station information.`
      : 'The requested Costco gas station could not be found.'
  );

  if (!station) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Station Not Found</h1>
          <p className="text-gray-600 mb-8">The requested Costco gas station could not be found.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd type="Station" data={station} />
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={isCanada ? "/canada-gas-stations" : "/us-gas-stations"} className="hover:text-gray-700">
          {isCanada ? 'Canada Gas Stations' : 'US Gas Stations'}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link 
          to={`/${isCanada ? 'canada' : 'state'}/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}`}
          className="hover:text-gray-700"
        >
          {station["State Full"]}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{station["Store Name"]}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Station Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <StationHeader station={station} isCanada={isCanada} />
            <StationPrices station={station} isCanada={isCanada} />
            <StationDetails station={station} />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Price History</h2>
            <PriceChart station={station} />
          </div>
        </div>

        {/* Map and Nearby Stations */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
            <StationMap station={station} />
          </div>

          {nearbyStations.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Stations</h2>
              <p className="text-sm text-gray-500 mb-4">Within 80 kilometers</p>
              <NearbyStations stations={nearbyStations} isCanada={isCanada} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationPage;