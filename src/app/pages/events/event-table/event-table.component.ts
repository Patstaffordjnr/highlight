import { Component, OnInit } from '@angular/core';
import { EventsClient } from '../events-client';
import { Event } from '../../../model/event'
import { CommonModule, NgFor } from '@angular/common';
import { GoogleMapService } from '../../google-map/google-map.service';
import { PageListResponse } from '.././page-list-reponse';

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


constructor(private eventsClient: EventsClient ) {
}


async ngOnInit() { 
  this.currentIndex = this.currentIndex;
  let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedOject =  initialEventList;
  this.eventResponseList.total = this.reveivedOject.total;
  this.eventResponseList.results = this.reveivedOject.results;
  console.log(this.eventResponseList);
}


selectedEvent?: Event[];
onSelect(event: Event[]): Event[] {
  this.selectedEvent = event;
  console.log(this.selectedEvent);
  return this.selectedEvent;
}

async nextPageOfEvents() {
  this.currentIndex = this.currentIndex + 1;

}

async previousPageOfEvents() {

  if(this.currentIndex === 0 ) {
    this.currentIndex == 0 
    return
  }
  this.currentIndex = this.currentIndex - 1;
  // this.eventResponseList.results = await this.eventsClient.getEvents(this.currentIndex, 10);
}

}
