import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop'; // Import CdkDragMove
import { Time } from '@angular/common';
import { GlobalDateAndTimeComponentService } from '../../util/global-date-and-time/global-date-and-time.service'


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @ViewChild('progressBarDiv') progressBarDiv: ElementRef;
  @ViewChild('dot') dot: ElementRef;
  @Output() selectTimeEvent = new EventEmitter<String>();

  date = new Date();
  currentHour = this.date.getHours();
  mm = this.date.getMinutes();
  ss = this.date.getSeconds();
  session = "AM";
  hours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
  mapTime
  constructor(private globalDateAndTimeComponentService: GlobalDateAndTimeComponentService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const date = new Date();
    this.onStartUpMoveDotToPosition(date);
  }
  onStartUpMoveDotToPosition(time) {

    console.log(`Start Up current time: ${time}`);
    const progressBarElement: HTMLElement = this.progressBarDiv.nativeElement;
    // progressBarElement.style.backgroundColor = "black";
    let hour = time.getHours();
    let minutes = time.getMinutes();
    // console.log(hour, minutes);
    let hourPercentOfX = (hour / 24) * 100
    // console.log(hourPercentOfX);
    let divLeft = progressBarElement.offsetLeft;

    console.log(divLeft);
    let divRight = (divLeft + progressBarElement.offsetWidth);
    console.log(divRight);
    let divLength = divRight - divLeft;
    console.log(divLength);
    let divLengthByTwentyFour = (divLength / 24);
        let div60 = divLengthByTwentyFour / 60;
    let divMinutes = div60 * minutes;
    // let dotX = ((divLength / 100) * hourPercentOfX) + divMinutes;

    let dotX = (divLengthByTwentyFour * hour)
    console.log(dotX);
        const dotElement: HTMLElement = this.dot.nativeElement;
  dotElement.style.left =`${dotX - 10}px`


    // dotElement.style.left =`${200}px`
  }

  emitTime(hour, minutes) {
    let time = `${hour}:${minutes}`
    this.selectTimeEvent.emit(time);
  }


  clock(hour: number, minutes: number) {
    if(hour == 0 && minutes == 0) {
      this.mapTime = `00:00 AM`
      this.emitTime('00', '00');
    } else if(hour == 24 && minutes > 0) {
      this.mapTime = `24:00 PM`
      this.emitTime('00', '00');
    }  else {
    // -------------------------------------------------------------------------------
    const injectedHour = hour < 10 ? `0${hour}` : String(hour);
    const injectedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);
    //--------------------------------------------------------------------------------GEMINI 
    if(Number(injectedHour) > 12) {
      this.mapTime = `${injectedHour}:${injectedMinutes} PM`
      this.emitTime(injectedHour, injectedMinutes);
    } else {
      this.mapTime = `${injectedHour}:${injectedMinutes} AM`
      this.emitTime(injectedHour, injectedMinutes);
    }
    }

  }

  onDragMoved(event: CdkDragMove<any>) {

    let dotPosition = event.pointerPosition.x;
    let divElement: HTMLDivElement = this.progressBarDiv.nativeElement;
    let divLeft = divElement.offsetLeft;
    let divRight = (divLeft + divElement.offsetWidth);
    let hourLength = (365) / 24
    let dotX = dotPosition - divLeft

    if(dotPosition < divLeft) {
      dotPosition = divLeft;
      let hour = 0;
      let minutes = 0;
      return this.clock( hour, minutes)
    } else if(dotPosition > divRight) {
      // console.log(`Too Much`);
      return
    } else {
      let xValueHour = dotX / hourLength;
      let hour = Math.trunc(xValueHour);
      let minutesToBeCalculated = String(xValueHour % 1);
      let minutesMinusDecimalPoint = minutesToBeCalculated.slice(minutesToBeCalculated.indexOf(".") + 1);
      let secondsPercentage = Number(minutesMinusDecimalPoint.substring(0, 2));
      let minutes = Math.trunc((secondsPercentage / 100) * 60)
      this.clock(hour, minutes)
    }
  }

}