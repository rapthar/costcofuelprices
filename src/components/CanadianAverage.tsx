import React from 'react';
import { canadaStations } from '../data';
import { formatCADPrice } from '../utils/currency';

const CanadianAverage = () => {
  const averagePrice = React.useMemo(() => {
    const prices = canadaStations[0]
      .map(station => station['Regular'])
      .filter(price => price !== 'NA' && !isNaN(parseFloat(price)));
    
    if (prices.length === 0) return null;
    
    const sum = prices.reduce((acc, price) => acc + parseFloat(price), 0);
    return sum / prices.length;
  }, []);

  if (averagePrice === null) return null;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Canadian National Average
          </h2>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-blue-600">
              {formatCADPrice(averagePrice)}
            </div>
            <div className="text-gray-500">per litre</div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Average price across all Costco locations in Canada
          </p>
        </div>
      </div>
    </div>
  );
};

export default CanadianAverage;
