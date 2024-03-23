import { Component, OnInit } from '@angular/core';

import { EventsClient } from './events-client';
import { Event } from 'src/app/model/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: Event[] = [];

  

constructor(private eventsClient: EventsClient) {

  
  
}

async ngOnInit() { 
  this.events = await this.eventsClient.getEvents(1, 10);
  console.log(this.events)
}
    
}








