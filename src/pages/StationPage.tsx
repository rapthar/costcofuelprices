import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Phone, Clock, Calendar, Info, ChevronRight, Building2, Globe2 } from 'lucide-react';
import { stations, canadaStations } from '../data';
import PriceChart from '../components/PriceChart';
import NearbyStations from '../components/NearbyStations';
import { stateAbbreviations } from '../utils/states';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatCADPrice } from '../utils/currency';
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

  // Determine if this is a Canadian station by checking the URL format
  const isCanada = window.location.pathname.startsWith('/station/canada/');

  const getStationId = (station: any) => {
    if (isCanada) {
      return `costco-gas-in-${station.City.toLowerCase()}-${station.Address.toLowerCase()}`.replace(/\s+/g, '-');
    }
    const streetAddress = station.Address.split(',')[0];
    return `costco-gas-in-${station.City.toLowerCase()}-${streetAddress.toLowerCase()}-${station.City.toLowerCase()}-${station["State Full"].toLowerCase()}-${station.Zipcode}`.replace(/\s+/g, '-');
  };

  // Find station based on ID format
  const station = isCanada 
    ? canadaStations[0].find(s => getStationId(s) === id)
    : stations.find(s => {
        const stationId = getStationId(s);
        return id === stationId;
      });

  usePageTitle(
    station 
      ? `Costco - ${station.Address} - ${station.City}, ${isCanada ? station["State Full"] : stateAbbreviations[station["State Full"]]}`
      : 'Station Not Found - CostcoFuelPrices.com',
    station
      ? `Current gas prices at Costco ${station["Store Name"]} located at ${station.Address}, ${station.City}, ${isCanada ? station["State Full"] : stateAbbreviations[station["State Full"]]}. Find the latest fuel costs and station information.`
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
  const allStations = isCanada ? canadaStations[0] : stations;
  const nearbyStations = allStations.filter(s => {
    if (getStationId(s) === getStationId(station)) return false;
    
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

  const formatPrice = (price: string) => {
    if (price === "NA" || !price) return "-";
    return isCanada ? formatCADPrice(parseFloat(price)) : price;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={isCanada ? "/canada-gas-stations" : "/us-gas-stations"} className="hover:text-gray-700">
          {isCanada ? "Canada" : "US"} Gas Stations
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/state/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gray-700">
          {station["State Full"]}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/state/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}/${station.City.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gray-700">
          {station.City}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{station["Store Name"]}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Costco Gas - {station["Store Name"]}
          </h1>
          <div className="flex items-center text-gray-500 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            <p>{station.Address}</p>
          </div>

          {/* Map */}
          <div className="w-full h-[400px] mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <MapContainer
              center={[station.Latitude, station.Longitude]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[station.Latitude, station.Longitude]} icon={customIcon}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">Costco {station["Store Name"]}</p>
                    <p>{station.Address}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Price History Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Price History</h2>
            <PriceChart stationId={station.Title} />
          </div>

          {/* Nearby Stations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Stations</h2>
            <NearbyStations stations={nearbyStations} />
          </div>
        </div>

        <div>
          {/* Current Prices */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Prices</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Regular</span>
                <span className="font-semibold text-green-600">{formatPrice(station.Regular)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Premium</span>
                <span className="font-semibold text-green-600">{formatPrice(station.Premium)}</span>
              </div>
              {station.Diesel !== "NA" && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Diesel</span>
                  <span className="font-semibold text-green-600">{formatPrice(station.Diesel)}</span>
                </div>
              )}
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Clock className="w-4 h-4 mr-1" />
                <span>Updated {station["Last Updated"]}</span>
              </div>
            </div>
          </div>

          {/* Station Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Station Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Building2 className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Store</h3>
                  <p className="text-gray-600">Costco {station["Store Name"]}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600">{station.Address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">{station.Phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Hours</h3>
                  <p className="text-gray-600 whitespace-pre-line">{station.Hours}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe2 className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Website</h3>
                  <a href={station.Web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    Visit Store Website
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Info className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Disclaimer</h3>
                  <p className="text-gray-600 text-sm">{station.Disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationPage;