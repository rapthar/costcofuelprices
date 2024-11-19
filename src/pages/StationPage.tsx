import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Phone, Clock, Calendar, Info, ChevronRight, Building2, Globe2 } from 'lucide-react';
import { stations } from '../data/stations';
import PriceChart from '../components/PriceChart';
import NearbyStations from '../components/NearbyStations';
import { stateAbbreviations } from '../utils/states';
import { usePageTitle } from '../hooks/usePageTitle';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const StationPage = () => {
  const { id } = useParams();
  const station = stations.find(s => s.Title.toLowerCase().replace(/\s+/g, '-') === id);

  usePageTitle(
    station 
      ? `Costco - ${station["Street Address"]} - ${station.City}, ${stateAbbreviations[station["State Full"]]}`
      : 'Station Not Found - CostcoFuelPrices.com',
    station
      ? `Current gas prices at Costco ${station["Store Name"]} located at ${station["Street Address"]}, ${station.City}, ${stateAbbreviations[station["State Full"]]}. Find the latest fuel costs and station information.`
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

  // Find nearby stations (within 50 miles)
  const nearbyStations = stations.filter(s => {
    if (s.Title === station.Title) return false;
    
    const R = 3959; // Earth's radius in miles
    const lat1 = station.Latitude * Math.PI / 180;
    const lat2 = s.Latitude * Math.PI / 180;
    const dLat = (s.Latitude - station.Latitude) * Math.PI / 180;
    const dLon = (s.Longitude - station.Longitude) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(lat1) * Math.cos(lat2) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    return distance <= 50;
  }).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/us-gas-stations" className="hover:text-gray-700">US Gas Stations</Link>
        <ChevronRight className="w-4 h-4" />
        <Link 
          to={`/state/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}`}
          className="hover:text-gray-700"
        >
          {station["State Full"]}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link 
          to={`/state/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}/${station.City.toLowerCase().replace(/\s+/g, '-')}`}
          className="hover:text-gray-700"
        >
          {station.City}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{station["Store Name"]}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Station Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#005DAA] rounded-lg flex items-center justify-center">
                <img src="/costco-logo.svg" alt="Costco" className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Costco {station["Store Name"]}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <Link
                    to={`/state/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}/${station.City.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-sm text-gray-500 hover:text-blue-600"
                  >
                    <Building2 className="w-4 h-4 mr-1" />
                    {station.City}
                  </Link>
                  <Link
                    to={`/state/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-sm text-gray-500 hover:text-blue-600"
                  >
                    <Globe2 className="w-4 h-4 mr-1" />
                    {station["State Full"]}
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Regular</p>
                <p className="text-2xl font-bold text-green-600">{station.Regular}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Premium</p>
                <p className="text-2xl font-bold text-green-600">{station.Premium}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Diesel</p>
                <p className="text-2xl font-bold text-green-600">
                  {station.Diesel !== "NA" ? station.Diesel : "-"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{station.Address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{station.Phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Hours</p>
                  <p className="text-gray-600">{station.Hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Last Updated</p>
                  <p className="text-gray-600">{station["Last Updated"]}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Disclaimer</p>
                  <p className="text-gray-600 text-sm">{station.Disclaimer}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Price History</h2>
            <PriceChart station={station} />
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
            <div className="h-[400px]">
              <MapContainer
                center={[station.Latitude, station.Longitude]}
                zoom={14}
                className="w-full h-full rounded-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[station.Latitude, station.Longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">Costco {station["Store Name"]}</h3>
                      <p className="text-sm text-gray-600">{station.Address}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Stations */}
      {nearbyStations.length > 0 && (
        <div className="mt-8">
          <NearbyStations stations={nearbyStations} currentStation={station} />
        </div>
      )}
    </div>
  );
};

export default StationPage;