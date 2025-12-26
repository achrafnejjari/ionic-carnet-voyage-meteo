// src/app/pages/home/home.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city.service';
import { WeatherService } from '../../services/weather.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  cities: City[] = [];
  weatherPreviews: any = {};

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.cities = this.cityService.getCities();
    this.loadPreviews();
  }

  async loadPreviews() {
    this.weatherPreviews = {};
    for (let city of this.cities) {
      try {
        const data = await this.weatherService.getCurrentWeather(city.lat, city.lon);
        this.weatherPreviews[city.id] = data;
      } catch (e) {
        console.error('Erreur preview', e);
      }
    }
  }

  deleteCity(id: number) {
    this.cityService.deleteCity(id);
    this.ionViewWillEnter();
  }

  goToWeather(city: City) {
    this.router.navigate(['/weather', city.id]);
  }

  goToEdit(city: City) {
    this.router.navigate(['/city-form', city.id]);
  }

  goToSearch() {
    this.router.navigate(['/city-form']);
  }

  goToNewTrip() {
    this.router.navigate(['/trip-form']);
  }

  goToTripsList() {
    this.router.navigate(['/trips-list']);
  }
}