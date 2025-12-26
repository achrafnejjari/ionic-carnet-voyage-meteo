import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { TripService } from '../../services/trip.service';
import { Trip, TripStep } from '../../models/trip.model';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './trip-form.page.html',
  styleUrls: ['./trip-form.page.scss']
})
export class TripFormPage {
  trip: Trip = { id: Date.now(), name: '', steps: [] };
  cities: City[] = [];
  editMode = false;

  constructor(
    private tripService: TripService,
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.cities = this.cityService.getCities();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existing = this.tripService.getTripById(+id);
      if (existing) {
        this.trip = existing;
        this.editMode = true;
      }
    }
  }

  addStep() {
    if (this.cities.length > 0) {
      this.trip.steps.push({
        city: this.cities[0],
        startDate: '',
        endDate: ''
      });
    }
  }

  removeStep(index: number) {
    this.trip.steps.splice(index, 1);
  }

  saveTrip() {
    if (this.editMode) {
      this.tripService.updateTrip(this.trip);
    } else {
      this.tripService.addTrip(this.trip);
    }
    this.router.navigate(['/home']);
  }
}