

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeatherService {

  private apiKey = 'f18676ef24dc0a1a002fee2807e78b39'; // Remplace par ta clé OpenWeatherMap
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private currentUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  searchCities(query: string) {
    return fetch(`${this.geoUrl}?q=${query}&limit=5&appid=${this.apiKey}`)
      .then(res => res.json());
  }

  getCurrentWeather(lat: number, lon: number) {
    return fetch(`${this.currentUrl}?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`)
      .then(res => res.json());
  }

  getForecast(lat: number, lon: number) {
    return fetch(`${this.forecastUrl}?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`)
      .then(res => res.json());
  }
}