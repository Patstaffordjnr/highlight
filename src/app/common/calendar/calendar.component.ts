import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

  @Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
  })

  export class CalendarComponent implements OnInit {

    @Input() selectedDate: Date;
    @Output() selectDateEvent = new EventEmitter<Date>();

    calendarMonths: Date[] = [];
    calendarMonthDaysArr: number[] = [];
    userDate: Date = new Date();
    weekDays: string[][] = []; 
    currentDate: Date = new Date();

    allDates: Map<string, boolean> = new Map();
    temp = false;
  
    selectedDayOnCalendar: Date = new Date;
    selectedDay = Number(this.selectedDayOnCalendar.getDate());
  
    constructor() {
      this.initializeCalendar();
        if (!this.selectedDate) {
    this.selectedDate = new Date();
  } else {
    this.selectedDayOnCalendar = this.selectedDate
  }
    }
    
    ngOnInit(): void {
      this.selectedDayOnCalendar = this.selectedDate
    }

    initializeCalendar(): void {
      for (let i = 0; i < 24; i++) {
          let monthOfLoop = new Date(
            this.userDate.getFullYear(),
            this.userDate.getMonth() + i,
            this.userDate.getDate(),
            this.userDate.getHours(),
            this.userDate.getMinutes(),
            this.userDate.getSeconds()
          )
        this.calendarMonths.push(monthOfLoop);
        this.calendarMonthDaysArr.push(this.getNumberOfDays(monthOfLoop.getMonth() + 1, monthOfLoop.getFullYear()));
        let noOfDaysAMonth = this.getNumberOfDays(monthOfLoop.getMonth() + 1, monthOfLoop.getFullYear())
        for (let i = 0; i < noOfDaysAMonth; i++) {
          this.allDates.set( this.generateKey(monthOfLoop.getFullYear(),monthOfLoop.getMonth(),(i + 1)), false);
        }
        this.weekDaysDisplayList(i);
  }
}
    
getNumberOfDays(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

monthSelect(month: Date): void {
}
  
daySelect(year: number, month: number, day: number): void {

    let selectedFromCalendar = new Date(year, month, day);
    let sFCX = new Date(selectedFromCalendar.getFullYear(), selectedFromCalendar.getMonth(), selectedFromCalendar.getDate(), 0, 0, 0);
    let cDX = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 0, 0, 0);

    if(sFCX.getTime() < cDX.getTime()) {
      console.log(`Before Today's date.`);
      return
    }
    this.selectedDayOnCalendar = selectedFromCalendar;
    this.emitDay(selectedFromCalendar)
}

emitDay(selectedDate: Date) {
  this.selectDateEvent.emit(selectedDate);
  this.userDate = selectedDate;
}

isSelected(year: number, month: number, day: number): boolean {
      return this.allDates.has(this.generateKey(year, month, day)) && this.allDates.get(this.generateKey(year, month, day)) === true;
    }

generateKey(year: number, month: number, day: number): string {
    return `${year}_${month}_${day}`
  }

isKeyDate(year: number, month: number, day: number): boolean {
    if (!this.selectedDayOnCalendar) return false;
    return (
      this.selectedDayOnCalendar.getFullYear() === year &&
      this.selectedDayOnCalendar.getMonth() === month &&
      this.selectedDayOnCalendar.getDate() === day
    );
  }

  weekDaysDisplayList(i){
    let weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let fDX = new Date(
      this.userDate.getFullYear(),
      this.userDate.getMonth() + i,
      this.userDate.getDate(),
      this.userDate.getHours(),
      this.userDate.getMinutes(),
      this.userDate.getSeconds()
    );
  
  fDX.setDate(1);
  let firstDayName = weekdayNames[fDX.getDay()];
  if (firstDayName == "Monday") {
    let week = ["M", "T", "W", "T", "F", "S", "S"];
    this.weekDays.push(week);
  } 
  else if (firstDayName == "Tuesday") {
    let week = ["T", "W", "T", "F", "S", "S", "M"];
    this.weekDays.push(week);
  } 
  else if (firstDayName == "Wednesday") {
    let week = ["W", "T", "F", "S", "S", "M", "T"];
    this.weekDays.push(week);
  } 
  else if (firstDayName == "Thursday") {
    let week = ["T", "F", "S", "S", "M", "T", "W"];
    this.weekDays.push(week);
  } 
  else if (firstDayName == "Friday") {
    let week = ["F", "S", "S", "M", "T", "W", "T"];
    this.weekDays.push(week);
  } 
  else if (firstDayName == "Saturday") {
    let week = ["S", "S", "M", "T", "W", "T", "F"];
    this.weekDays.push(week);
  } 
  else if (firstDayName == "Sunday") {
    let week = ["S", "M", "T", "W", "T", "F", "S"];
    this.weekDays.push(week);
  }
}

}