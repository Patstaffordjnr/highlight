import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event-service';
import { Event } from 'src/app/model/event';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})

export class EventModalComponent implements OnInit {

  dialogOpen: boolean = false;
  @ViewChild('myDialog', { static: true }) myDialog: HTMLDialogElement;

  eventModal: Event[];
  currentEvent

  public title: String;
  public eventType: EventType;
  public lat: Number
  public long: Number
  public startAt: Date;
  public endAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public id: String;

  constructor(private eventService: EventService) {
    this.eventService.eventToBeDisplayed$.subscribe(eventSubject => {
      this.dialogOpen = false;
    this.currentDisplay(eventSubject)
    });
  }

  async currentDisplay(SelecteCurrentEvent: Event[]) {
    this.currentEvent = await SelecteCurrentEvent
        this.title = this.currentEvent.title;
        this.eventType = this.currentEvent.eventType;
        this.lat = this.currentEvent.lat;
        this.long = this.currentEvent.long;
        this.startAt = this.currentEvent.startAt;
        this.endAt = this.currentEvent.endAt;
        this.createdAt = this.currentEvent.createdAt;
        this.updatedAt = this.currentEvent.updatedAt;
        this.id = this.currentEvent.id;

    if(this.currentEvent.lat > 0) {
      this.dialogOpen = true;
    } else {
      this.dialogOpen = false;
    }
  }

  ngOnInit() {
  }

  toggleModalOpen() {
    this.dialogOpen = true;
  }

  toggleModalClose() {
    this.dialogOpen = false;
  }

  toggleModalConfirm() {
    this.dialogOpen = false;
    console.log(`Modal Confirm`);
  }
  
}