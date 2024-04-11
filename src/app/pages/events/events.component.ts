import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})

export class EventsComponent {
  createEventEventVisible: boolean = false; 
  openCreateEvent() {
    this.createEventEventVisible = !this.createEventEventVisible;
  }

}


