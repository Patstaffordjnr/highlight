import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Calendar } from './calendar';
import { CALENDARPAGES } from './calendar-pages';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calenderVisible: boolean = false;

  userCurrentDateTimeYear: Date = new Date();
  userDay: string = this.userCurrentDateTimeYear.toLocaleString('default', { weekday: 'long' });
  userMonth: string = this.userCurrentDateTimeYear.toLocaleString('default', { month: 'long' });
  userYear: number = this.userCurrentDateTimeYear.getFullYear();
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] 
  
  monthDays = [];

  userDayNumber: number = this.userCurrentDateTimeYear.getDate()
  userMonthNumber: number = this.userCurrentDateTimeYear.getMonth() +1;
  userYearNumber = Number(this.userYear);

  calendarPages = CALENDARPAGES;
  calendarMonths = [];

  calendarMonthDaysArr = []


  constructor() {
    
   this.calendarPages.map((month)=> {
    let twelveMonthsAhead: Date = new Date(this.userYear, this.userMonthNumber + month.id - 1, this.userDayNumber, this.userCurrentDateTimeYear.getHours(),
    this.userCurrentDateTimeYear.getMinutes(), this.userCurrentDateTimeYear.getSeconds());
    this.calendarMonths.push(twelveMonthsAhead);

    let currentDate: Date = new Date(this.userYear, this.userMonthNumber + month.id, this.userDayNumber, this.userCurrentDateTimeYear.getHours(),
    this.userCurrentDateTimeYear.getMinutes(), this.userCurrentDateTimeYear.getSeconds());


    let calendarYears = currentDate.getFullYear()
    let calendarMonths =currentDate.getMonth()

    let startingNumberOfDays = this.getNumberOfDays(calendarMonths, calendarYears);
    this.calendarMonthDaysArr.push(startingNumberOfDays);



    
  });

    console.log(this.calendarMonthDaysArr);



    

let startingNumberOfDays = this.getNumberOfDays(this.userMonthNumber, this.userYear);

    for (let i = 0; i < startingNumberOfDays; i++) {
      this.monthDays.push(i + 1);
    }
    console.log(this.monthDays);
  }

  ngOnInit(): void {

  }

  monthSelect(month: Date) {
    console.log(month);

  };

  getNumberOfDays(month: number, year: number): number {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }

  daySelect(day: number) {
    if(day == 31) {
      console.log(`31`);
      
    } console.log(day);

}


}
















// userCurrentDateTimeYear: Date = new Date();
// userDay: string = this.userCurrentDateTimeYear.toLocaleString('default', { weekday: 'long' });
// userMonth: string = this.userCurrentDateTimeYear.toLocaleString('default', { month: 'long' });
// userYear: number = this.userCurrentDateTimeYear.getFullYear();
// weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] 

// monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// userDayNumber: number = this.userCurrentDateTimeYear.getDate()
// userMonthNumber: number = this.userCurrentDateTimeYear.getMonth() +1;
// userYearNumber = Number(this.userYear);

// calendarPages = CALENDARPAGES;
// calendarMonths = [];

// calendarMonthDaysArr = []


// constructor() {
  
//  this.calendarPages.map((month)=> {
//   let twelveMonthsAhead: Date = new Date(this.userYear, this.userMonthNumber + month.id, this.userDayNumber, this.userCurrentDateTimeYear.getHours(),
//   this.userCurrentDateTimeYear.getMinutes(), this.userCurrentDateTimeYear.getSeconds());
//   this.calendarMonths.push(twelveMonthsAhead);

//   let currentDate: Date = new Date(this.userYear, this.userMonthNumber + month.id, this.userDayNumber, this.userCurrentDateTimeYear.getHours(),
//   this.userCurrentDateTimeYear.getMinutes(), this.userCurrentDateTimeYear.getSeconds());


//   let calendarYears = currentDate.getFullYear()
//   let calendarMonths =currentDate.getMonth()

//   let startingNumberOfDays = this.getNumberOfDays(calendarMonths, calendarYears);
//   this.calendarMonthDaysArr.push(startingNumberOfDays);

