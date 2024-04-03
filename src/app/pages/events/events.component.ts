import { Component, OnInit } from '@angular/core';
import { EventsClient } from './events-client';
import { Event } from '../../model/event'
import { NgFor } from '@angular/common';
import { GoogleMapService } from '../google-map/google-map.service';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgFor],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: Event[] = [];

  pageNumberSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  pagesToBeDisplayed = 0;



  eventUserName;
  eventUserRole;
  eventTitle;
  eventType;
  eventAddress;
  eventStartAt;
  eventEndAt;


  currentIndex = 0;


constructor(private eventsClient: EventsClient, private googleMapService: GoogleMapService) {

}

async ngOnInit() { 

  this.currentIndex = this.currentIndex;
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10)

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

async nextPageOfEvents() {

    // let emptyArray = []
    this.currentIndex = this.currentIndex + 1;
    this.events = await this.eventsClient.getEvents(this.currentIndex, 10);


    // this.pageNumberSelect.forEach((page) => {
    //   this.pagesToBeDisplayed  = this.pagesToBeDisplayed  + 1;

      // emptyArray.push(this.pagesToBeDisplayed);
      // console.log(this.pagesToBeDisplayed);

    // })

    // console.log(emptyArray);

}


next2PagesOfEvents() {

  console.log(`Mup`);
}

async onSelectPage(page) {
  // console.log(page);
  this.events = await this.eventsClient.getEvents(page, 10);


}


async previousPageOfEvents() {

  this.currentIndex = this.currentIndex - 1;
  this.events = await this.eventsClient.getEvents(this.currentIndex, 10);

}


previous2PagesOfEvents() {

  console.log(`Down`);
}
}




