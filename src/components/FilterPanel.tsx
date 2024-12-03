import React from 'react';
import { Sliders } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    fuelType: string;
    maxPrice: number;
    maxDistance: number;
  };
  onChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const handleFuelTypeChange = (value: string) => {
    onChange({ ...filters, fuelType: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filters.fuelType === 'Regular'
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleFuelTypeChange('Regular')}
        >
          Regular
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filters.fuelType === 'Premium'
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleFuelTypeChange('Premium')}
        >
          Premium
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filters.fuelType === 'Diesel'
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleFuelTypeChange('Diesel')}
        >
          Diesel
        </button>
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
          onChange={(e) => onChange({ ...filters, maxPrice: parseFloat(e.target.value) })}
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
          onChange={(e) => onChange({ ...filters, maxDistance: parseInt(e.target.value) })}
          className="mt-1 w-full"
        />
      </div>
    </div>
  );
};

export default FilterPanel;