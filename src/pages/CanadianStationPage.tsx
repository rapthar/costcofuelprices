import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Phone, Clock, Calendar, Info, ChevronRight, Building2, Globe2 } from 'lucide-react';
import { canadaStations } from '../data';
import PriceChart from '../components/PriceChart';
import NearbyStations from '../components/NearbyStations';
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

const CanadianStationPage = () => {
  const { id } = useParams();

  const getStationId = (station: any) => {
    const citySlug = station.City.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const addressSlug = station.Address.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${citySlug}-${addressSlug}`;
  };

  // Find station from Canadian stations data
  const station = canadaStations[0].find(s => getStationId(s) === id);

  usePageTitle(
    station 
      ? `Costco - ${station.Address} - ${station.City}, ${station["State Full"]}`
      : 'Station Not Found - CostcoFuelPrices.com',
    station
      ? `Current gas prices at Costco ${station["Store Name"]} located at ${station.Address}, ${station.City}, ${station["State Full"]}. Find the latest fuel costs and station information.`
      : 'The requested Costco gas station could not be found.'
  );

  if (!station) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Station Not Found</h1>
          <p className="text-gray-600 mb-8">The requested Costco gas station could not be found.</p>
          <Link
            to="/canada-gas-stations"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Canadian Stations
          </Link>
        </div>
      </div>
    );
  }

  // Find nearby stations (within 50 miles)
  const nearbyStations = canadaStations[0].filter(s => {
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
    return formatCADPrice(parseFloat(price));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/canada-gas-stations" className="hover:text-gray-700">
          Canada Gas Stations
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link 
          to={`/canada/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}`} 
          className="hover:text-gray-700"
        >
          {station["State Full"]}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{station.City}</span>
      </div>

      {/* Station Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Costco Gas Station - {station.City}
            </h1>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">{station.Address}</div>
                  <div className="text-gray-500">{station.City}, {station["State Full"]}</div>
                </div>
              </div>

              {station.Phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <a href={`tel:${station.Phone}`} className="text-gray-900 hover:text-blue-600">
                    {station.Phone}
                  </a>
                </div>
              )}

              {station.Hours && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Hours</div>
                    <div className="text-gray-600 whitespace-pre-line">{station.Hours}</div>
                  </div>
                </div>
              )}

              {station.Web && (
                <div className="flex items-center gap-3">
                  <Globe2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <a 
                    href={station.Web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View Warehouse Details
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Fuel Prices</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Regular Unleaded</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(station["Regular Gas Price"])}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Premium Unleaded</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(station["Premium Gas Price"])}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Diesel</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(station["Diesel Price"])}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[station.Latitude, station.Longitude]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
              position={[station.Latitude, station.Longitude]}
              icon={customIcon}
            >
              <Popup>
                <div className="font-medium">Costco Gas Station</div>
                <div className="text-sm text-gray-500">{station.Address}</div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Price History */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Price History</h2>
        <PriceChart station={station} />
      </div>

      {/* Nearby Stations */}
      {nearbyStations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nearby Stations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyStations.map((nearbyStation, index) => (
              <Link
                key={index}
                to={`/station/${getStationId(nearbyStation)}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900 mb-1">
                  {nearbyStation.City}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {nearbyStation.Address}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Regular: </span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(nearbyStation["Regular Gas Price"])}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CanadianStationPage;
