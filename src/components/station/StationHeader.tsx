import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Globe2 } from 'lucide-react';
import { StationData } from '../../types';
import { stateAbbreviations } from '../../utils/states';

interface StationHeaderProps {
  station: StationData;
  isCanada: boolean;
}

const StationHeader: React.FC<StationHeaderProps> = ({ station, isCanada }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-[#005DAA] rounded-lg flex items-center justify-center">
        <img src="/costco-logo.svg" alt="Costco" className="w-12 h-12" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Costco {station["Store Name"]}</h1>
        <div className="flex items-center gap-4 mt-1">
          <Link
            to={`/${isCanada ? 'canada' : 'state'}/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}/${station.City.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center text-sm text-gray-500 hover:text-blue-600"
          >
            <Building2 className="w-4 h-4 mr-1" />
            {station.City}
          </Link>
          <Link
            to={`/${isCanada ? 'canada' : 'state'}/${station["State Full"].toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center text-sm text-gray-500 hover:text-blue-600"
          >
            <Globe2 className="w-4 h-4 mr-1" />
            {isCanada ? station["State Full"] : stateAbbreviations[station["State Full"]]}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StationHeader;