import { Component } from '@angular/core';
import { DisplayTimeService } from '../home/display-time.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {

  displayTime = new Date();


  constructor(private displayTimeService: DisplayTimeService) {

    this.displayTimeService.displayTime$.subscribe((displayTime) => {
      if(displayTime) {
        console.log(displayTime);
        // const [hoursString, minutesString] = globalTime.split(':');}
  }
})

}
}
