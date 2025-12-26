// src/app/pages/weather/weather.page.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city.service';
import { WeatherService } from '../../services/weather.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss']
})
export class WeatherPage {
  city?: City;
  current: any;
  forecast: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    private weatherService: WeatherService
  ) {}

  async ionViewWillEnter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.city = this.cityService.getCityById(id);

    if (this.city) {
      try {
        // Météo actuelle
        this.current = await this.weatherService.getCurrentWeather(this.city.lat, this.city.lon);

        // Prévisions 5 jours
        const data = await this.weatherService.getForecast(this.city.lat, this.city.lon);

        // Grouper par jour (un par jour, on prend midi approx ou premier)
        const daily: { [key: string]: any } = {};
        data.list.forEach((item: any) => {
          const date = item.dt_txt.split(' ')[0]; // YYYY-MM-DD
          if (!daily[date]) {
            daily[date] = item;
          }
        });

        this.forecast = Object.values(daily).slice(0, 5); // 5 premiers jours
      } catch (error) {
        console.error('Erreur météo', error);
      }
    }
  }
}