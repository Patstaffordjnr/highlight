import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalenderComponent } from 'src/app/components/calender/calender.component';
import { RouterService } from 'src/app/util/router.service';

@Component({
  selector: 'app-user-interface-nav',
  templateUrl: './user-interface-nav.component.html',
  styleUrl: './user-interface-nav.component.css'
})

export class UserInterfaceNavComponent {

calenderEventVisible: boolean = false; 
googleMapEventVisible: boolean = false; 
createEventEventVisible: boolean = false; 
eventsEventVisible: boolean = false; 
eventTableVisible: boolean = false;

constructor() {
  
}

openCalender() {
  this.calenderEventVisible = !this.calenderEventVisible
  console.log('Paddy Smash and Sausages');
  console.log(this.calenderEventVisible);
}
openGoogleMap() {
  this.googleMapEventVisible = !this.googleMapEventVisible;
}
openCreateEvent() {
  this.createEventEventVisible = !this.createEventEventVisible;
}
openEvents() {
  this.eventsEventVisible = !this.eventsEventVisible;
}

openEventTable() {
  this.eventTableVisible = !this.eventTableVisible;
}

}
