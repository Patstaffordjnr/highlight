import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event-service';
import { Event } from 'src/app/model/event';
import { EventType } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})

export class EventModalComponent implements OnInit {

  dialogOpen: boolean = false;
  editDialog: boolean = false;

  calenderStartEventVisible = false;
  calenderFinishEventVisible = false;

  @ViewChild('myDialog', { static: true }) myDialog: HTMLDialogElement;
  typesOfEvents = ["Busker"];
  checkoutForm: FormGroup

  eventModal: Event[];
  currentEvent
  currentEventAddress

 

  public eventTitle: String;
  public eventType: EventType;
  public lat: Number
  public lng: Number
  public startAt: Date;
  public endAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public id: String;


  constructor(private eventService: EventService, private formBuilder: FormBuilder, private http: HttpClient) {
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

        if(SelecteCurrentEvent.length != 0) {
          console.log(SelecteCurrentEvent);
          console.log(this.currentEvent.lat, this.currentEvent.long);
          this.getAddressFromCoordinates(this.currentEvent.lat, this.currentEvent.long);
        }


    if(this.currentEvent.lat > 0) {
      this.dialogOpen = true;
    } else {
      this.dialogOpen = false;
    }
  }

  ngOnInit() {
    
  }

  async getAddressFromCoordinates(latitude: number, longitude: number) {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA5mnnydr-3HjuPTwkoNmVUHAYy77CVSmQ`; // Replace with your API endpoint and key
    await this.http.get(geocodingUrl)
     .subscribe((response: any) => {
       if (response.results && response.results.length > 0) {
         const address = response.results[0].formatted_address;
         this.currentEventAddress = address;
         console.log(address);
        //  this.eventAddress.push(address);
        //  console.log(address);
  
       } else {
        //  console.error("Failed to retrieve address from coordinates.");
       }
     },
     (error) => {
      //  console.error("Error during geocoding:", error);
    });
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

  
startTimeSelectToggle() {
      this.calenderStartEventVisible = !this.calenderStartEventVisible
    }

finishTimeSelectToggle() {
      this.calenderFinishEventVisible = !this.calenderFinishEventVisible
      
    }
  
}