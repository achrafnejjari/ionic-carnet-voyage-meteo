import { City } from './city.model';

export interface TripStep {
  city: City;
  startDate: string; // format YYYY-MM-DD
  endDate: string;
}

export interface Trip {
  id: number;
  name: string;
  steps: TripStep[];
}