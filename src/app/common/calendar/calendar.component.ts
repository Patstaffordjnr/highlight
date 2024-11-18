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
    weekDays: string[][] = []; 
  
    selectedDayOnCalendar: Date = new Date;
    selectedDay = this.selectedDayOnCalendar.getDate();
  
  
    selectedStartDate: Date | null = null;
    selectedEndDate: Date | null = null;
  
    constructor() {
      this.initializeCalendar();
      if (this.selectedStartDate) {
        this.selectedEndDate = new Date(
          this.selectedStartDate.getFullYear(),
          this.selectedStartDate.getMonth(),
          this.selectedStartDate.getDate() + 15
        );
      } else {
        // Optionally, set a default selectedStartDate if it's null
        this.selectedStartDate = new Date(); // For example, set it to today's date
        this.selectedEndDate = new Date(
          this.selectedStartDate.getFullYear(),
          this.selectedStartDate.getMonth(),
          this.selectedStartDate.getDate() + 15
        );
      }
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
  

    daySelect(day: number) {
      console.log(day);
    }

    // daySelect(day: number, month: number): void {
    //   let selectedMonth = this.calendarMonths[month].getMonth();
    //   let selectedYear = this.calendarMonths[month].getFullYear();
    
    //   this.selectedDayOnCalendar = new Date(selectedYear, selectedMonth, day);
    //   this.selectedDayOnCalendar.setHours(0, 0, 0, 0);
    
    //   console.log("Selected day set to:", this.selectedDayOnCalendar);
    // }
    
  
    // isSelectedDay(day: number, monthIndex: number): boolean {
    //   const selectedMonth = this.selectedDayOnCalendar.getMonth();
    //   const selectedYear = this.selectedDayOnCalendar.getFullYear();
    //   const selectedDate = this.selectedDayOnCalendar.getDate();
    
    //   const currentMonth = this.calendarMonths[monthIndex].getMonth();
    //   const currentYear = this.calendarMonths[monthIndex].getFullYear();
    
    //   return currentYear === selectedYear && currentMonth === selectedMonth && day === selectedDate;
    // }
    
    
    // daySelectx(day: number, month: number): void {
    //   let selectededMonth = this.calendarMonths[month].getMonth();
    //   let selectedYear = this.calendarMonths[month].getFullYear();
    
    //   let selectedDate = new Date(selectedYear, selectededMonth, day);
    //   selectedDate.setHours(0, 0, 0, 0); 
    
      
    //   let userDateAtMidnight = new Date(this.userDate);
    //   userDateAtMidnight.setHours(0, 0, 0, 0);
    
    //   if (selectedDate < userDateAtMidnight) {
    //     console.log("Selected date is in the past.");
    //     return; 
    //   }
  
    //   console.log("Selected date is:", selectedDate);
    //   console.log("selectedStartDate::", this.selectedStartDate);
    //   console.log(`selectedEndDate:`, this.selectedEndDate);
      
      
      
    //   let x = new Date(selectedYear, selectededMonth, selectedDate.getDate(), 0, 0, 0);
    //   this.selectedDayOnCalendar = x;
    //   console.log(x);
    //   this.selectedDay = x.getDate();
    //   console.log(this.selectedDay);
  
    // }
    // dayselectForward(){
  
    // }
  
    // daySelectBackwards(){
  
    // }
  }