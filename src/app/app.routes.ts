// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { CityFormPage } from './pages/city-form/city-form.page';
import { WeatherPage } from './pages/weather/weather.page';
import { TripFormPage } from './pages/trip-form/trip-form.page';
import { TripsListPage } from './pages/trips-list/trips-list.page';
import { TripDetailPage } from './pages/trip-detail/trip-detail.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'city-form', component: CityFormPage },
  { path: 'city-form/:id', component: CityFormPage },
  { path: 'weather/:id', component: WeatherPage },
  { path: 'trip-form', component: TripFormPage },
  { path: 'trip-form/:id', component: TripFormPage },
  { path: 'trips-list', component: TripsListPage },
  { path: 'trip-detail/:id', component: TripDetailPage }
];