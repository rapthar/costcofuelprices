import React from 'react';
import { MapPin, Phone, Clock, Calendar, Info } from 'lucide-react';
import { StationData } from '../../types';

interface StationDetailsProps {
  station: StationData;
}

const StationDetails: React.FC<StationDetailsProps> = ({ station }) => {
  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
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
          <p className="text-gray-600">{formatDate()}</p>
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
  );
};

export default StationDetails;