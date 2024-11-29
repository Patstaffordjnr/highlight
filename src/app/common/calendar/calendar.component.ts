import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

  @Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
  })

  export class CalendarComponent implements OnInit {
    
    calendarMonths: Date[] = [];
    calendarMonthDaysArr: number[] = [];
    userDate: Date = new Date();
    weekDays: string[][] = []; 
    currentDate: Date = new Date();

    allDates: Map<string, boolean> = new Map();
    temp = false;
  
    selectedDayOnCalendar: Date = new Date;
    selectedDay = Number(this.selectedDayOnCalendar.getDate());
  
    selectedStartDate: Date | null = null;
    selectedEndDate: Date | null = null;

    @Output() selectDateEvent = new EventEmitter<Date>();
    @Input() selectedDate: Date;

    constructor() {
      this.initializeCalendar();
      // this.selectedStartDate = new Date(); 
      // this.selectedEndDate = new Date(
      //   this.selectedStartDate.getFullYear(),
      //   this.selectedStartDate.getMonth(),
      //   (this.selectedStartDate.getDate() + 7) - 1);

      // this.daySelect(this.userDate.getFullYear(), this.userDate.getMonth(), this.userDate.getDate());
    }
    
    ngOnInit(): void {
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
        this.weekDaysList(i);
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

      // const diffToStart = Math.abs(selectedFromCalendar.getTime() - this.selectedStartDate.getTime());
      // const diffToEnd = Math.abs(selectedFromCalendar.getTime() - this.selectedEndDate.getTime());
    
      // if (diffToStart < diffToEnd) {
      //   this.allDates.forEach((_, key) => {
      //     this.allDates.set(key, false);
      //   });
      //   console.log("Closer to Start Date");
      //   this.selectedStartDate = selectedFromCalendar;
      // } else if (diffToEnd < diffToStart) {
      //   this.allDates.forEach((_, key) => {
      //     this.allDates.set(key, false);
      //   });
      //   this.selectedEndDate = selectedFromCalendar;
      //   console.log("Closer to End Date");
      // } else {
      //   this.allDates.forEach((_, key) => {
      //     this.allDates.set(key, false);
      //   });
      //   console.log("Equidistant from both dates");
      // }
    
  //     const startDateYear = this.selectedStartDate?.getFullYear() ?? year;
  //     const startDateMonth = this.selectedStartDate?.getMonth() ?? month;
  //     const startDateDay = this.selectedStartDate?.getDate() ?? day; 
  //     const finishDateYear = this.selectedEndDate?.getFullYear() ?? year;
  //     const finishDateMonth = this.selectedEndDate?.getMonth() ?? month;
  //     const finishDateDay = this.selectedEndDate?.getDate() ?? day;

  //     const startKey = this.generateKey(startDateYear, startDateMonth, startDateDay);
  //     const finishKey = this.generateKey(finishDateYear, finishDateMonth, finishDateDay);
  //     const key = this.generateKey(year, month, day);
  //     let arr = [startKey, key, finishKey];

  //   this.allDates.forEach((dayElement, i) => {
  //       const [year, month, day] = i.split('_').map(Number);
  //       let dayOfDays = new Date(year, month - 1, day);
  //       this.allDates.set(key, true);
  //       this.allDates.set(startKey, true);
  //       this.allDates.set(finishKey, true);

  //       if (dayOfDays.getTime() >= this.selectedStartDate.getTime() && dayOfDays.getTime() <= this.selectedEndDate.getTime()) {
  //         let selectedDates = this.generateKey(dayOfDays.getFullYear(), dayOfDays.getMonth(), dayOfDays.getDate());
  //         this.allDates.set(selectedDates, true);
  //       }
  //  });

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

isStartDate(year: number, month: number, day: number): boolean {
    if (!this.selectedStartDate) return false;
    return (
      this.selectedStartDate.getFullYear() === year &&
      this.selectedStartDate.getMonth() === month &&
      this.selectedStartDate.getDate() === day
    );
  }
  
isEndDate(year: number, month: number, day: number): boolean {
    if (!this.selectedEndDate) return false;
    return (
      this.selectedEndDate.getFullYear() === year &&
      this.selectedEndDate.getMonth() === month &&
      this.selectedEndDate.getDate() === day
    );
  }

  weekDaysList(i){
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