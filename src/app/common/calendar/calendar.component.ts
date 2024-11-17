import { Component, OnInit } from '@angular/core';
import { Calendar } from './calendar';
import { CALENDARPAGES } from './calendar-pages';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarMonths: Date[] = [];
  calendarMonthDaysArr: number[] = [];
  userDate: Date = new Date();
  weekDays: string[][] = []; // Explicitly define as an array of string arrays

  constructor() {
    this.initializeCalendar();
  }

  ngOnInit(): void {}

  initializeCalendar(): void {
    CALENDARPAGES.forEach(month => {
      // Calculate the dates considering month overflow
      let futureDate = new Date(
        this.userDate.getFullYear(),
        this.userDate.getMonth() + month.id,
        this.userDate.getDate(),
        this.userDate.getHours(),
        this.userDate.getMinutes(),
        this.userDate.getSeconds()
      );
      
      this.calendarMonths.push(futureDate);
      this.calendarMonthDaysArr.push(this.getNumberOfDays(futureDate.getMonth() + 1, futureDate.getFullYear()));

      // console.log(`Month Calculated: ${futureDate}`);
      let weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let fDX = new Date(
        this.userDate.getFullYear(),
        this.userDate.getMonth() + month.id,
        this.userDate.getDate(),
        this.userDate.getHours(),
        this.userDate.getMinutes(),
        this.userDate.getSeconds()
      );

    fDX.setDate(1);
    let firstDayName = weekdayNames[fDX.getDay()];
    console.log(firstDayName);
    if (firstDayName == "Monday") {
      console.log(`Monday`);
      let week = ["M", "T", "W", "T", "F", "S", "S"];
      this.weekDays.push(week);
    } 
    else if (firstDayName == "Tuesday") {
      console.log(`Tuesday`);
      let week = ["T", "W", "T", "F", "S", "S", "M"];
      console.log(week);
      this.weekDays.push(week);
    } 
    else if (firstDayName == "Wednesday") {
      console.log(`Wednesday`);
      let week = ["W", "T", "F", "S", "S", "M", "T"];
      console.log(week);
      this.weekDays.push(week);
    } 
    else if (firstDayName == "Thursday") {
      console.log(`Thursday`);
      let week = ["T", "F", "S", "S", "M", "T", "W"];
      console.log(week);
      this.weekDays.push(week);

    } 
    else if (firstDayName == "Friday") {
      console.log(`Friday`);
      let week = ["F", "S", "S", "M", "T", "W", "T"];
      console.log(week);
      this.weekDays.push(week);
    } 
    else if (firstDayName == "Saturday") {
      console.log(`Saturday`);
      let week = ["S", "S", "M", "T", "W", "T", "F"];
      console.log(week);
      this.weekDays.push(week);
    } 
    else if (firstDayName == "Sunday") {
      console.log(`Sunday`);
      let week = ["S", "M", "T", "W", "T", "F", "S"];
      console.log(week);
      this.weekDays.push(week);
    }

    });

    console.log(this.weekDays);

  }


  getNumberOfDays(month: number, year: number): number {
    // Ensure the month is within 1-12
    return new Date(year, month, 0).getDate();
  }

  monthSelect(month: Date): void {
    console.log(`Selected month: ${month}`);
  }

  daySelect(day: number): void {
    console.log(`Selected day: ${day}`);
  }
}