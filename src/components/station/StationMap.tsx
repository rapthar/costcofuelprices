import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { StationData } from '../../types';
import 'leaflet/dist/leaflet.css';

interface StationMapProps {
  station: StationData;
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const StationMap: React.FC<StationMapProps> = ({ station }) => {
  const position: [number, number] = [
    Number(station.Latitude),
    Number(station.Longitude)
  ];

  return (
    <div className="h-[400px]">
      <MapContainer
        center={position}
        zoom={13}
        className="w-full h-full rounded-lg"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-medium">{station["Store Name"]}</p>
              <p>{station.Address}</p>
              <p>{station.City}, {station["State Full"]}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StationMap;