import { Component, OnInit } from '@angular/core';
import { GlobalDateService } from './global-date.service'
import { MapService } from '../../common/map/map-service';
import { Subscription } from 'rxjs';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';

import { EventModalComponent } from 'src/app/common/event/event-modal/event-modal.component';


@Component({
  selector: 'app-home',
  // standalone: true,
  // imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showModal = false;

  currentIndex = 0;
  noOfPages = 8;

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
    { label: 'Nearest', value: 'distance' },        
    { label: 'Most Followers', value: 'followers' }, 
    { label: 'Most Attended', value: 'attendance' } 
  ];
  selectedSort: string = 'distance'; 
  selectedWithin: number = 1; 

  events: Event[] = [];
  event: Event;
  
  private subscription!: Subscription;

 constructor(private globalDateService: GlobalDateService,
  private mapService: MapService,
  private openHttpClientService: OpenHttpClientService) {
  this.globalDateService.globalDate$.subscribe((globalDate) => {
    if(globalDate) {
        this.globalDate = globalDate;
    }
    //   this.subscription = this.mapService?.mapCurrentLocationDetails$.subscribe((details) => {
    //     this.mapDetails = details;
        
    //     const addressString = details?.[5];
      
    //     if (addressString) {
    //       const parts = addressString.split(',').map(part => part.trim());
    //       const street = parts[0] || '';
    //       const cityOrCounty = parts[2] || parts[3] || '';
    //       const country = parts[parts.length - 1] || '';
    //       const formattedAddress = `${street}, ${cityOrCounty}, ${country}`;
    //       this.homeAddress = formattedAddress;
    //    } else {
    //     console.warn('Address string is undefined or empty.');
    //   }
    // });
  });
  this.openHttpClientService.getEvents(
    new Date(2025, 6, 6, 23, 0, 0),
    -88,
    -88
    ,80
    ,80,
    [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
  ).subscribe({
    next: (events: Event[]) => {

      // 'events' here IS your complete list of Event[]
      // console.log('Successfully extracted events:', events);
      this.events = events; // Assign the full list to your component property
    },
    error: (error) => {
      // console.error('Error fetching events:', error);
    },
  });
}

 ngOnInit() { 
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

onSelect(event: Event) {
  console.log('Received Event: Home;', event);
  this.event = event;
  this.showModal = true;
}

}
