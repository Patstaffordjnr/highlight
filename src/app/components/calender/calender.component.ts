import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  calenderVisible: boolean = false;

  currentDateTimeYear: Date = new Date();
  day: string = this.currentDateTimeYear.toLocaleString('default', { weekday: 'long' });
  month: string = this.currentDateTimeYear.toLocaleString('default', { month: 'long' });
  year: number = this.currentDateTimeYear.getFullYear();

  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]  

  selectedDay: number;
  selectedDayBlack: number
  selectedDayMonthOnCalendar: string;
  selectedDayOnCalendar: Date;

  dayNumber: number = this.currentDateTimeYear.getDate()
  monthNumber: number = this.currentDateTimeYear.getMonth() +1;
  yearNumber = Number(this.year);
  monthDays = [];
  calenderFirstDayOfMonth = new Date( this.yearNumber, this.monthNumber -1, this.dayNumber);
  calenderTime = this.currentDateTimeYear.toLocaleTimeString();

  
  @Output() selectDateEvent = new EventEmitter<Date>();
  @Input() selectedDate: Date;

  constructor() {
    
    let firstDay = new Date(this.currentDateTimeYear.getFullYear(), this.currentDateTimeYear.getMonth(), 1).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);;

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
    if(this.selectedDate) {
      this.componentInputDay(this.selectedDate);
    }
      
  }

  async componentInputDay(selectedDate: Date) {

    this.currentDateTimeYear = selectedDate;
    this.day = selectedDate.toLocaleString('default', { weekday: 'long' });
    this.month = selectedDate.toLocaleString('default', { month: 'long' });
    this.year = selectedDate.getFullYear();

    let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth()).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
    let inputDateMonth = monthNames[selectedDate?.getMonth()];
    const month = selectedDate.getMonth();
    let year = selectedDate.getFullYear();
    const lastDay = new Date(year, month + 1, 0);
    let monthDays = lastDay.getDate();

    this.selectedDay = selectedDate.getDate();
    this.selectedDayBlack = selectedDate.getDate();

    this.selectedDayMonthOnCalendar = inputDateMonth;
    this.selectedDayOnCalendar = selectedDate;

    this.dayNumber = selectedDate.getDate();
    this.monthNumber = selectedDate.getMonth() + 1;
    this.yearNumber = selectedDate.getFullYear();

    this.calenderFirstDayOfMonth
    this.calenderTime

    this.monthDays.length = 0;
    this.weekDays.map((day, i) => {
    if(day == firstDayOfMonth) {
      for(let x = 0; x < i; x++) {
        this.monthDays.push(null);
      }
    } 
  })

  for (let i = 1; i < monthDays + 1; i++) {
    this.monthDays.push(i);
   }

  }

  emitDay(selectedDate: Date) {
    this.selectDateEvent.emit(selectedDate);
    this.currentDateTimeYear = selectedDate;
    // console.log(selectedDate);
  }

  startGetNumberOfDays(month: number, year: number): number {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  getDayOfWeek(date: Date): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekIndex = date.getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return dayOfWeek;
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

this.selectedDay = undefined;
     if(this.selectedDayMonthOnCalendar === this.month) {
      console.log(`a`);
      this.selectedDay = this.selectedDayBlack;
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

     this.selectedDay = undefined;
     if(this.selectedDayMonthOnCalendar === this.month) {
     this.selectedDay = this.selectedDayBlack;
      return 
     }
  }

  updateCalendar(): void {
    this.day = this.currentDateTimeYear.toLocaleString('default', { weekday: 'long' });
    this.month = this.currentDateTimeYear.toLocaleString('default', { month: 'long' });
    this.year = this.currentDateTimeYear.getFullYear();
  }

daySelect(day: number) {
  this.selectedDay = day;
  let date = new Date(this.year, this.monthNumber - 1, day);
  this.emitDay(date); 
  this.selectedDayBlack = day;
  this.selectedDayOnCalendar
  this.selectedDayOnCalendar = date
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
  let selectedDayMonth = monthNames[date.getMonth()];
  this.selectedDayMonthOnCalendar = selectedDayMonth;

  }

}
