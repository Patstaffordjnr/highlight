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
  nullDays = [];
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

  constructor() {

    this.calenderFirstDayOfMonth = new Date(this.yearNumber, this.monthNumber , this.dayNumber);
    // console.log(this.calenderFirstDayOfMonth);
    let monthsFirstDay = this.calenderFirstDayOfMonth.toLocaleString('en-US', { weekday: 'long' }).substring(0,3);
    
    
    for(let day of this.weekDays) 
    { 
      if(day == monthsFirstDay) {
         console.log(`${day}`)
      } else {
        this.monthDays.push(null);
        console.log("NULL")

      }

      // for(let day of this.weekDays) 
      // { 
      //   if(day == monthsFirstDay) {
      //      console.log(`${day}`)
      //   } else {
      //     this.monthDays.push(null);
      //     console.log("NULL")
  
      //   }
  

    }

    let startingNumberOfDays = this.startGetNumberOfDays(this.monthNumber, this.year);
    for (let i = 0; i < startingNumberOfDays; i++) {
      this.monthDays.push(i + 1);
    }
    
  }

  ngOnInit(): void {

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

    this.calenderFirstDayOfMonth = new Date(this.yearNumber, this.monthNumber - 1, 1);

    for (let i = 1; i < nextMonthDays + 1; i++) {
      this.monthDays.push(i);
     }
  // console.log(this.calenderFirstDayOfMonth.getDay());
  // console.log(this.calenderFirstDayOfMonth.toLocaleString('en-US', { weekday: 'long' }));
  }

  previousMonth(): void {
    this.currentDateTimeYear.setMonth(this.currentDateTimeYear.getMonth() - 1);
    this.updateCalendar();
    this.monthNumber = this.monthNumber - 1;
    this.monthDays.length = 0;
    let previousMonthDays = this.getNumberOfDays(this.monthNumber, this.year);

    this.calenderFirstDayOfMonth = new Date(this.yearNumber, this.monthNumber - 1, 1);
   
    for (let i = 1; i < previousMonthDays + 1; i++) {
      this.monthDays.push(i);
     }
     this.calenderFirstDayOfMonth = new Date(this.yearNumber, this.monthNumber - 1, 1);
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
   
   document.querySelector('.calender-div').classList.remove('hidden');
   console.log(this.calenderFirstDayOfMonth);
  }
  
}