// });

// let startingNumberOfDays = this.getNumberOfDays(this.userMonthNumber, this.userYear);

//   for (let i = 0; i < startingNumberOfDays; i++) {
//     this.monthDays.push(i + 1);
//   }
// }

// ngOnInit(): void {
//   this.adjustLeapYearDays(this.userYearNumber);

// }







    //   this.selectedDay = day;
    //   let date = new Date(this.year, this.monthNumber - 1, day, this.currentDateTimeYear.getHours(),
    //   this.currentDateTimeYear.getMinutes(), 
    //   this.currentDateTimeYear.getSeconds());
    //   this.currentDateTimeYear = date;
    //   this.emitDay(date); 
    //   this.selectedDayBlack = day;
    //   this.selectedDayOnCalendar
    //   this.selectedDayOnCalendar = date
    //   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
    //   let selectedDayMonth = monthNames[date.getMonth()];
    //   this.selectedDayMonthOnCalendar = selectedDayMonth;
    //   }

  

//   nextMonth(): void {
    
//     this.currentDateTimeYear.setMonth(this.currentDateTimeYear.getMonth() + 1);
//     this.updateCalendar();
//     this.monthNumber = this.monthNumber + 1;
//     this.monthDays.length = 0;
//     let nextMonthDays = this.getNumberOfDays(this.monthNumber, this.year)
//     let firstDayNextMonth = new Date(this.year, this.monthNumber - 1, 1).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);

//     this.weekDays.map((day, i) => {
//       if(day == firstDayNextMonth) {
//         for(let x = 0; x < i; x++) {
//           this.monthDays.push(null);
//         }
//       } 
//     })

//     for (let i = 1; i < nextMonthDays + 1; i++) {
//       this.monthDays.push(i);
//      }

//   this.selectedDay = undefined;
//      if(this.selectedDayMonthOnCalendar === this.month) {
//       console.log(`a`);
//       this.selectedDay = this.selectedDayBlack;
//      }
//   }

//   previousMonth(): void {
//     this.currentDateTimeYear.setMonth(this.currentDateTimeYear.getMonth() - 1);
//     this.updateCalendar();
//     this.monthNumber = this.monthNumber - 1;
//     this.monthDays.length = 0;
//     let previousMonthDays = this.getNumberOfDays(this.monthNumber, this.year);
//     let firstDayPreviousMonth = new Date(this.year, this.monthNumber - 1, 1).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);

//     this.weekDays.map((day, i) => {
//       if(day == firstDayPreviousMonth) {
//         for(let x = 0; x < i; x++) {
//           this.monthDays.push(null);
//         }
//       } 
//     })

//     for (let i = 1; i < previousMonthDays + 1; i++) {
//       this.monthDays.push(i);
//      }

//      this.selectedDay = undefined;
//      if(this.selectedDayMonthOnCalendar === this.month) {
//       console.log(`a`);
//      this.selectedDay = this.selectedDayBlack;
//      }
//   }

//   updateCalendar(): void {
//     this.day = this.currentDateTimeYear.toLocaleString('default', { weekday: 'long' });
//     this.month = this.currentDateTimeYear.toLocaleString('default', { month: 'long' });
//     this.year = this.currentDateTimeYear.getFullYear();
//   }

//   daySelect(day: number) {
// if(day == 31) {
//   console.log(`31`);
  
// }

//   this.selectedDay = day;
//   let date = new Date(this.year, this.monthNumber - 1, day, this.currentDateTimeYear.getHours(),
//   this.currentDateTimeYear.getMinutes(), 
//   this.currentDateTimeYear.getSeconds());
//   this.currentDateTimeYear = date;
//   this.emitDay(date); 
//   this.selectedDayBlack = day;
//   this.selectedDayOnCalendar
//   this.selectedDayOnCalendar = date
//   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
//   let selectedDayMonth = monthNames[date.getMonth()];
//   this.selectedDayMonthOnCalendar = selectedDayMonth;
  
