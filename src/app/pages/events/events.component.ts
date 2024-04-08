import { Component, Inject } from '@angular/core';
import { EventService } from './event-service'

import { Event } from 'src/app/model/event';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports:  [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})

export class EventsComponent {

eventPopUp: Event[];

currentEvent;
  constructor(private eventService: EventService) {
}

async ngOnInit() { 
  this.eventService.eventToBeDisplayed$.subscribe(eventSubject => {
    this.eventPopUp = eventSubject;
    this.currentDisplay(this.eventPopUp)
  });

}

async currentDisplay(currentEvent: Event[]) {
  this.currentEvent = await currentEvent;
  console.log(this.currentEvent);
}


}


