import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';

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
hours = [];
mapTimeHour: String;
mapTimeMinute: String;

isDragging = false;
startX = 0;
offsetLeft = 0;

@ViewChild('progressBarDiv') progressBarDiv: ElementRef;
@ViewChild('dot') dot: ElementRef;

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

  let x = event.x - parentRect.left;
  let hourLength = parentRect.width / 24;
  let minuteLength = hourLength / 60;

  let hour = Math.floor((x / hourLength));
  let minute = Math.floor(x / minuteLength - (Math.floor(hour) * 60));

  let newTime = new Date(this.selectedTime.getFullYear(),this.selectedTime.getMonth(), this.selectedTime.getDate(),
  this.selectedTime.getHours() + hour, this.selectedTime.getHours() + minute, 0 )

  this.emitTime(newTime);

// let newLeft = event.clientX - parentRect.left - this.startX;
//   if (newLeft < 0) {
//     return
//   } else if (newLeft + dotWidth > parentRect.width) {
//     newLeft = parentRect.width - dotWidth;
//   }
//   this.dot.nativeElement.style.left = `${newLeft}px`;
// }
// CHATGPT RECOMENDATION
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

constructor() {
}

ngOnInit(): void {
        this.initialiseClock();
}

initialiseClock(){
    for (let i = 0; i < 24; i++) {
          let selectedTimeDay = new Date(
            this.selectedTime.getFullYear(),
            this.selectedTime.getMonth() ,
            this.selectedTime.getDate(),
            this.selectedTime.getHours() + i,
            this.selectedTime.getMinutes(),
            this.selectedTime.getSeconds()
          )
          this.hours.push(selectedTimeDay.getHours())
    }
}

emitTime(date: Date) {
return this.selectTimeEvent.emit(date);
}

}


