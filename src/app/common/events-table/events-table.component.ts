import { Component, OnInit } from '@angular/core';
import { PageListResponse } from '../event/page-list-response';
import { EventsClient } from '../event/events-client';
import { MapService } from '../map/map-service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrl: './events-table.component.css'
})
export class EventsTableComponent implements OnInit {
// currentIndex = 0;
// noOfProducts = 10;

// responseFromServer;

// searchText: string = '';
// sorts = ["Nearest", "Starting Time"];

// allEventsVisible = true;
// bandEventsVisible = true;
// buskerEventsVisible = true;
// djEventsVisible = true;
// performanceEventsVisible = true;



constructor (private eventsClient: EventsClient, private mapService: MapService) {

}

async ngOnInit() { 
  // let response = await this.eventsClient.getEvents(this.currentIndex, this.noOfProducts);
  // this.responseFromServer = response
  // console.log(this.currentIndex);
  // console.log(this.responseFromServer);
  
}


// async currentIndexPlus() {
//   this.currentIndex = this.currentIndex + 1;
//   let response = await this.eventsClient.getEvents(this.currentIndex, this.noOfProducts);
//   this.responseFromServer = response
//   // console.log(this.currentIndex);
//   // console.log(this.responseFromServer);
// }


// async currentIndexMinus() {
//   this.currentIndex = this.currentIndex - 1;
//   let response = await this.eventsClient.getEvents(this.currentIndex, this.noOfProducts);
//   this.responseFromServer = response
//   // console.log(this.currentIndex);
//   // console.log(this.responseFromServer);
// }


// allFunction(){
//   console.log(`All Function`);
//   this.allEventsVisible = !this.allEventsVisible;
//   console.log(this.allEventsVisible);

// }

// bandFunction(){
//   console.log(`Band Function`);
//   this.bandEventsVisible =  !this.bandEventsVisible;
//   console.log(this.bandEventsVisible);

// }

// buskerFunction(){
//   console.log(`Busker Function`);
//   this.buskerEventsVisible = !this.buskerEventsVisible;
//   console.log(this.buskerEventsVisible);

// }

// djFunction(){
//   console.log(`DJ Function`);
//   this.djEventsVisible = !this.djEventsVisible;
//   console.log(this.djEventsVisible);
// }

// performanceFunction(){
//   console.log(`Performance Function`);
//   this.performanceEventsVisible = !this.performanceEventsVisible;
//   console.log(this.performanceEventsVisible);
// }

// search(searchText){
//   console.log(searchText);
//   this.searchText = searchText;
// }

}
