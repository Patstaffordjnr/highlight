import { Component } from '@angular/core';
import { GlobalDateAndTimeComponentService } from './global-date-and-time.service';

@Component({
  selector: 'app-global-date-and-time',
  templateUrl: './global-date-and-time.component.html',
  styleUrl: './global-date-and-time.component.css'
})
export class GlobalDateAndTimeComponent {

  globalDateAndTime: Date = new Date();
  intervalId

  constructor(private globalDateAndTimeComponentService: GlobalDateAndTimeComponentService) {
  
  }

  updateTime() {

    const date = new Date();
    this.globalDateAndTime = date;
  }

  

  async ngOnInit() {
    
  // this.updateTime();
  // setInterval(() => {
  //   this.updateTime();
  // }, 1000);

    await this.globalDateAndTimeComponentService.globalTime$.subscribe((globalTime) => {
      if(globalTime) {
        const [hoursString, minutesString] = globalTime.split(':');
        const hours = parseInt(hoursString, 10);
        const minutes = parseInt(minutesString, 10);
  
        let globalDateAndTime = new Date(this.globalDateAndTime.getFullYear(), this.globalDateAndTime.getMonth(), this.globalDateAndTime.getDate(), hours, minutes, this.globalDateAndTime.getSeconds(), this.globalDateAndTime.getMilliseconds())
        // console.log(globalTime);
        this.globalDateAndTime = globalDateAndTime
      }
    });
    
    await this.globalDateAndTimeComponentService.globalDate$.subscribe((globalDate) => {

      let globalDateAndTime = new Date(globalDate.getFullYear(), globalDate.getMonth(), globalDate.getDate(), this.globalDateAndTime.getHours(), this.globalDateAndTime.getMinutes(), this.globalDateAndTime.getSeconds(), this.globalDateAndTime.getMilliseconds())
      let globalDateToString = globalDateAndTime.toLocaleDateString();;
      this.globalDateAndTime = globalDateAndTime;
    });
  }

}
