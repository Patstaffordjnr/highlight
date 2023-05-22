import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gig-type-date',
  templateUrl: './gig-type-date.component.html',
  styleUrls: ['./gig-type-date.component.css']
})
export class GigTypeDateComponent implements OnInit {
  currentDate: Date;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][];
  showCalendar: boolean = false;
  selectedDay: number;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.generateCalendar();
  }

  onPress(): void {
    this.showCalendar = !this.showCalendar;
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    this.weeks = [];
    let week = [];
    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }
    for (let day = 1; day <= lastDate; day++) {
      week.push(day);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      this.weeks.push(week);
    }
  }

  selectDay(day: number): void {
    this.selectedDay = day;
    console.log("Selected day:", day);
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
}
