import { Component, OnInit } from '@angular/core';
import { PageListResponse } from '../event/page-list-response';
import { EventsClient } from '../event/events-client';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrl: './events-table.component.css'
})
export class EventsTableComponent implements OnInit {


  currentIndex = 0;
  reveivedObject

  noOfEventsPerPage = 10;

  eventResponseList: PageListResponse = {
    total: 0,
   results: []
  };

constructor (private eventsClient: EventsClient) {

}

async ngOnInit() { 

  this.currentIndex = this.currentIndex;



  let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, this.noOfEventsPerPage)


  this.reveivedObject =  initialEventList;
  this.eventResponseList.total = this.reveivedObject.total;
  this.eventResponseList.results = this.reveivedObject.results;

  console.log(this.eventResponseList);

//   this.googleMapService.updateEventsToBeDisplayed(this.eventResponseList.results);

//  this.reveivedObject.results.forEach(event => {
//   this.addressList(event.lat, event.long);
// })


//   this.pageNumberOrchestration(this.reveivedObject.results.length, this.reveivedObject.total, this.currentIndex)
}

}
