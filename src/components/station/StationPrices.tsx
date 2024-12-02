import React from 'react';
import { StationData } from '../../types';
import { formatCADPrice } from '../../utils/currency';

interface StationPricesProps {
  station: StationData;
  isCanada: boolean;
}

const formatTimeAgo = (dateStr: string): string => {
  const now = new Date();
  const updated = new Date(dateStr);
  const diffInHours = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60));
    return `${diffInMinutes}m ago`;
  } else if (diffInHours === 1) {
    return '1h ago';
  } else if (diffInHours <= 6) {
    return `${diffInHours}h ago`;
  } else {
    return updated.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

const StationPrices: React.FC<StationPricesProps> = ({ station, isCanada }) => {
  const formatPrice = (price: string) => {
    if (!price || price === "NA" || price === "--") return "--";
    return isCanada ? formatCADPrice(parseFloat(price)) : price;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Regular</p>
        <p className="text-2xl font-bold text-green-600">{formatPrice(station.Regular)}</p>
        {station.Regular && station.Regular !== "NA" && station.Regular !== "--" && (
          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(station["Last Updated"])}</p>
        )}
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Premium</p>
        <p className="text-2xl font-bold text-green-600">{formatPrice(station.Premium)}</p>
        {station.Premium && station.Premium !== "NA" && station.Premium !== "--" && (
          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(station["Last Updated"])}</p>
        )}
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Diesel</p>
        <p className="text-2xl font-bold text-green-600">{formatPrice(station.Diesel)}</p>
        {station.Diesel && station.Diesel !== "NA" && station.Diesel !== "--" && (
          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(station["Last Updated"])}</p>
        )}
      </div>
    </div>
  );
};

export default StationPrices;