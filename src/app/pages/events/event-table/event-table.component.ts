import { Component, OnInit } from '@angular/core';
import { EventsClient } from '../events-client';
import { Event } from '../../../model/event'
import { CommonModule, NgFor } from '@angular/common';
import { GoogleMapService } from '../../google-map/google-map.service';
import { PageListResponse } from '.././page-list-reponse';
import { EventService } from '../event-service';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './event-table.component.html',
  styleUrl: './event-table.component.css'
})



export class EventTableComponent implements OnInit {

  currentIndex = 0;
  reveivedOject

eventResponseList: PageListResponse = {
  total: 0,
 results: []
};


constructor(private eventsClient: EventsClient, private eventService: EventService) {
}


async ngOnInit() { 

  this.currentIndex = this.currentIndex;
  let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedOject =  initialEventList;
  this.eventResponseList.total = this.reveivedOject.total;
  this.eventResponseList.results = this.reveivedOject.results;
  // console.log(this.eventResponseList);
}


async eventDisplay(eventSubject: Event[]) {
return await this.eventService.updateEvent(eventSubject)
  // console.log(eventSubject);
}

selectedEvent?: Event[];
onSelect(event: Event[]): Event[] {
  this.selectedEvent = event;
  this.eventDisplay(this.selectedEvent);
  return this.selectedEvent;
}

async nextPageOfEvents() {
  this.currentIndex = this.currentIndex + 1;
  let nextPageGetRequest = await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedOject = nextPageGetRequest;
  this.eventResponseList.results = this.reveivedOject.results;
  this.eventResponseList.total = this.reveivedOject.total;
}

async previousPageOfEvents() {

  if(this.currentIndex === 0 ) {
    this.currentIndex == 0 
    return
  }
  this.currentIndex = this.currentIndex - 1;
  let previousPageGetRequest = await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedOject = previousPageGetRequest;
  this.eventResponseList.results = this.reveivedOject.results;
  this.eventResponseList.total = this.reveivedOject.total;
 
}

}
