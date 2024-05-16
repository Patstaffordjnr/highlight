import { Component } from '@angular/core';
import { EventService } from './event-service';
import { ModalService } from "./event-modal/modal-service"


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})

export class EventsComponent {

  modalDisplay = false;

  constructor(private modalService: ModalService) {

  }
  createEventEventVisible: boolean = false; 
  openCreateEvent() {
    this.createEventEventVisible = !this.createEventEventVisible;
  }

  async createEvent(){
    this.modalDisplay = true
   
    
this.modalService.updateModalDisplayStatus(this.modalDisplay);


  }

}
