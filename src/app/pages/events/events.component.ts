import { Component, OnInit } from '@angular/core';
import { EventsClient } from './events-client';
import { Event } from '../../model/event'
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgFor],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: Event[] = [];

constructor(private eventsClient: EventsClient) {

}

async ngOnInit() { 
  await this.eventsClient.getEvents(1, 10) // Adjust page and size
  .then(events => this.events = events)
  .catch(error => console.error('Error fetching events:', error));
}

selectedEvent?: Event;
onSelect(event: Event): Event {
  console.log(event);
 return  this.selectedEvent = event;
}
async getEvents() {
 
}
    

}




