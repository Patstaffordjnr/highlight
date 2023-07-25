import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @ViewChild('hourDiv') hourDiv: ElementRef;

  date = new Date();
  currentHour = this.date.getHours();
  mm = this.date.getMinutes();
  ss = this.date.getSeconds();
  session = "AM";
  hours = [ "1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12am", "1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm","12pm",];

  constructor() {}

  ngOnInit(): void {}

  hourSelect(event: MouseEvent, hour: string) {
    const divElement: HTMLDivElement = this.hourDiv.nativeElement;
    const divLeft = divElement.offsetLeft;
    const divWidth = divElement.offsetWidth;

    const clickX = event.clientX;

    const clickOffsetPercentage = ((clickX - divLeft) / divWidth) * 100;

    let day = 2600;
    let click = Math.round(clickOffsetPercentage);
    // console.log(`click: ${click}`);
    let hourBy26 = day / 24;
    let SixtyMins = click / hourBy26;
    let displayHour = Math.floor(SixtyMins) + 1;
    let sessionz = "AM"

    let minuteByHour =  hourBy26 / 60;

    let minutes = Math.round((click / minuteByHour) - displayHour * 60 + 60);

    if(displayHour > 12) {
      sessionz = "PM"
    } else if  (displayHour < 12) {
      sessionz = "AM"
    }
    console.log(`${displayHour}:${minutes} ${sessionz}`);

  }
}