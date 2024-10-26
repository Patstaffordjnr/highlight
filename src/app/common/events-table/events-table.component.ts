import { Component, OnInit } from '@angular/core';
import { PageListResponse } from '../event/page-list-response';
import { EventsClient } from '../event/events-client';
import { MapService } from '../map/map-service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrl: './events-table.component.css'
})
export class EventsTableComponent implements OnInit {
currentIndex = 0;
noOfProducts = 10;

responseFromServer;


constructor (private eventsClient: EventsClient, private mapService: MapService) {

}

async ngOnInit() { 
  let response = await this.eventsClient.getEvents(this.currentIndex, this.noOfProducts);
  this.responseFromServer = response
  console.log(this.currentIndex);
  console.log(this.responseFromServer);
  
}


async currentIndexPlus() {
  this.currentIndex = this.currentIndex + 1;
  let response = await this.eventsClient.getEvents(this.currentIndex, this.noOfProducts);
  this.responseFromServer = response
  console.log(this.currentIndex);
  console.log(this.responseFromServer);
}


async currentIndexMinus() {
  this.currentIndex = this.currentIndex - 1;
  let response = await this.eventsClient.getEvents(this.currentIndex, this.noOfProducts);
  this.responseFromServer = response
  console.log(this.currentIndex);
  console.log(this.responseFromServer);
}


}
