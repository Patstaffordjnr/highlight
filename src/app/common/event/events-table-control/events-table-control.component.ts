import { Component } from '@angular/core';

@Component({
  selector: 'app-events-table-control',
  templateUrl: './events-table-control.component.html',
  styleUrl: './events-table-control.component.css'
})
export class EventsTableControlComponent {

  searchText: string = '';
  sorts = ["Nearest", "Starting Time"];
  
  allEventsVisible = true;
  bandEventsVisible = true;
  buskerEventsVisible = true;
  djEventsVisible = true;
  performanceEventsVisible = true;


allFunction(){
  console.log(`All Function`);
  this.allEventsVisible = !this.allEventsVisible;
  console.log(this.allEventsVisible);
}

bandFunction(){
  console.log(`Band Function`);
  this.bandEventsVisible =  !this.bandEventsVisible;
  console.log(this.bandEventsVisible);
}

buskerFunction(){
  console.log(`Busker Function`);
  this.buskerEventsVisible = !this.buskerEventsVisible;
  console.log(this.buskerEventsVisible);
}

djFunction(){
  console.log(`DJ Function`);
  this.djEventsVisible = !this.djEventsVisible;
  console.log(this.djEventsVisible);
}

performanceFunction(){
  console.log(`Performance Function`);
  this.performanceEventsVisible = !this.performanceEventsVisible;
  console.log(this.performanceEventsVisible);
}

search(searchText){
  console.log(searchText);
  this.searchText = searchText;
}
}
