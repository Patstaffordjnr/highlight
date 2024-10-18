import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop'; // Import CdkDragMove

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @ViewChild('progressBarDiv') progressBarDiv: ElementRef;
  @ViewChild('dot') dot: ElementRef;
  @Output() selectTimeEvent = new EventEmitter<String>();

  @Input() selectedTime: Date;

  date = new Date();
  currentHour = this.date.getHours();
  mm = this.date.getMinutes();
  ss = this.date.getSeconds();
  session = "AM";
  hours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
  mapTime

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    if(this.selectedTime) {
      this.onStartUpMoveDotToPosition(this.selectedTime);
    }
 
  }
  emitTime(hour, minutes) {
        let time = `${hour}:${minutes}`
        this.selectTimeEvent.emit(time);
      }

 onStartUpMoveDotToPosition(time) {

    const dotElement: HTMLElement = this.dot.nativeElement;
    const progressBarElement: HTMLElement = this.progressBarDiv.nativeElement;
    let divLeft = progressBarElement.offsetLeft;
    let divRight = (divLeft + progressBarElement.offsetWidth);
    let divLength = (divRight - divLeft);

    let hour = time.getHours();
    let minutes = time.getMinutes();
    let hourPercentOfProgressBar = (divLength / 24) * hour
    let minutePercentOfProgressBar = ((divLength / (24 * 60)* minutes))
    let timeToBeDisplayed = hourPercentOfProgressBar -10;
     
    dotElement.style.left = `${timeToBeDisplayed}px`;
          
          }
        


  onDragMoved($event: CdkDragMove<any>){

    let divElement: HTMLDivElement = this.progressBarDiv.nativeElement;
    const divRect = divElement.getBoundingClientRect();
    let dotPosition = $event.pointerPosition.x - divRect.left;
    dotPosition = Math.max(0, Math.min(dotPosition, divRect.width));
    let percentage = (dotPosition / 330) * 100;

    let divLengthByTwentyFour = (350 / 24);
    let div60 = divLengthByTwentyFour / 60;
    let minuteLength = div60;
    let totalCurrentMinutes = minuteLength * percentage;
    let minutesPercentage = totalCurrentMinutes - Math.floor(totalCurrentMinutes);
  
    let hour = Math.floor(totalCurrentMinutes);
    let minutes =  Math.floor(Number(Math.trunc(60 * minutesPercentage)))

    if(minutes < 5) {
      minutes = 0;
    }
    if(minutes  > 5  &&  minutes < 9) {
      minutes = 5;
    }
    if(minutes  > 9  &&  minutes < 14) {
      minutes = 10;
    }
    if(minutes  > 14  &&  minutes < 19) {
      minutes = 15;
    }
    if(minutes  > 19  &&  minutes < 24) {
      minutes = 20;
    }
    if(minutes  > 24  &&  minutes < 29) {
      minutes = 25;
    }
    if(minutes  > 29  &&  minutes < 34) {
      minutes = 30;
    }
    if(minutes  > 35  &&  minutes < 39) {
      minutes = 35;
    }
    if(minutes  > 40  &&  minutes < 44) {
      minutes = 40;
    }
    if(minutes  > 45  &&  minutes < 49) {
      minutes = 45;
    }
    if(minutes  > 50  &&  minutes < 54) {
      minutes = 50;
    }
    if(minutes  > 55  &&  minutes < 58) {
      minutes = 55;
    }

    if(minutes > 50) {
      hour++
      minutes = 0;
    }

    const time = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), hour, minutes, 0);

    let injectedHour = time.getHours() <= 9 ? `0${hour}` : String(time.getHours());
    let injectedMinutes = time.getMinutes() <= 9 ? `0${time.getMinutes()}` : String(time.getMinutes());
    if(hour === 24){
      injectedHour = "00";
      injectedMinutes = "00";
    }
  
    this.emitTime(injectedHour, injectedMinutes);

  }
}