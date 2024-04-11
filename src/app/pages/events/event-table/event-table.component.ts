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
  reveivedObject

  arr = [0,1,2,3,4,5]
  totalNumberOfEvents;
  totalNumberOfPages;

eventResponseList: PageListResponse = {
  total: 0,
 results: []
};

constructor(private eventsClient: EventsClient, private eventService: EventService) {
}

async ngOnInit() { 

  this.currentIndex = this.currentIndex;
  let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedObject =  initialEventList;
  this.eventResponseList.total = this.reveivedObject.total;
  this.eventResponseList.results = this.reveivedObject.results;

  this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)

}

pageNumberOrchestration(noOfEventsPerPage, noOfPages, injectedCurrentIndex){
  let totalNumberOfEvents = noOfEventsPerPage * noOfPages;
  let totalPages = totalNumberOfEvents / noOfEventsPerPage;



  if(injectedCurrentIndex  < totalPages) {
    
    injectedCurrentIndex
    let newArr = [];
    let x = this.arr.map((pageNumber, index) => {
      newArr.push(index + injectedCurrentIndex)
    })

    this.arr = [];
    this.arr = newArr;
  
    return 
  } else {

  }

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
console.log(this.arr);
  
let lastElementOfCurrentArr = this.arr.slice(-1);

  this.currentIndex = this.currentIndex + 1;
  let nextPageGetRequest = await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedObject = nextPageGetRequest;
  this.eventResponseList.results = this.reveivedObject.results;
  this.eventResponseList.total = this.reveivedObject.total;

  this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)




}

async previousPageOfEvents() {

  console.log(this.arr);
  if(this.currentIndex === 0 ) {
    this.currentIndex == 0 
    return
  }
  this.currentIndex = this.currentIndex - 1;
  let previousPageGetRequest = await this.eventsClient.getEvents(this.currentIndex, 10)
  this.reveivedObject = previousPageGetRequest;
  this.eventResponseList.results = this.reveivedObject.results;
  this.eventResponseList.total = this.reveivedObject.total;
  this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)
}


}
