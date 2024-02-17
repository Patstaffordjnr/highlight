import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @ViewChild('hourDiv') hourDiv: ElementRef;
  @ViewChild('hourSelectDiv') hourSelectDiv: ElementRef;
  @ViewChild('clockhourSelect') clockhourSelect: ElementRef;

  date = new Date();
  currentHour = this.date.getHours();
  mm = this.date.getMinutes();
  ss = this.date.getSeconds();
  session = "AM";
  hours = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];

  constructor() {

    // console.log(`${this.currentHour}:${this.mm}`);
  }

  ngOnInit(): void {

    
  }

  hourSelect(event: MouseEvent) {
  const divElement: HTMLDivElement = this.hourDiv.nativeElement;
  let divHourElement: HTMLDivElement = this.hourSelectDiv.nativeElement;
  const divLeft = divElement.offsetLeft;
  const divWidth = divElement.offsetWidth;

  const clickX = event.clientX;

  const clickOffsetPercentage = ((clickX - divLeft) / divWidth) * 100;

  let day = 2600;
  let click = Math.round(clickOffsetPercentage);
  let hourBy26 = day / 24;
  let SixtyMins = click / hourBy26;
  let displayHour = Math.floor(SixtyMins) + 1;
  let sessionz = "AM";

  let minuteByHour = hourBy26 / 60;
  let minutes = Math.round((click / minuteByHour) - displayHour * 60 + 60);

  if (displayHour > 12) {
    sessionz = "PM";
  } else if (displayHour < 12) {
    sessionz = "AM";
  }

  // console.log(`${displayHour}:${minutes} ${sessionz}`);

  divHourElement.style.position = 'absolute';
  divHourElement.style.left = event.clientX + 'px';
}


clock(event) {

  const divClockElement: HTMLDivElement = this.clockhourSelect.nativeElement;
  const divLeft = divClockElement.offsetLeft;
  const divWidth = divClockElement.offsetWidth;

  const clickX = event.clientX;
  const clickOffsetPercentage = ((clickX - divLeft) / divWidth) * 100;
  let hour = Math.round(clickOffsetPercentage / (100 / 24));
  let minutes = Math.round(clickOffsetPercentage *((24 * 60) / 100)) ;
  let hours = clickOffsetPercentage / (100 / 24);
  let clockDialMinutes =  ((minutes - (60 * hour))) + 30;
  let session = "am";

  if(hour > 12) {

    session = "pm"
  }

  if(minutes > 60) {

    
    console.log(`The time is ${hour}:${clockDialMinutes} ${session}`);
  } else if (minutes < 60) {
    console.log(`The time is ${0}:${clockDialMinutes} ${session}`);
  }

}
}