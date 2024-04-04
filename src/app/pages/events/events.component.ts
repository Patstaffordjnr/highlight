import { Component, OnInit } from '@angular/core';
import { EventsClient } from './events-client';
import { Event } from '../../model/event'
import { NgFor } from '@angular/common';
import { GoogleMapService } from '../google-map/google-map.service';
import { PageListResponse } from './page-list-reponse';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgFor],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: Event[] = [];
  currentIndex = 0;

  pageNumberSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  eventUserName;
  eventUserRole;
  eventTitle;
  eventType;
  eventAddress;
  eventStartAt;
  eventEndAt;

constructor(private eventsClient: EventsClient, private googleMapService: GoogleMapService)
 {

}

eventResponseList: PageListResponse = {
  results: [],
  totalSize: 0,
};

async ngOnInit() { 
  this.currentIndex = this.currentIndex;
  this.events =  await this.eventsClient.getEvents(this.currentIndex, 10);
  this.eventResponseList.results = await this.eventsClient.getEvents(this.currentIndex, 10);

}

selectedEvent?: Event;
onSelect(event: Event): Event {
  this.eventUserName = 
  this.eventUserRole =
  this.eventTitle = event.title;
  this.eventType =  event.eventType;
  this.eventAddress = `LAT: ${event.lat}, LNG; ${event.long}`
  this.eventStartAt = event.endAt;
  this.eventEndAt = event.startAt;
   
  this.eventTitle = event.title;
  this.eventType = event.eventType;
 return  this.selectedEvent = event;
}

updatedNumberArray = []

updateNumbers(updatedNumber: number){
this.updatedNumberArray = [];
  let updatedArray = [0,1,2,3,4,5,6,7,8,9]
  updatedArray.forEach(pageNumbers => {
    let increaseByOne = pageNumbers + updatedNumber
    this.updatedNumberArray.push(increaseByOne)
  });
this.pageNumberSelect = this.updatedNumberArray;
}


async onSelectPage(page) {
  this.currentIndex = page;
  this.updateNumbers(this.currentIndex - 5);
  if(this.currentIndex < 5) {
    this.pageNumberSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return  this.events = await this.eventsClient.getEvents(page, 10);
  }

  this.events = await this.eventsClient.getEvents(page, 10);
}

async nextPageOfEvents() {
  this.currentIndex = this.currentIndex + 1;
  this.updateNumbers(this.currentIndex);
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10);
}

async previousPageOfEvents() {
  if(this.currentIndex < 1) {
    this.pageNumberSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return this.currentIndex = 0
  }
  
  this.currentIndex = this.currentIndex - 1;
  this.updateNumbers(this.currentIndex);
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10);

}

async next10PagesOfEvents() {

  this.currentIndex = this.currentIndex + 10;
  this.updateNumbers(this.currentIndex);
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10);
}

async next2PagesOfEvents() {

  this.currentIndex = this.currentIndex + 2;
  this.updateNumbers(this.currentIndex);
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10);
}

async previous2PagesOfEvents() {

  this.currentIndex = this.currentIndex - 2;
  if(this.currentIndex < 1) {
    this.pageNumberSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return this.currentIndex = 0
  }
  this.updateNumbers(this.currentIndex);
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10);
}

async previous10PagesOfEvents() {
  this.currentIndex = this.currentIndex - 10;
  if(this.currentIndex < 1) {
    this.pageNumberSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return this.currentIndex = 0
  }
  this.updateNumbers(this.currentIndex);
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10);
}


}




