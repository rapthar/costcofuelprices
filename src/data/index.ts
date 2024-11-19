import { StationData } from '../types';
import { stations as usStations } from './usstations';
import { canadaStations } from './canadastations';

export const stations: StationData[] = [...usStations];
export { canadaStations };
