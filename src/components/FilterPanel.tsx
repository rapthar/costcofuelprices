import React from 'react';
import { Sliders } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    fuelType: string;
    maxPrice: number;
    maxDistance: number;
  };
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={filters.fuelType}
          onChange={(e) => onFilterChange({ ...filters, fuelType: e.target.value })}
        >
          <option value="Regular">Regular</option>
          <option value="Premium">Premium</option>
          <option value="Diesel">Diesel</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Price: ${filters.maxPrice.toFixed(2)}
        </label>
        <input
          type="range"
          min="2"
          max="6"
          step="0.1"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: parseFloat(e.target.value) })}
          className="mt-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Distance: {filters.maxDistance} miles
        </label>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={filters.maxDistance}
          onChange={(e) => onFilterChange({ ...filters, maxDistance: parseInt(e.target.value) })}
          className="mt-1 w-full"
        />
      </div>
    </div>
  );
};

export default FilterPanel;