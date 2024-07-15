import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EventsClient } from '../events-client';
import { Event } from '../../../model/event'
import { CommonModule, NgFor } from '@angular/common';
import { GoogleMapService } from '../../google-map/google-map.service';
import { PageListResponse } from '.././page-list-reponse';
import { EventService } from '../event-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.css'
})

export class EventTableComponent implements OnInit {

  eventsAddressIndexed = []

  eventLatArray = [];
  eventLngArray = [];

  currentIndex = 0;
  reveivedObject

  pageNumberArray = []
  totalNumberOfEvents;
  totalNumberOfPages;
  noOfEventsPerPage = 10;
  lastElementOfCurrentArr = this.pageNumberArray.slice(-1);

  eventAddress = [];

eventResponseList: PageListResponse = {
  total: 0,
 results: []
};


address1;

constructor(private eventsClient: EventsClient, private eventService: EventService,  private http: HttpClient, private cdRef: ChangeDetectorRef) {
}

async ngOnInit() { 

  this.currentIndex = this.currentIndex;
  let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedObject =  initialEventList;
  this.eventResponseList.total = this.reveivedObject.total;
  this.eventResponseList.results = this.reveivedObject.results;

 this.reveivedObject.results.forEach(event => {
  this.addressList(event.lat, event.long);
})

  this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)
}


async getAddressFromCoordinates(latitude: number, longitude: number) {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA5mnnydr-3HjuPTwkoNmVUHAYy77CVSmQ`; // Replace with your API endpoint and key
  await this.http.get(geocodingUrl)
   .subscribe((response: any) => {
     if (response.results && response.results.length > 0) {
       const address = response.results[0].formatted_address;
       this.eventAddress.push(address);
      //  this.eventsAddressIndexed.push(address);
      //  console.log(address);
     } else {
      //  console.error("Failed to retrieve address from coordinates.");
     }
   },
   (error) => {
    //  console.error("Error during geocoding:", error);
   });
}

ngAfterViewInit() {
  this.cdRef.detectChanges();
}




async addressList(latitude: number, longitude: number) {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA5mnnydr-3HjuPTwkoNmVUHAYy77CVSmQ`; // Replace with your API endpoint and key
  await this.http.get(geocodingUrl)
   .subscribe((response: any) => {
     if (response.results && response.results.length > 0) {
       const address = response.results[0].formatted_address;
       this.eventsAddressIndexed.push(address);
      //  console.log(address);
      //  console.log(this.eventsAddressIndexed);
       this.address1 = this.eventAddress[0]

       this.ngAfterViewInit();
     } else {
      //  console.error("Failed to retrieve address from coordinates.");
     }
   },
   (error) => {
    //  console.error("Error during geocoding:", error);
   });
}




pageNumberOrchestration(injectedNoOfEventsPerPage, injectedNoOfPages, injectedCurrentIndex){
 
  if (injectedCurrentIndex < 3) {
    return  this.pageNumberArray = [0,1,2,3,4]
  } else if (injectedCurrentIndex < (injectedNoOfPages)) {

    let y = [0,1,2,3,4];
    let x = []
    
    let totalNumberOfEvents = injectedNoOfEventsPerPage * injectedNoOfPages;
    let totalPages = totalNumberOfEvents / injectedNoOfEventsPerPage;
    
    for (let rep = 1; rep <= totalPages; rep++) {
      x.push(rep)
    }
  
  this.pageNumberArray = [];

  y.forEach(element => {
    if(element > this.totalNumberOfPages) {
      return
    } else {
      this.pageNumberArray.push((element + injectedCurrentIndex) - 3);
    }

  });
}

}


async pageSelect(selectedPage: number){
  if(selectedPage > this.totalNumberOfPages) {
    return 
  }
  this.currentIndex = selectedPage;
  let selectedEventList =   await this.eventsClient.getEvents(this.currentIndex, 10)
    this.reveivedObject =  selectedEventList;
    this.eventResponseList.total = this.reveivedObject.total;
    this.eventResponseList.results = this.reveivedObject.results;
  this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)
}

async eventDisplay(eventSubject: Event[]) {
  console.log(eventSubject);
return await this.eventService.updateEvent(eventSubject)
}

selectedEvent?: Event[];
onSelect(event: Event[]): Event[] {
  this.selectedEvent = event;
  this.eventDisplay(this.selectedEvent);
  return this.selectedEvent;
}

async nextPageOfEvents() {
  if(this.currentIndex < this.eventResponseList.total) {
    this.currentIndex = this.currentIndex + 1;
    let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, 10)
    this.reveivedObject =  initialEventList;
    this.eventResponseList.total = this.reveivedObject.total;
    this.eventResponseList.results = this.reveivedObject.results;
    this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)
  } else return

  }


async previousPageOfEvents() {
    if(this.currentIndex === 0 ) {
    return this.currentIndex == 0 ;
    }
  this.currentIndex = this.currentIndex - 1;
  let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedObject =  initialEventList;
  this.eventResponseList.total = this.reveivedObject.total;
  this.eventResponseList.results = this.reveivedObject.results;
  this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)
}
}