import { Component } from '@angular/core';
import { GlobalDateAndTimeComponentService } from '../global-date-and-time/global-date-and-time.service'

@Component({
  selector: 'app-user-interface-nav',
  templateUrl: './user-interface-nav.component.html',
  styleUrl: './user-interface-nav.component.css'
})



export class UserInterfaceNavComponent {


  globalDateAndTime: Date = new Date;


calenderEventVisible: boolean = false; 
googleMapEventVisible: boolean = false; 
createEventEventVisible: boolean = false; 
eventsEventVisible: boolean = false; 
eventTableVisible: boolean = false;
eventModalVisible: boolean = false;



constructor(private globalDateAndTimeComponentService: GlobalDateAndTimeComponentService) {
  
}
onGlobalDateSelected($event){
  this.globalDateAndTimeComponentService.updateGlobalDateSubject($event);
  let calenderDate = new Date($event.getFullYear(), $event.getMonth(), $event.getDate(),
  this.globalDateAndTime.getHours(), this.globalDateAndTime.getMinutes(),
  this.globalDateAndTime.getSeconds(), this.globalDateAndTime.getMilliseconds());
  this.globalDateAndTime = calenderDate;
}
onGlobalTimeSelected($event){
  this.globalDateAndTimeComponentService.updateGlobalTimeSubject($event);

}

openCalender() {
  this.calenderEventVisible = !this.calenderEventVisible;
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
