import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() selectedDate: Date;
  @Input() containerClass: string = 'calendar-component-container';
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
      this.selectedDayOnCalendar = this.selectedDate;
    }
  }

  ngOnInit(): void {
    this.selectedDayOnCalendar = this.selectedDate;
    this.scrollToSelectedMonth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.selectedDate) {
      this.selectedDayOnCalendar = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        this.selectedDate.getDate()
      );
      this.scrollToSelectedMonth();
    }
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
      );
      this.calendarMonths.push(monthOfLoop);
      this.calendarMonthDaysArr.push(this.getNumberOfDays(monthOfLoop.getMonth() + 1, monthOfLoop.getFullYear()));
      let noOfDaysAMonth = this.getNumberOfDays(monthOfLoop.getMonth() + 1, monthOfLoop.getFullYear());
      for (let i = 0; i < noOfDaysAMonth; i++) {
        this.allDates.set(this.generateKey(monthOfLoop.getFullYear(), monthOfLoop.getMonth(), (i + 1)), false);
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

    if (sFCX.getTime() < cDX.getTime()) {
      console.log(`Before Today's date.`);
      return;
    }
    this.selectedDayOnCalendar = selectedFromCalendar;
    this.emitDay(selectedFromCalendar);
  }

  emitDay(selectedDate: Date) {
    this.selectDateEvent.emit(selectedDate);
    this.userDate = selectedDate;
  }

  isSelected(year: number, month: number, day: number): boolean {
    return this.allDates.has(this.generateKey(year, month, day)) && this.allDates.get(this.generateKey(year, month, day)) === true;
  }

  generateKey(year: number, month: number, day: number): string {
    return `${year}_${month}_${day}`;
  }

  isPastDay(year: number, month: number, day: number): boolean {
    const d = new Date(year, month, day, 0, 0, 0);
    const today = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 0, 0, 0);
    return d.getTime() < today.getTime();
  }

  isKeyDate(year: number, month: number, day: number): boolean {
    if (!this.selectedDayOnCalendar) return false;
    return (
      this.selectedDayOnCalendar.getFullYear() === year &&
      this.selectedDayOnCalendar.getMonth() === month &&
      this.selectedDayOnCalendar.getDate() === day
    );
  }

  getMonthOffset(month: Date): number[] {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const offset = (firstDay + 6) % 7;
    return Array(offset).fill(0);
  }

private scrollToSelectedMonth(): void {
  if (!this.selectedDayOnCalendar) return;

  const targetIndex = this.calendarMonths.findIndex(m =>
    m.getFullYear() === this.selectedDayOnCalendar.getFullYear() &&
    m.getMonth() === this.selectedDayOnCalendar.getMonth()
  );

  if (targetIndex === -1) return;

  setTimeout(() => {
    const container = document.querySelector(`.${this.containerClass}`) as HTMLElement;
    if (!container) return;

    // Get the parent ngFor divs (direct children of calendar-container)
    const monthBlocks = container.querySelectorAll('.calendar-container > div');
    const monthBlock = monthBlocks[targetIndex] as HTMLElement;
    if (!monthBlock) return;

    const dayElements = monthBlock.querySelectorAll('.day');
    const offsetLength = this.getMonthOffset(this.selectedDayOnCalendar).length;
    const selectedDayEl = dayElements[offsetLength + this.selectedDayOnCalendar.getDate() - 1] as HTMLElement;

    const targetEl = selectedDayEl || monthBlock;
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const scrollTarget = container.scrollTop + (targetRect.top - containerRect.top) - (container.clientHeight / 2);

    container.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  }, 100);
}

  weekDaysDisplayList(i) {
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
      this.weekDays.push(["M", "T", "W", "T", "F", "S", "S"]);
    } else if (firstDayName == "Tuesday") {
      this.weekDays.push(["T", "W", "T", "F", "S", "S", "M"]);
    } else if (firstDayName == "Wednesday") {
      this.weekDays.push(["W", "T", "F", "S", "S", "M", "T"]);
    } else if (firstDayName == "Thursday") {
      this.weekDays.push(["T", "F", "S", "S", "M", "T", "W"]);
    } else if (firstDayName == "Friday") {
      this.weekDays.push(["F", "S", "S", "M", "T", "W", "T"]);
    } else if (firstDayName == "Saturday") {
      this.weekDays.push(["S", "S", "M", "T", "W", "T", "F"]);
    } else if (firstDayName == "Sunday") {
      this.weekDays.push(["S", "M", "T", "W", "T", "F", "S"]);
    }
  }
}