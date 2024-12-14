import { Component } from '@angular/core';
import { GlobalDateService } from './global-date.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 x: Date;
  globalDate = new Date();
 
 constructor(private globalDateService: GlobalDateService) {
  // this.globalDateService.globalDate$.subscribe((globalDate) => {
  //   console.log(`constructor:${globalDate}`);     
  //             this.globalDate = globalDate;
  // })
}

async ngOnInit() { 
  this.globalDateService.globalDate$.subscribe((globalDate) => {
      if(globalDate) {
        console.log(`ngOnInit:${globalDate}`);     
          //  this.globalDate = globalDate;
          this.x = globalDate;
      }
  })
}

onTimeSelected(updatedTime: Date) {
  const updatedGlobalDate = new Date(
  updatedTime.getFullYear(), updatedTime.getMonth(),
  updatedTime.getDate(), updatedTime.getHours(),
  updatedTime.getMinutes(), 0);
  this.globalDateService.upDate(updatedGlobalDate);
}

onDateSelected(selectedDate: Date): void {
  if (!selectedDate) return;
  const currentHours = this.globalDate.getHours();
  const currentMinutes = this.globalDate.getMinutes();
  const currentSeconds = this.globalDate.getSeconds();
  const updatedGlobalDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    currentHours,
    currentMinutes,
    currentSeconds
  );
  if (this.globalDate.getTime() !== updatedGlobalDate.getTime()) {
    this.globalDateService.upDate(updatedGlobalDate);
    console.log(`Home Calendar Select Date: ${updatedGlobalDate}`);
  }
}

}
