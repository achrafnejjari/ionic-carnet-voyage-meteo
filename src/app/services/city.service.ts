import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({ providedIn: 'root' })
export class CityService {

  private cities: City[] = [];

  constructor() {
    const saved = localStorage.getItem('cities');
    if (saved) this.cities = JSON.parse(saved);
  }

  private save() {
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  getCities(): City[] {
    return this.cities;
  }

  getCityById(id: number): City | undefined {
    return this.cities.find(c => c.id === id);
  }

  addCity(city: City) {
    this.cities.push(city);
    this.save();
  }

  updateCity(city: City) {
    const index = this.cities.findIndex(c => c.id === city.id);
    if (index > -1) {
      this.cities[index] = city;
      this.save();
    }
  }

  deleteCity(id: number) {
    this.cities = this.cities.filter(c => c.id !== id);
    this.save();
  }
}
