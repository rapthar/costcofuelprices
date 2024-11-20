import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { StationData } from '../types';
import { MapPin, Phone, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  stations: StationData[];
  selectedStation: StationData | null;
  onStationSelect: (station: StationData) => void;
}

// Fix for default marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const Map: React.FC<MapProps> = ({ stations, selectedStation, onStationSelect }) => {
  // Filter out stations with invalid coordinates
  const validStations = stations.filter(
    station => !isNaN(station.Latitude) && !isNaN(station.Longitude)
  );

  // Calculate center based on valid stations or default to Ontario center
  const center = validStations.length > 0
    ? {
        lat: validStations.reduce((sum, station) => sum + station.Latitude, 0) / validStations.length,
        lng: validStations.reduce((sum, station) => sum + station.Longitude, 0) / validStations.length
      }
    : { lat: 51.2538, lng: -85.3232 }; // Ontario center
  
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={validStations.length > 0 ? 8 : 4}
      className="w-full h-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {validStations.map(station => (
        <Marker
          key={station.Title}
          position={[station.Latitude, station.Longitude]}
          icon={customIcon}
          eventHandlers={{
            click: () => onStationSelect(station)
          }}
        >
          <Popup>
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-lg mb-2">{station["Store Name"]}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <p>{station["Street Address"]}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>{station.Phone}</p>
                </div>
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <p>{station.Hours}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center p-1 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Regular</p>
                    <p className="font-semibold">{station.Regular}</p>
                  </div>
                  <div className="text-center p-1 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Premium</p>
                    <p className="font-semibold">{station.Premium}</p>
                  </div>
                  <div className="text-center p-1 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Diesel</p>
                    <p className="font-semibold">{station.Diesel !== "NA" ? station.Diesel : "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;