import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  hours: number[] = [];
  mapTimeHour: String;
  mapTimeMinute: String;

  isDragging = false;
  startX = 0;
  offsetLeft = 0;

  @ViewChild('progressBarDiv') progressBarDiv: ElementRef;
  @ViewChild('dot') dot: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.initialiseClock();
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
    const dotWidth = this.dot.nativeElement.offsetWidth;
    let x = event.clientX - parentRect.left;
    const hourLength = parentRect.width / 24;
    const minuteLength = hourLength / 60;
    let totalMinutes = Math.floor(x / minuteLength);
    let hour = Math.floor(totalMinutes / 60);
    let minute = totalMinutes % 60;

    if (minute < 5) {
      minute = 0;
    } else if (minute >= 5 && minute < 10) {
      minute = 5;
    } else if (minute >= 10 && minute < 15) {
      minute = 10;
    } else if (minute >= 15 && minute < 20) {
      minute = 15;
    } else if (minute >= 20 && minute < 25) {
      minute = 20;
    } else if (minute >= 25 && minute < 30) {
      minute = 25;
    } else if (minute >= 30 && minute < 35) {
      minute = 30;
    } else if (minute >= 35 && minute < 40) {
      minute = 35;
    } else if (minute >= 40 && minute < 45) {
      minute = 40;
    } else if (minute >= 45 && minute < 50) {
      minute = 45;
    } else if (minute >= 50 && minute < 55) {
      minute = 50;
    } else if (minute >= 55) {
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
      this.hours.push(selectedTimeDay.getHours());
    }
  }

  emitTime(date: Date) {
    console.log(date);
    return this.selectTimeEvent.emit(date);
  }
}
