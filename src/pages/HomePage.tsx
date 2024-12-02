import React from 'react';
import Hero from '../components/Hero';
import NationalAverage from '../components/NationalAverage';
import StateGridSection from '../components/StateGridSection';
import ProvinceGridSection from '../components/ProvinceGridSection';
import { usePageTitle } from '../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle(
    'Costco Gas Prices - Find the Best Fuel Prices at Costco Gas Stations',
    'Find real-time Costco gas prices, compare fuel costs, and locate the nearest Costco gas station. Save money on your next fill-up with our comprehensive price tracking.'
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
      </div>
      
      <NationalAverage />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StateGridSection />
        <ProvinceGridSection />
      </div>
    </div>
  );
};

export default HomePage;