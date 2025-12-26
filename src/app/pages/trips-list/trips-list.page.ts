// src/app/pages/trips-list/trips-list.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trips-list',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './trips-list.page.html',
  styleUrls: ['./trips-list.page.scss']
})
export class TripsListPage {
  trips: Trip[] = [];

  constructor(private tripService: TripService, private router: Router) {}

  ionViewWillEnter() {
    this.trips = this.tripService.getTrips();
  }

  goToNewTrip() {
    this.router.navigate(['/trip-form']);
  }

  goToTripDetail(id: number) {
    this.router.navigate(['/trip-detail', id]);
  }

  deleteTrip(id: number) {
    this.tripService.deleteTrip(id);
    this.ionViewWillEnter();
  }
}