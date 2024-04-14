import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CdkDrag, CdkDragHandle, CdkDragMove } from '@angular/cdk/drag-drop'; // Import CdkDragMove
import { DragDropModule} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @ViewChild('a') a: ElementRef;

  mapTime

  date = new Date();
  currentHour = this.date.getHours();
  mm = this.date.getMinutes();
  ss = this.date.getSeconds();
  session = "AM";
  hours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

  constructor() {

  }

  ngOnInit(): void {
    
  }

  clock(hour, minutes) {
  console.log(`Time: ${hour}:${minutes}`);

  this.mapTime = `Time: ${hour}:${minutes}`
  }

  onDragMoved(event: CdkDragMove<any>) {

    let dotPosition = event.pointerPosition.x;
    let divElement: HTMLDivElement = this.a.nativeElement;
    let divLeft = divElement.offsetLeft;
    let divRight = (divLeft + divElement.offsetWidth);
    let hourLength = (365) / 24
    let dotX = dotPosition - divLeft

    if(dotPosition < divLeft) {
      dotPosition = divLeft;
      console.log(`Too little`);
      return 
    } else if(dotPosition > divRight) {
      console.log(`Too Much`);
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