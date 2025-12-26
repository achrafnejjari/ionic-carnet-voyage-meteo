// src/app/pages/city-form/city-form.page.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { WeatherService } from '../../services/weather.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-city-form',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './city-form.page.html',
  styleUrls: ['./city-form.page.scss']
})
export class CityFormPage {
  cityName = '';
  results: any[] = [];
  editCityId: number | null = null;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const city = this.cityService.getCityById(+id);
      if (city) {
        this.cityName = `${city.name}, ${city.country}`;
        this.editCityId = city.id;
      }
    }
  }

  async onSearch(event: any) {
    const value = event.target.value.trim();
    if (value.length >= 2) {
      const data = await this.weatherService.searchCities(value);
      this.results = data;
    } else {
      this.results = [];
    }
  }

  selectCity(selected: any) {
    const newCity: City = {
      id: this.editCityId || Date.now(),
      name: selected.name,
      country: selected.country || selected.state || 'XX',
      lat: selected.lat,
      lon: selected.lon
    };

    if (this.editCityId) {
      this.cityService.updateCity(newCity);
    } else {
      this.cityService.addCity(newCity);
    }

    this.router.navigate(['/home']);
  }
}