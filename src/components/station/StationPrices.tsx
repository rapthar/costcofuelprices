import React from 'react';
import { StationData } from '../../types';
import { formatCADPrice } from '../../utils/currency';

interface StationPricesProps {
  station: StationData;
  isCanada: boolean;
}

const StationPrices: React.FC<StationPricesProps> = ({ station, isCanada }) => {
  const formatPrice = (price: string) => {
    return isCanada ? formatCADPrice(parseFloat(price)) : price;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Regular</p>
        <p className="text-2xl font-bold text-green-600">{formatPrice(station.Regular)}</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Premium</p>
        <p className="text-2xl font-bold text-green-600">{formatPrice(station.Premium)}</p>
      </div>
      {station.Diesel !== "NA" && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Diesel</p>
          <p className="text-2xl font-bold text-green-600">{formatPrice(station.Diesel)}</p>
        </div>
      )}
    </div>
  );
};

export default StationPrices;