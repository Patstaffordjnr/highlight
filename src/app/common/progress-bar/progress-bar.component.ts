import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Output() selectTimeEvent = new EventEmitter<Date>();
  @Input() selectedTime: Date;

  date = new Date();
  currentHour = this.date.getHours();
  mm = this.date.getMinutes();
  ss = this.date.getSeconds();
  session = "AM";
  hours: string[] = [];
  mapTimeHour: String;
  mapTimeMinute: String;

  isDragging = false;
  startX = 0;
  offsetLeft = 0;

  @ViewChild('progressBarDiv') progressBarDiv: ElementRef;
  @ViewChild('dot') dot: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    this.initialiseClock();
      if (!this.selectedTime) {
    this.selectedTime = new Date(); // fallback only if undefined
  }
      // Mouse events (desktop)
  window.addEventListener('mousemove', (e) => this.mousemove(e));
  window.addEventListener('mouseup', (e) => this.mouseUp(e));

  // Touch events (mobile)
  window.addEventListener('touchmove', (e) => this.touchMove(e));
  window.addEventListener('touchend', (e) => this.touchEnd(e));
  }

  ngAfterViewInit() {
    if(this.selectedTime) {
      this. setClock(this.selectedTime);
    }
  }

  mouseDown(event: MouseEvent) {
    this.isDragging = true;
    const dotRect = this.dot.nativeElement.getBoundingClientRect();
    this.startX = event.clientX - dotRect.left;
    this.offsetLeft = this.dot.nativeElement.offsetLeft;
  }

  mousemove(event: MouseEvent) {
    if (!this.isDragging) return;
    const parentRect = this.progressBarDiv.nativeElement.getBoundingClientRect();
    const dotWidth = this.dot.nativeElement.offsetWidth - 4;
    let x = event.clientX - parentRect.left;
    const hourLength = parentRect.width / 24;
    const minuteLength = hourLength / 60;
    let totalMinutes = Math.floor(x / minuteLength);
    let hour = Math.floor(totalMinutes / 60);
    let minute = totalMinutes % 60;

minute = Math.round(minute / 5) * 5;
if (minute === 60) {
  minute = 0;
  hour++;
}
    let newTime = new Date(
      this.selectedTime.getFullYear(),
      this.selectedTime.getMonth(),
      this.selectedTime.getDate(),
      hour,
      minute,
      0
    );
    this.emitTime(newTime);
   let newLeft = event.clientX - parentRect.left - this.startX;
if (newLeft < 0) {
  newLeft = 0;
} else if (newLeft + dotWidth > parentRect.width) {
  newLeft = parentRect.width - dotWidth;
}
this.dot.nativeElement.style.left = `${newLeft}px`;
  }

  mouseUp(event: MouseEvent) {
    this.isDragging = false;
  }


  touchStart(event: TouchEvent) {
  this.isDragging = true;
  const touch = event.touches[0];
  const dotRect = this.dot.nativeElement.getBoundingClientRect();
  this.startX = touch.clientX - dotRect.left;
}

touchMove(event: TouchEvent) {
  if (!this.isDragging) return;
  const touch = event.touches[0];
  this.mousemove({ clientX: touch.clientX } as MouseEvent);
}

touchEnd(event: TouchEvent) {
  this.isDragging = false;
}

  initialiseClock() {
    for (let i = 0; i < 24; i++) {
      let selectedTimeDay = new Date(
        this.selectedTime.getFullYear(),
        this.selectedTime.getMonth(),
        this.selectedTime.getDate(),
        i,
        this.selectedTime.getMinutes(),
        this.selectedTime.getSeconds()
      );
      if (i === 0) {
        this.hours.push("00");
      } else {
        this.hours.push(i.toString());
      }
    }
  }

  setClock(date: Date) {
const dotElement: HTMLElement = this.dot.nativeElement;
const progressBarElement: HTMLElement = this.progressBarDiv.nativeElement;
let divLeft = progressBarElement.offsetLeft;
let divRight = (divLeft + progressBarElement.offsetWidth);
let divLength = (divRight - divLeft);

let hour = date.getHours();
let minutes = date.getMinutes();
let totalPosition = (divLength / 24) * hour + (divLength / (24 * 60)) * minutes;
dotElement.style.left = `${totalPosition}px`;
  }

  emitTime(date: Date) {
    return this.selectTimeEvent.emit(date);
  }
}
