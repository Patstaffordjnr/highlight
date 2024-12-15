import { Component } from '@angular/core';
import { GlobalDateService } from './global-date.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  globalDate = new Date();
 constructor(private globalDateService: GlobalDateService,) {
}
async ngOnInit() { 
  this.globalDateService.globalDate$.subscribe((globalDate) => {
      if(globalDate) {
          this.globalDate = globalDate;
      }
  })
}

onTimeSelected(selectedDate: Date) {
  const updatedGlobalDate = new Date(
    this.globalDate.getFullYear(), 
    this.globalDate.getMonth(),
    this.globalDate.getDate(),
    selectedDate.getHours(),
    selectedDate.getMinutes(),
  0
);
this.globalDate = updatedGlobalDate;
  this.globalDateService.upDateTime(updatedGlobalDate);
  
}

onDateSelected(selectedDate: Date): void {
  if (!selectedDate) return;
  const updatedGlobalDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    this.globalDate.getHours(),
    this.globalDate.getMinutes(),
    0
  );
  this.globalDate = updatedGlobalDate;
  this.globalDateService.upDate(updatedGlobalDate);


  if (this.globalDate.getTime() !== updatedGlobalDate.getTime()) {
    this.globalDateService.upDate(updatedGlobalDate);
    console.log(`Home Calendar Select Date: ${updatedGlobalDate}`);
  }
}

}
