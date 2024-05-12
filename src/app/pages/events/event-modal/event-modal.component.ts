import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event-service';
import { Event } from 'src/app/model/event';
import { EventType } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})

export class EventModalComponent implements OnInit {

  dialogOpen: boolean = false;
  editDialog: boolean = false;
  @ViewChild('myDialog', { static: true }) myDialog: HTMLDialogElement;
  typesOfEvents = ["Busker"];
  checkoutForm: FormGroup

  eventModal: Event[];
  currentEvent

  public eventTitle: String;
  public eventType: EventType;
  public lat: Number
  public lng: Number
  public startAt: Date;
  public endAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public id: String;


  constructor(private eventService: EventService, private formBuilder: FormBuilder,) {
    this.eventService.eventToBeDisplayed$.subscribe(eventSubject => {
      this.dialogOpen = false;

      this.checkoutForm = this.formBuilder.group({
        eventTitle: [''],
        eventType: [''],
        eventLat: [Number],
        eventLng: [Number],
        address:  [''],
        startDateTime:  [Date],
        finishDateTime:  [Date],
      })

    this.currentDisplay(eventSubject)

    
    });
  }

  async currentDisplay(SelecteCurrentEvent: Event[]) {
    this.currentEvent = await SelecteCurrentEvent
        this.eventTitle = this.currentEvent.title;
        this.eventType = this.currentEvent.eventType;
        this.lat = this.currentEvent.lat;
        this.lng = this.currentEvent.long;
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

  onSubmit(checkoutForm) {
    console.log(checkoutForm);

  }

  toggleModalEdit() {
    this.editDialog = !this.editDialog;

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