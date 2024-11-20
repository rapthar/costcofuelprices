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
    station => !isNaN(Number(station.Latitude)) && !isNaN(Number(station.Longitude))
  );

  // Calculate center based on valid stations or default to Ontario center
  const center = validStations.length > 0
    ? {
        lat: validStations.reduce((sum, station) => sum + Number(station.Latitude), 0) / validStations.length,
        lng: validStations.reduce((sum, station) => sum + Number(station.Longitude), 0) / validStations.length
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
          position={[Number(station.Latitude), Number(station.Longitude)]}
          icon={customIcon}
          eventHandlers={{
            click: () => onStationSelect(station)
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold mb-2">Costco {station["Store Name"]}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{station.Address}</p>
                </div>
                {station.Phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <p>{station.Phone}</p>
                  </div>
                )}
                {station.Hours && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="whitespace-pre-line">{station.Hours}</p>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;