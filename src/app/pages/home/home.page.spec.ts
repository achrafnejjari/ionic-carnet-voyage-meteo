import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  cities: City[] = [];

  constructor(private cityService: CityService, private router: Router) {}

  ionViewWillEnter() {
    this.cities = this.cityService.getCities();
  }

  deleteCity(id: number) {
    this.cityService.deleteCity(id);
    this.cities = this.cityService.getCities();
  }

  goToWeather(city: City) {
    this.router.navigate(['/weather', city.id]);
  }

  goToEdit(city: City) {
    this.router.navigate(['/city-form', city.id]);
  }
}
