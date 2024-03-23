import { Component, OnInit } from '@angular/core';
import { EventsClient } from './events-client';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: any[] = [];

  

constructor(private eventsClient: EventsClient) {

  
  
}

ngOnInit() { 
  this.eventsClient.getEvents(1, 10) // Adjust currentPage and noOfProducts
  .then(events => this.events = events)
  .catch(error => console.error('Error fetching events:', error));
}
    
}








