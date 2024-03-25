import { Component, OnInit } from '@angular/core';
import { EventsClient } from './events-client';
import { Event } from '../../model/event'
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: Event[] = [];

  

constructor(private eventsClient: EventsClient) {

  
  
}

ngOnInit() { 
//   this.eventsClient.getEvents(1, 10) // Adjust page and size
//   .then(events => this.events = events)
//   .catch(error => console.error('Error fetching events:', error));
//   console.log(this.events);
// }

}

getEvents() {
 

    this.eventsClient.getEvents(1, 10) // Adjust page and size
  .then(events => this.events = events)
  .catch(error => console.error('Error fetching events:', error));
  console.log(this.events);
}
}
    









