import { Component, OnInit, HostListener } from '@angular/core';
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
    weekDays: string[][] = []; 

    allDates: Map<string, boolean> = new Map();

    temp = false;
  
    selectedDayOnCalendar: Date = new Date;
    selectedDay = Number(this.selectedDayOnCalendar.getDate());
  
  
    selectedStartDate: Date | null = null;
    selectedEndDate: Date | null = null;
  
    constructor() {
      this.initializeCalendar();
      this.selectedStartDate = new Date(); 
      this.selectedEndDate = new Date(
        this.selectedStartDate.getFullYear(),
        this.selectedStartDate.getMonth(),
        (this.selectedStartDate.getDate() + 7) - 1);


      this.daySelect(this.userDate.getFullYear(), this.userDate.getMonth(), this.userDate.getDate());

    }
    
  
    ngOnInit(): void {
    }
  
    initializeCalendar(): void {
      CALENDARPAGES.forEach(month => {
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
        let noOfDaysAMonth = this.getNumberOfDays(futureDate.getMonth() + 1, futureDate.getFullYear())
        
          for (let i = 0; i < noOfDaysAMonth; i++) {
            // console.log (futureDate.getFullYear() + "_" + futureDate.getMonth() + "_" +(i + 1)); 
            this.allDates.set( this.generateKey(futureDate.getFullYear(),futureDate.getMonth(),(i + 1)), false);
            // console.log(this.generateKey(futureDate.getFullYear(),futureDate.getMonth(),(i + 1)));
          }

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
      });
  
    }
    
    getNumberOfDays(month: number, year: number): number {
      // Ensure the month is within 1-12
      return new Date(year, month, 0).getDate();
    }
    monthSelect(month: Date): void {
      // console.log(`Selected month: ${month}`);

    }
  
    daySelect(year: number, month: number, day: number): void {

    // Create a Date object for the selected date
    let selectedFromCalendar = new Date(year, month, day);
    this.selectedDayOnCalendar = selectedFromCalendar;

    // Normalize both dates to ignore time
    let normalizedSelected = new Date(
      selectedFromCalendar.getFullYear(),
      selectedFromCalendar.getMonth(),
      selectedFromCalendar.getDate()
    );
    let normalizedUserDate = new Date(
      this.userDate.getFullYear(),
      this.userDate.getMonth(),
      this.userDate.getDate()
    );


    let normalizedselectedStartDate = new Date(
      this.selectedStartDate.getFullYear(),
      this.selectedStartDate.getMonth(),
      this.selectedStartDate.getDate()
    );

    let normalizedselectedEndDate = new Date(
      this.selectedEndDate.getFullYear(),
      this.selectedEndDate.getMonth(),
      this.selectedEndDate.getDate()
    );



    // console.log(`Selected Date: ${normalizedSelected}`);
    // console.log(`User Date: ${normalizedUserDate}`);
    // console.log(`Selected Start Date: ${normalizedselectedStartDate}`);
    // console.log(`Selected End Date: ${normalizedselectedEndDate}`);


  
      const startDateYear = this.selectedStartDate?.getFullYear() ?? year;
      const startDateMonth = this.selectedStartDate?.getMonth() ?? month;
      const startDateDay = this.selectedStartDate?.getDate() ?? day; 
      const finishDateYear = this.selectedEndDate?.getFullYear() ?? year;
      const finishDateMonth = this.selectedEndDate?.getMonth() ?? month;
      const finishDateDay = this.selectedEndDate?.getDate() ?? day;
    
      const startKey = this.generateKey(startDateYear, startDateMonth, startDateDay);
      const finishKey = this.generateKey(finishDateYear, finishDateMonth, finishDateDay);
      const key = this.generateKey(year, month, day);
      let arr = [startKey, key, finishKey];



    // Compare the normalized dates
    if (normalizedSelected.getTime() === normalizedUserDate.getTime()) {
      console.log(`Dates are the same.`);
    } else if (normalizedSelected.getTime() > normalizedUserDate.getTime()) {
      
      console.log(`Selected date is after the user date.`);
    } else {
      console.log(`Selected date is before the user date.`);
      return
    }
  

      
      this.allDates.forEach((e, i) => {
        const [year, month, day] = i.split('_').map(Number);
        let dayOfDays = new Date(year, month - 1, day);
        this.allDates.set(key, true);
        this.allDates.set(startKey, true);
        this.allDates.set(finishKey, true);

        if (dayOfDays.getTime() >= this.selectedStartDate.getTime() && dayOfDays.getTime() <= this.selectedEndDate.getTime()) {
          let selectedDates = this.generateKey(dayOfDays.getFullYear(), dayOfDays.getMonth(), dayOfDays.getDate());
          this.allDates.set(selectedDates, true);
        }
    
        if (dayOfDays.getTime() < this.selectedStartDate.getTime()) {
          // console.log(`A`);
        }
    
        if (dayOfDays.getTime() > this.selectedEndDate.getTime()) {
          // console.log(`B`);
        }
      });
      
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
  }