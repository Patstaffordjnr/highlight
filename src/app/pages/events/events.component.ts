import { Component, ViewChild } from '@angular/core';
import { EventService } from './event-service'

import { Event } from 'src/app/model/event';
import { CommonModule, NgFor } from '@angular/common';
import { EventModalComponent } from 'src/app/components/event-modal/event-modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})

export class EventsComponent {

@ViewChild('modal', {static: false}) modal: EventModalComponent



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


openModal() {
  this.modal.open();
}

}


