import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  currentDateTimeYear: Date = new Date();

  calenderVisible: boolean = false;
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]  

  selectedDay: number;
  selectedDayBlack: number
  selectedDayMonthOnCalender: string;
  selectedDayOnCalender: Date;

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
 
  
  @Output() selectDateEvent = new EventEmitter<Date>();
  @Input() selectedDate: Date;

  constructor() {
    
    const date = new Date();
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
    this.componentInputDay(this.selectedDate);

  }

  async componentInputDay(selectedDate: Date) {
    console.log(selectedDate);

    if(!selectedDate){
      return 
    }

  // let inputDate = selectedDate;
  // this.selectedDayOnCalender = inputDate;
  // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
  // let inputDateMonth = monthNames[inputDate?.getMonth()];
  // this.month = inputDateMonth;
  // this.selectedDayMonthOnCalender = inputDateMonth;
  // this.selectedDayBlack = Number(inputDate?.getDate());
  // let day = Number(inputDate?.getDate());
  // this.daySelect(day) ;

  // let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth()).toLocaleString('en-US', { weekday: 'long' }).substring(0,3);
  // console.log(firstDayOfMonth);
  // console.log(inputDateMonth);
  
  // const month = inputDate.getMonth();
  // let year = inputDate.getFullYear();
  // const lastDay = new Date(year, month + 1, 0);
  // let monthDays = lastDay.getDate();  
  // console.log(`Number of days in ${inputDateMonth}: ${monthDays}`);

  // this.monthDays.length = 0;
  // this.weekDays.map((day, i) => {
  //   if(day == firstDayOfMonth) {
  //     for(let x = 0; x < i; x++) {
  //       this.monthDays.push(null);
  //     }
  //   } 
  // })

  // for (let i = 1; i < monthDays + 1; i++) {
  //   this.monthDays.push(i);
  //  }



  // this.startDate = inputDate;
  // this.selectedDay = inputDate.getDay();
  // this.selectedDayBlack = inputDate.getDay();
  // this.selectedDayOnCalender = inputDate;


  // selectedDayMonthOnCalender: string;
  // calenderVisible: boolean = false;
  // weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]  
  // currentDateTimeYear: Date = new Date();
  // day: string = this.currentDateTimeYear.toLocaleString('default', { weekday: 'long' });
  // dayNumber: number = this.currentDateTimeYear.getDate()
  // month: string = this.currentDateTimeYear.toLocaleString('default', { month: 'long' });
  // monthNumber: number = this.currentDateTimeYear.getMonth() +1;
  // year: number = this.currentDateTimeYear.getFullYear();
  // yearNumber = Number(this.year);
  // monthDays = [];
  // calenderFirstDayOfMonth = new Date( this.yearNumber, this.monthNumber -1, this.dayNumber);
  // calenderTime = this.currentDateTimeYear.toLocaleTimeString();
  // currentTime: string;





  }

  emitDay(selectedDate: Date) {
    this.selectDateEvent.emit(selectedDate);
    // console.log(selectedDate);
  }

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
     if(this.selectedDayMonthOnCalender === this.month) {
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

     this.selectedDay = undefined;4
     if(this.selectedDayMonthOnCalender === this.month) {
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
    let selectedDayTo = new Date( this.yearNumber, this.monthNumber- 1, day);
    this.selectedDay = day;
    this.selectedDayOnCalender = selectedDayTo;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
    let selectedDayMonth = monthNames[selectedDayTo.getMonth()];
    this.selectedDayMonthOnCalender = selectedDayMonth;
    this.selectedDayBlack = day;
    this.emitDay(selectedDayTo);
  }

}
