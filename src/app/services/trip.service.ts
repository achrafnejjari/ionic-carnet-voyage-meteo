import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {

  private trips: Trip[] = [];

  constructor() {
    const saved = localStorage.getItem('trips');
    if (saved) this.trips = JSON.parse(saved);
  }

  private save() {
    localStorage.setItem('trips', JSON.stringify(this.trips));
  }

  getTrips(): Trip[] {
    return this.trips;
  }

  getTripById(id: number): Trip | undefined {
    return this.trips.find(t => t.id === id);
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    this.save();
  }

  updateTrip(trip: Trip) {
    const index = this.trips.findIndex(t => t.id === trip.id);
    if (index > -1) {
      this.trips[index] = trip;
      this.save();
    }
  }

  deleteTrip(id: number) {
    this.trips = this.trips.filter(t => t.id !== id);
    this.save();
  }
}