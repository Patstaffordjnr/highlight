import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { ReturnStatement } from '@angular/compiler';

@Component({
selector: 'app-progress-bar',
templateUrl: './progress-bar.component.html',
styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

// @ViewChild('progressBarDiv') progressBarDiv: ElementRef;
// @ViewChild('dot') dot: ElementRef;
// @ViewChild('progressBarDiv') progressBarDiv: ElementRef;


// @ViewChild('dot', { read: CdkDrag }) dotDrag: CdkDrag;

@Output() selectTimeEvent = new EventEmitter<String>();
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
  this.startX = event.clientX - dotRect.left; // Offset within the dot
  this.offsetLeft = this.dot.nativeElement.offsetLeft; // Initial offset
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
  
  console.log(hour, minute);


  let newLeft = event.clientX - parentRect.left - this.startX;
  if (newLeft < 0) {
    return
  } else if (newLeft + dotWidth > parentRect.width) {
    newLeft = parentRect.width - dotWidth; // Right boundary
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
        this.onStartUpMoveDotToPosition(this.selectedTime);
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


emitTime(hour, minutes) {
let time = `${hour}:${minutes}`;
console.log(time);
return this.selectTimeEvent.emit(time);
}

timeSelect($event: CdkDragMove<any>) {
  // console.log($event);
}

onDragMoved($event: CdkDragMove<any>) {
}

// onStartUpMoveDotToPosition(time) {
// const dotElement: HTMLElement = this.dot.nativeElement;
// const progressBarElement: HTMLElement = this.progressBarDiv.nativeElement;
// let divLeft = progressBarElement.offsetLeft;
// let divRight = (divLeft + progressBarElement.offsetWidth);
// let divLength = (divRight - divLeft);

// let hour = time.getHours();
// let minutes = time.getMinutes();
// let hourPercentOfProgressBar = (divLength / 24) * hour;
// let minutePercentOfProgressBar = ((divLength / (24 * 60)* minutes));
// let timeToBeDisplayed = hourPercentOfProgressBar -10;

// dotElement.style.left = `${timeToBeDisplayed}px`;
// }


// onDragMoved($event: CdkDragMove<any>) {
// let divElement: HTMLDivElement = this.progressBarDiv.nativeElement;
// const divRect = divElement.getBoundingClientRect();
// let dotPosition = $event.pointerPosition.x - divRect.left;
// const day = divRect.width - 40;
// let hour = (day / 24);
// let minute = hour / 60;
// let percentage = (dotPosition / day) * 100;
// if(percentage < 0) {
//     return
// }


// const totalMinutes = Math.round((24 * 60 * percentage) / 100);
// let hours = Math.floor(totalMinutes / 60);
// let minutes = Math.round(totalMinutes % 60);

// if (minutes < 5) minutes = 0;
// else if (minutes > 5 && minutes < 9) minutes = 0;
// else if (minutes > 9 && minutes < 14) minutes = 10;
// else if (minutes > 14 && minutes < 19) minutes = 15;
// else if (minutes > 19 && minutes < 24) minutes = 20;
// else if (minutes > 24 && minutes < 29) minutes = 25;
// else if (minutes > 29 && minutes < 34) minutes = 30;
// else if (minutes > 35 && minutes < 39) minutes = 35;
// else if (minutes > 40 && minutes < 44) minutes = 40;
// else if (minutes > 45 && minutes < 49) minutes = 45;
// else if (minutes > 50 && minutes < 54) minutes = 50;
// else if (minutes > 55 && minutes < 57) minutes = 55;

//    if (hours >= 24 && minutes >= 0 || hours <= 0 && minutes <= 0) {
//     hours = 0;
//     minutes = 0;
//     const injectedHour = String(24).padStart(2, '0');
//     const injectedMinutes = String(0).padStart(2, '0');
//     this.mapTimeHour = injectedHour;
//     this.mapTimeMinute = injectedMinutes;

//     } else {
//      const injectedHour = String(hours).padStart(2, '0');
//     const injectedMinutes = String(minutes).padStart(2, '0');
//     this.mapTimeHour = injectedHour;
//     this.mapTimeMinute = injectedMinutes;
//     }


//     this.emitTime(this.mapTimeHour, this.mapTimeMinute);

// }
onStartUpMoveDotToPosition(time) {

  // const dotElement: HTMLElement = this.dot.nativeElement;
  // const progressBarElement: HTMLElement = this.progressBarDiv.nativeElement;
  // let divLeft = progressBarElement.offsetLeft;
  // let divRight = (divLeft + progressBarElement.offsetWidth);
  // let divLength = (divRight - divLeft);
  
  // let hour = this.selectedTime.getHours();
  // let minutes = this.selectedTime.getMinutes();
  // let hourPercentOfProgressBar = (divLength / 24) * hour;
  // let minutePercentOfProgressBar = ((divLength / (24 * 60)* minutes));
  // let timeToBeDisplayed = hourPercentOfProgressBar -10;
  
  // dotElement.style.left = `${timeToBeDisplayed}px`;
  }
  

}


