import { Component } from '@angular/core';
import { GlobalDateService } from './global-date.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

 globalDate = new Date();


  constructor(private globalDateService: GlobalDateService) {

}

async ngOnInit() { 

  this.globalDateService.globalDate$.subscribe((globalDate) => {
    if(globalDate) {
      console.log(globalDate);
      this.globalDate = globalDate;
      // const [hoursString, minutesString] = globalTime.split(':');}
}
})


}

onDateSelected(selectedDate: Date) {

  const currentHours =  this.globalDate.getHours();
  const currentMinutes =  this.globalDate.getMinutes();
  const currentSeconds =  this.globalDate.getSeconds();

       const updatedGlobalDate = new Date(
         selectedDate.getFullYear(),
         selectedDate.getMonth(),
         selectedDate.getDate(),
         currentHours,
         currentMinutes,
         currentSeconds
       );

   this.globalDate = updatedGlobalDate;
     this.globalDateService.updateEventDate(updatedGlobalDate);

}

onTimeSelected(updatedTime: Date) {

   const [hoursString, minutesString] =  String(updatedTime).split(':');
   const currentHours =  hoursString
   const currentMinutes =  minutesString
   const currentSeconds =  this.globalDate.getSeconds();

        const updatedGlobalDate = new Date(
          this.globalDate.getFullYear(),
          this.globalDate.getMonth(),
          this.globalDate.getDate(),
          Number(currentHours),
          Number(currentMinutes),
          currentSeconds
        );

    this.globalDate = updatedGlobalDate;
      this.globalDateService.updateEventDate(updatedGlobalDate);
}

}
