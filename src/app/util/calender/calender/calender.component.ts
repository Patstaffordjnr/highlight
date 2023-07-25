import { WeekDay } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @Input() inputDate: Date;
  showDialog: Boolean = false;

  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]  
  currentDateTimeYear: Date = new Date();
  day: string = this.currentDateTimeYear.toLocaleString('default', { weekday: 'long' });
  dayNumber: number = this.currentDateTimeYear.getDate()
  month: string = this.currentDateTimeYear.toLocaleString('default', { month: 'long' });
  monthNumber: number = this.currentDateTimeYear.getMonth() +1;
  year: number = this.currentDateTimeYear.getFullYear();
  yearNumber = Number(this.year);
  monthDays = [];
  calenderFirstDayOfMonth = new Date( this.yearNumber, this.monthNumber -1, this.dayNumber);

  calenderTime = this.currentDateTimeYear.toLocaleTimeString();
  currentTime: string;


  startGetNumberOfDays(month: number, year: number): number {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  updateTime() {
    const date = new Date();
    this.currentTime = date.toLocaleTimeString();
  }

  getDayOfWeek(date: Date): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekIndex = date.getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return dayOfWeek;
  }

  constructor() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);;

    this.weekDays.map((day, i) => {
      if(day == firstDay) {
        for(let x = 0; x < i; x++) {
          this.monthDays.push(null);
        }
      } 
    })

    let startingNumberOfDays = this.startGetNumberOfDays(this.monthNumber, this.year);
    for (let i = 0; i < startingNumberOfDays; i++) {
      this.monthDays.push(i + 1);
    }
  }

  ngOnInit(): void {

    this.updateTime();

  // Update the time every second
  setInterval(() => {
    this.updateTime();
  }, 1000);
  }

  getNumberOfDays(month: number, year: number): number {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  nextMonth(): void {
    
    this.currentDateTimeYear.setMonth(this.currentDateTimeYear.getMonth() + 1);
    this.updateCalendar();
    this.monthNumber = this.monthNumber + 1;
    this.monthDays.length = 0;
    let nextMonthDays = this.getNumberOfDays(this.monthNumber, this.year)
    let firstDayNextMonth = new Date(this.year, this.monthNumber - 1, 1).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);

    this.weekDays.map((day, i) => {
      if(day == firstDayNextMonth) {
        for(let x = 0; x < i; x++) {
          this.monthDays.push(null);
        }
      } 
    })

    for (let i = 1; i < nextMonthDays + 1; i++) {
      this.monthDays.push(i);
     }
  }

  previousMonth(): void {
    this.currentDateTimeYear.setMonth(this.currentDateTimeYear.getMonth() - 1);
    this.updateCalendar();
    this.monthNumber = this.monthNumber - 1;
    this.monthDays.length = 0;
    let previousMonthDays = this.getNumberOfDays(this.monthNumber, this.year);
    let firstDayPreviousMonth = new Date(this.year, this.monthNumber - 1, 1).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);

    this.weekDays.map((day, i) => {
      if(day == firstDayPreviousMonth) {
        for(let x = 0; x < i; x++) {
          this.monthDays.push(null);
        }
      } 
    })


    for (let i = 1; i < previousMonthDays + 1; i++) {
      this.monthDays.push(i);
     }
   
  }

  updateCalendar(): void {
    this.day = this.currentDateTimeYear.toLocaleString('default', { weekday: 'long' });
    this.month = this.currentDateTimeYear.toLocaleString('default', { month: 'long' });
    this.year = this.currentDateTimeYear.getFullYear();
  }

  daySelect(day: number) {
    let date = new Date();
    let selectedDayTo = new Date( this.yearNumber, this.monthNumber- 1, day);
    console.log(selectedDayTo);
    this.inputDate = selectedDayTo;


  }

  onPress(): void {
   this.showDialog = !this.showDialog
  
   document.querySelector('.calender-div').classList.remove('hidden');
  }
  
}
