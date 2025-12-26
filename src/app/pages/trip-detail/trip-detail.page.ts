// src/app/pages/trip-detail/trip-detail.page.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { Trip, TripStep } from '../../models/trip.model';

interface DayNote {
  date: string; // YYYY-MM-DD
  note: string;
}

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss']
})
export class TripDetailPage {
  trip?: Trip;
  days: DayNote[] = [];

  constructor(private route: ActivatedRoute, private tripService: TripService) {}

  ionViewWillEnter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trip = this.tripService.getTripById(id);
    if (this.trip) {
      this.generateDays();
      this.loadNotes();
    }
  }

  generateDays() {
    this.days = [];
    this.trip!.steps.forEach(step => {
      const start = new Date(step.startDate);
      const end = new Date(step.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        this.days.push({ date: dateStr, note: '' });
      }
    });
    // Trier par date
    this.days.sort((a, b) => a.date.localeCompare(b.date));
  }

  loadNotes() {
    const saved = localStorage.getItem(`trip-notes-${this.trip!.id}`);
    if (saved) {
      const notes = JSON.parse(saved);
      this.days = this.days.map(day => ({
        ...day,
        note: notes[day.date] || ''
      }));
    }
  }

  saveNotes() {
    const notesObj = this.days.reduce((acc, day) => {
      acc[day.date] = day.note;
      return acc;
    }, {} as any);
    localStorage.setItem(`trip-notes-${this.trip!.id}`, JSON.stringify(notesObj));
  }
}