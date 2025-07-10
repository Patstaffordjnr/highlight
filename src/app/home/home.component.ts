import { Component } from '@angular/core';
import { GlobalDateService } from './global-date.service'
import { MapService } from '../common/map/map-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  allEventsVisible = true;
  bandEventsVisible = true;
  buskerEventsVisible = true;
  djEventsVisible = true;
  performanceEventsVisible = true;


  showDateControls = false;
  globalDate = new Date();
  mapDetails: String[] = [];
  homeAddress: string = '';
  distances: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50];
  selectedDistance: number = 5; // default
  withinOptions: { label: string, value: number }[] = [
    { label: '30 minutes', value: 0.5 },
    { label: '1 hour', value: 1 },
    { label: '2 hours', value: 2 },
    { label: '3 hours', value: 3 },
    { label: '12 hours', value: 12 },
    { label: '24 hours', value: 24 },
    { label: '2 days', value: 48 },
    { label: '1 week', value: 168 },      // 7 * 24
    { label: '1 month', value: 720 }      // Approx: 30 * 24
  ];
  sortOptions: { label: string, value: string }[] = [
    { label: 'Starting', value: 'starting' },   
    { label: 'Ending', value: 'ending' },   
    { label: 'Nearest', value: 'distance' },        // By proximity
    { label: 'Most Followers', value: 'followers' }, // By artist popularity
    { label: 'Most Attended', value: 'attendance' }  // By crowd size
  ];
  selectedSort: string = 'distance'; // default: Nearest
  selectedWithin: number = 1; // default: 1 hour

  private subscription!: Subscription;

 constructor(private globalDateService: GlobalDateService, private mapService: MapService) {
  this.globalDateService.globalDate$.subscribe((globalDate) => {
    if(globalDate) {
        this.globalDate = globalDate;
    }

      this.subscription = this.mapService?.mapCurrentLocationDetails$.subscribe((details) => {
        this.mapDetails = details;
      
        const addressString = details?.[5]; // safely access index 5
      
        if (addressString) {
          const parts = addressString.split(',').map(part => part.trim());

          const street = parts[0] || '';
          const cityOrCounty = parts[2] || parts[3] || ''; // Adjust index as needed
          const country = parts[parts.length - 1] || '';
          const formattedAddress = `${street}, ${cityOrCounty}, ${country}`;
          // console.log('Formatted address:', formattedAddress);
          this.homeAddress = formattedAddress;
       } else {
        console.warn('Address string is undefined or empty.');
      }
    });
  });
}

async ngOnInit() { 
  this.globalDateService.globalDate$.subscribe((globalDate) => {
      if(globalDate) {
          this.globalDate = globalDate;
      }
  })
}
  
toggleDateControls() {
  console.log(`Ola`);
  this.showDateControls = !this.showDateControls;
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



allFunction(){
  console.log(`All Function`);
  this.allEventsVisible = !this.allEventsVisible;
  console.log(this.allEventsVisible);
}

bandFunction(){
  console.log(`Band Function`);
  this.bandEventsVisible =  !this.bandEventsVisible;
  console.log(this.bandEventsVisible);
}

buskerFunction(){
  console.log(`Busker Function`);
  this.buskerEventsVisible = !this.buskerEventsVisible;
  console.log(this.buskerEventsVisible);
}

djFunction(){
  console.log(`DJ Function`);
  this.djEventsVisible = !this.djEventsVisible;
  console.log(this.djEventsVisible);
}

performanceFunction(){
  console.log(`Performance Function`);
  this.performanceEventsVisible = !this.performanceEventsVisible;
  console.log(this.performanceEventsVisible);
}


}
