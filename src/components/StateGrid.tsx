import React from 'react';
import { stations } from '../data/stations';
import { stateAbbreviations } from '../utils/states';
import StateCard from './StateCard';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida',
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'Wisconsin'
];

const StateGrid = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gray-50" />
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Find Costco Gas Prices By State
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Find the most competitive Costco fuel prices in your state and save money while fueling your vehicle
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {states.map((state) => {
              const stateStations = stations.filter(s => s["State Full"] === state);
              const abbr = stateAbbreviations[state];
              const lowestPrice = stateStations.length > 0 
                ? Math.min(...stateStations
                    .map(s => parseFloat(s.Regular.replace('$', '')))
                    .filter(price => !isNaN(price)))
                : null;
              
              return (
                <StateCard
                  key={state}
                  state={state}
                  abbr={abbr}
                  stations={stateStations}
                  lowestPrice={lowestPrice}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StateGrid;