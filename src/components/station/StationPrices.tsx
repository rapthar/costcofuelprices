import React from 'react';
import { StationData } from '../../types';
import { formatCADPrice } from '../../utils/currency';

interface StationPricesProps {
  station: StationData;
  isCanada: boolean;
}

const formatTimeAgo = (dateStr: string, fuelType: 'Regular' | 'Premium' | 'Diesel'): string => {
  // For demo purposes, return fixed times for each fuel type
  switch (fuelType) {
    case 'Regular':
      return '4h ago';
    case 'Premium':
      return '6h ago';
    case 'Diesel':
      return '3h ago';
    default:
      return '4h ago';
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
          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(station["Last Updated"], 'Regular')}</p>
        )}
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Premium</p>
        <p className="text-2xl font-bold text-green-600">{formatPrice(station.Premium)}</p>
        {station.Premium && station.Premium !== "NA" && station.Premium !== "--" && (
          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(station["Last Updated"], 'Premium')}</p>
        )}
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Diesel</p>
        <p className="text-2xl font-bold text-green-600">{formatPrice(station.Diesel)}</p>
        {station.Diesel && station.Diesel !== "NA" && station.Diesel !== "--" && (
          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(station["Last Updated"], 'Diesel')}</p>
        )}
      </div>
    </div>
  );
};

export default StationPrices;