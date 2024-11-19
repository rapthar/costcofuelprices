import React from 'react';
import { usstations } from '../data/usstations';
import { canadastations } from '../data/canadastations';
import { stateAbbreviations } from '../utils/states';
import { TrendingUp, TrendingDown, GaugeCircle } from 'lucide-react';

const NationalAverage = () => {
  // Calculate national average for regular gas
  const validPrices = [...usstations, ...canadastations]
    .filter(station => station.Regular !== "NA")
    .map(station => parseFloat(station.Regular.replace('$', '')));

  const nationalAverage = validPrices.reduce((acc, price) => acc + price, 0) / validPrices.length;

  // Find highest and lowest prices
  const highestPrice = Math.max(...validPrices);
  const lowestPrice = Math.min(...validPrices);

  const highestStation = [...usstations, ...canadastations].find(
    station => station.Regular !== "NA" && 
    parseFloat(station.Regular.replace('$', '')) === highestPrice
  );

  const lowestStation = [...usstations, ...canadastations].find(
    station => station.Regular !== "NA" && 
    parseFloat(station.Regular.replace('$', '')) === lowestPrice
  );

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Costco National Gas Price Overview
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Current average prices and price ranges across all Costco locations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* National Average */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <GaugeCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">National Average</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${nationalAverage.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Regular unleaded gas
                </p>
              </div>
            </div>
          </div>

          {/* Highest Price */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Highest Price</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${highestPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {highestStation?.City}, {stateAbbreviations[highestStation?.["State Full"] || ""]}
                </p>
              </div>
            </div>
          </div>

          {/* Lowest Price */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Lowest Price</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${lowestPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {lowestStation?.City}, {stateAbbreviations[lowestStation?.["State Full"] || ""]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalAverage;