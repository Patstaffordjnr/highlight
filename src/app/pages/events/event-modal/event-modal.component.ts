import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../event-service';
import { Event } from 'src/app/model/event';
import { EventType } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal-service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent implements OnInit, AfterViewInit {
  @ViewChild('addressInput') addressInput: ElementRef;

  editDisplay = "Edit";
  display = "Display";

  dialogOpen: boolean = false;
  editDialog: boolean = false;
  calenderStartEventVisible = false;
  calenderFinishEventVisible = false;

  typesOfEvents = ["Busker"];
  checkoutForm: FormGroup;
  eventModal: Event[];
  currentEvent;
  currentEventAddress;
 
  markerLat: number;
  markerLng: number;

  startDateAndTime = new Date;
  finishDateAndTime = new Date;

  startDate: string;
  startTime: string;

  finishDate: string;
  finishTime: string;

  public eventTitle: String;
  public eventType: EventType;
  public lat: Number;
  public lng: Number;
  public startAt: Date;
  public endAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public id: String;

  google: any
  address;
  newAddress;
  addressPlaceHolder;
  autoCompleteInitialised = false;

  constructor( private cdRef: ChangeDetectorRef, private eventService: EventService, private formBuilder: FormBuilder, private http: HttpClient, private modalService: ModalService) {
    this.eventService.eventToBeDisplayed$.subscribe(eventSubject => {
      this.dialogOpen = false;

      this.checkoutForm = this.formBuilder.group({
        eventTitle: [''],
        eventType: [''],
        eventLat: [null],
        eventLng: [null],
        address:  [''],
        startDateTime:  [null],
        finishDateTime:  [null],
      });
      if(eventSubject){
        this.currentDisplay(eventSubject);
      }
     
    });
  }

  async currentDisplay(selecteCurrentEvent?: Event[]) {
    this.currentEvent = await selecteCurrentEvent;
    this.eventTitle = this.currentEvent.title;
    this.eventType = this.currentEvent.eventType;
    this.lat = this.currentEvent.lat;
    this.lng = this.currentEvent.long;
    this.startAt = this.currentEvent.startAt;
    this.endAt = this.currentEvent.endAt;
    this.createdAt = this.currentEvent.createdAt;
    this.updatedAt = this.currentEvent.updatedAt;
    this.id = this.currentEvent.id;

    if (selecteCurrentEvent.length != 0) {
      // console.log(this.currentEvent.lat, this.currentEvent.long);
      this.getAddressFromCoordinates(this.currentEvent.lat, this.currentEvent.long);
      this.onStartDateSelected(this.startAt);
      this.onFinishDateSelected(this.endAt);
      await this.getAddressFromCoordinates(Number(this.lat), Number(this.lng))
      this.editDialog = false;

      const endAt = new Date(Number(this.endAt) * 1000);
      const startAt = new Date(Number(this.endAt) * 1000);

      let startAtHour = String(this.startAt).substring(11, 13);
      let startAtMinute = String(this.startAt).substring(14, 16);
      this.startDateAndTime = new Date(this.startDateAndTime.getFullYear(), this.startDateAndTime.getMonth(), this.startDateAndTime.getDate(), Number(startAtHour), Number(startAtMinute), 0);

      let finishAtHour = String(this.endAt).substring(11, 13);
      let finishAtMinute = String(this.endAt).substring(14, 16);
      this.finishDateAndTime = new Date(this.finishDateAndTime.getFullYear(), this.finishDateAndTime.getMonth(), this.finishDateAndTime.getDate(), Number(finishAtHour), Number(finishAtMinute), 0);
    }

    if (this.currentEvent.lat > 0) {
      this.dialogOpen = true;
      
      this.onStartDateSelected(this.startAt);
    } else {
      this.dialogOpen = false;
    }
  }

async ngOnInit() {

    this.modalService.modalDisplay$.subscribe((modalDisplay => {
      if(modalDisplay) {
       this.dialogOpen = modalDisplay;
       this.editDialog = true;
       this.eventTitle = null;
       this.eventType = null;
       this.lat = null;
       this.lng = null;
       this.startAt = null;
       this.endAt = null;
       this.createdAt = null;
       this.updatedAt = null;
       this.id = null;

       this.startDateAndTime = new Date;
       this.finishDateAndTime = new Date;
       this.initAutocomplete();
      }
    }));
    // console.log(`X`, this.endAt);

  }

async ngAfterViewInit() {

this.cdRef.detectChanges();
this.initAutocomplete();
  }

  initAutocomplete() {
  // console.log(`initAutocomplete()`);
  this.autoCompleteInitialised = true;
  // console.log(this.autoCompleteInitialised);

    const addressInput = document.getElementById('addressInput') as HTMLInputElement;
    if (!addressInput) return;
  
    const autocomplete = new google.maps.places.Autocomplete(addressInput);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place) return;
  
      this.address = place.formatted_address;
      this.markerLat = place.geometry.location.lat();
      this.markerLng = place.geometry.location.lng();

      this.checkoutForm.get('address').patchValue(this.address);
      this.checkoutForm.get('eventLat').patchValue(this.markerLat);
      this.checkoutForm.get('eventLng').patchValue(this.markerLng);
    });

  }

  async getAddressFromCoordinates(latitude: number, longitude: number) {
    // console.log(latitude, longitude);
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA5mnnydr-3HjuPTwkoNmVUHAYy77CVSmQ`; // Replace with your API endpoint and key
    await this.http.get(geocodingUrl).subscribe((response: any) => {
      if (response.results && response.results.length > 0) {
        const address = response.results[0].formatted_address;
        this.currentEventAddress = address;
        console.log(latitude,longitude);
        console.log(address);
      }
    }, (error) => {
      console.error("Error during geocoding:", error);
    });
  }

  onStartDateSelected($event) {
    console.log(typeof($event));
  
    if (typeof ($event) == "string") {
      const year = Number($event.substring(0, 4));
      const month = Number($event.substring(5, 7));
      const day = Number($event.substring(8, 10));
      this.startDateAndTime = new Date(year, month - 1, day, this.startDateAndTime.getHours(), this.startDateAndTime.getMinutes(), 0);
      console.log(this.startDateAndTime);
    } else {
      const x = new Date($event * 1000);
      this.startDateAndTime = new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), 0);
      console.log(this.startDateAndTime);
    }
  }

  onStartTimeSelected($event) {
    let hour = Number($event.substring(0, 2));
    let minute = Number($event.substring(3, 5));
    this.startDateAndTime = new Date(this.startDateAndTime.getFullYear(), this.startDateAndTime.getMonth(), this.startDateAndTime.getDate(), hour, minute, 0);
  }

  onFinishDateSelected($event) {
    console.log(typeof($event));
    if (typeof ($event) == "string") {
      const year = Number($event.substring(0, 4));
      const month = Number($event.substring(5, 7));
      const day = Number($event.substring(8, 10));
      this.finishDateAndTime = new Date(year, month - 1, day, this.finishDateAndTime.getHours(), this.finishDateAndTime.getMinutes(), 0);
      console.log(this.finishDateAndTime);
    } else {
      const x = new Date($event * 1000);
      this.finishDateAndTime = new Date(x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), 0); 
      console.log(this.finishDateAndTime);
    }
  }

  onFinishTimeSelected($event) {
    let hour = Number($event.substring(0, 2));
    let minute = Number($event.substring(3, 5));
    this.finishDateAndTime = new Date(this.finishDateAndTime.getFullYear(), this.finishDateAndTime.getMonth(), this.finishDateAndTime.getDate(), hour, minute, 0);
  }

  onSubmit(checkoutForm) {
    console.log(checkoutForm);
  }

  createEvent(){

    this.editDialog = true;
    this.eventTitle = null;
    this.eventType = null;
    this.lat = null;
    this.lng = null;
    this.startAt = null;
    this.endAt = null;
    this.createdAt = null;
    this.updatedAt = null;
    this.id = null;
    this.startDateAndTime = new Date;
    this.finishDateAndTime = new Date;

    this. addressPlaceHolder = null;
    this.currentEventAddress = "";
    console.log(`createEvent()`);
    this.ngAfterViewInit();

  }

  async toggleModalEdit() {
    this.editDialog = true;
    this.calenderStartEventVisible = false;
    this.calenderFinishEventVisible = false;
    this.lat = null;
    this.lng = null;

    this. addressPlaceHolder = this.currentEventAddress;
    this.currentEventAddress = null;
    console.log(`Edit Event`);
    this.checkoutForm.get('address').patchValue(this.newAddress);
    this.ngAfterViewInit();
  }

  toggleModalDisplay() {
    this.editDialog = false;
    this.calenderStartEventVisible = false;
    this.calenderFinishEventVisible = false;
    this.currentEventAddress = this. addressPlaceHolder
    this.checkoutForm.get('address').patchValue(this.address);
  }

  toggleModalOpen() {
    this.dialogOpen = true;
  }

  toggleModalClose() {
    this.dialogOpen = false;
    this.editDialog = true;
    this.eventTitle = null;
    this.eventType = null;
    this.lat = null;
    this.lng = null;
    this.startAt = null;
    this.endAt = null;
    this.createdAt = null;
    this.updatedAt = null;
    this.id = null;
    this.startDateAndTime = new Date;
    this.finishDateAndTime = new Date;

    this.modalService.updateModalDisplayStatus(false);
    this.eventService.clearSelectedEvent();
    console.log(`Close Modal`);
  }

  toggleModalConfirm() {
    this.dialogOpen = false;
    this.modalService.updateModalDisplayStatus(false);

  }

  startTimeSelectToggle() {
    this.calenderStartEventVisible = !this.calenderStartEventVisible;
  }

  finishTimeSelectToggle() {
    this.calenderFinishEventVisible = !this.calenderFinishEventVisible;
  }
}
