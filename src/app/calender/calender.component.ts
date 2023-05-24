import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @Input() inputDate: Date;
  showDialog: Boolean = false;

  
  currentDateTimeYear: Date = new Date();
  day: string = this.currentDateTimeYear.toLocaleString('default', { weekday: 'long' });
  dayNumber: number = this.currentDateTimeYear.getDate()
  month: string = this.currentDateTimeYear.toLocaleString('default', { month: 'long' });
  monthNumber: number = this.currentDateTimeYear.getMonth() +1;
  year: number = this.currentDateTimeYear.getFullYear();
  monthDays = [];

  startGetNumberOfDays(month: number, year: number): number {
    // The month argument is 0-based (0 for January, 1 for February, etc.)
    // To handle 1-based month input, subtract 1 from the month value
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }



  constructor() {

    let startingNumberOfDays = this.startGetNumberOfDays(this.monthNumber, this.year);
     for (let i = 1; i < startingNumberOfDays + 1; i++) {
     this.monthDays.push(i);
    }
   }

  ngOnInit(): void {

  }

  getNumberOfDays(month: number, year: number): number {
    // The month argument is 0-based (0 for January, 1 for February, etc.)
    // To handle 1-based month input, subtract 1 from the month value
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  nextMonth(): void {
    this.currentDateTimeYear.setMonth(this.currentDateTimeYear.getMonth() + 1);
    this.updateCalendar();
    this.monthNumber = this.monthNumber + 1;
    this.monthDays.length = 0;
    let nextMonthDays = this.getNumberOfDays(this.monthNumber, this.year)
    for (let i = 1; i < nextMonthDays + 1; i++) {
      this.monthDays.push(i);
     }
  }

  previousMonth(): void {
    this.currentDateTimeYear.setMonth(this.currentDateTimeYear.getMonth() - 1);
    this.updateCalendar();
    this.monthNumber = this.monthNumber - 1;
    this.monthDays.length = 0;
    let previousMonthDays = this.getNumberOfDays(this.monthNumber, this.year)
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
    console.log(day);
  }

  onPress(): void {
   this.showDialog = !this.showDialog
  }

}
