import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { GoogleMapService } from 'src/app/pages/google-map/google-map.service';
import { HttpClient } from '@angular/common/http';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {


  google: any

  calenderStartEventVisible = false;
  calenderFinishEventVisible = false;

  startDateAndTime = new Date;
  finishDateAndTime = new Date;
  
  startDate: string;
  startTime: string;

  finishDate: string;
  finishTime: string;

  typesOfEvents = ["Busker"];
  address;
  markerAddress: string;
  markerAddressObject: Object;

  addressToBeGeocoded = false;
  markerLat: number;
  markerLng: number;

  buttonText: string = 'Select Address';
  checkoutForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private googleMapService: GoogleMapService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {

    this.checkoutForm = this.formBuilder.group({
      name: [''],
      eventType: [''],
      eventLat: [Number],
      eventLng: [Number],
      address:  [''],
      startDateTime:  [Date],
      finishDateTime:  [Date],
    })
    
}

async ngOnInit() {
    await this.googleMapService.eventAddress$.subscribe((markerAddress) => {
      if (markerAddress) {
        this.address = markerAddress;
        this.checkoutForm.get('address').patchValue(
          this.address
        );
        // console.log(this.address);
        this.cdRef.detectChanges();
      }
    });
   this.initAutocomplete();
  }


  initAutocomplete() {
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

  
async selectAddress() {
  this.googleMapService.updateMarkerPlacementStatus(true);
  await this.googleMapService.eventLatLng$.subscribe((markerAddress) => {
  this.markerAddressObject = [markerAddress];
  this.markerLat = this.markerAddressObject[0].lat;
  this.markerLng = this.markerAddressObject[0].lng;

  this.checkoutForm.get('eventLat').patchValue(
    this.markerLat
  );
  this.checkoutForm.get('eventLng').patchValue(
    this.markerLng
  );
  
  })
  this.ngOnInit();
  }

validateCoordinate(control: AbstractControl): { [key: string]: any} | null {

    let value = control.value;
    if (isNaN(value) || value < -90 || value > 90) {
      return { 'invalidCoordinate': true };
    }
    return null
  }


startTimeSelectToggle() {
      this.calenderStartEventVisible = !this.calenderStartEventVisible
    }

finishTimeSelectToggle() {
      this.calenderFinishEventVisible = !this.calenderFinishEventVisible
      
    }
onSubmit() {
        console.warn(this.checkoutForm.value);
    }

onStartDateSelected($event) {
  console.log($event);
  console.log(typeof($event));
    const startDateWithoutTime = new Date($event.getFullYear(), $event.getMonth(), $event.getDate()).toLocaleDateString();;
    // console.log(startDateWithoutTime);
      this.startDate = startDateWithoutTime;

      this.startDateAndTime = new Date(
        $event.getFullYear(),
        $event.getMonth(),
        $event.getDate(), 
        this.startDateAndTime.getHours(),
        this.startDateAndTime.getMinutes(),
        0)
  }

onStartTimeSelected($event) {
  this.startTime = $event
  const timeParts = $event.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  this.checkoutForm.get('startDateTime').patchValue(
    new Date(this.startDateAndTime.getFullYear(), this.startDateAndTime.getMonth(), this.startDateAndTime.getDate(), hours, minutes, 0)
  );

  this.startDateAndTime = new Date(
    this.startDateAndTime.getFullYear(),
    this.startDateAndTime.getMonth(),
    this.startDateAndTime.getDate(), 
    hours,
  minutes,
    0)
  }

  onFinishDateSelected($event) {
    const finishDateWithoutTime = new Date($event.getFullYear(), $event.getMonth(), $event.getDate()).toLocaleDateString();;
    // console.log(finishDateWithoutTime);
      this.finishDate = finishDateWithoutTime;

      this.finishDateAndTime = new Date(
        $event.getFullYear(),
        $event.getMonth(),
        $event.getDate(), 
        this.finishDateAndTime.getHours(),
        this.finishDateAndTime.getMinutes(),
        0)
  }

  onFinishTimeSelected($event) {
    this.finishTime = $event
    const timeParts = $event.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    this.finishDateAndTime = new Date(
      this.finishDateAndTime.getFullYear(),
      this.finishDateAndTime.getMonth(),
      this.finishDateAndTime.getDate(), 
      hours,
    minutes,
      0)

      this.checkoutForm.get('finishDateTime').patchValue(
        new Date(this.finishDateAndTime.getFullYear(), this.finishDateAndTime.getMonth(), this.finishDateAndTime.getDate(), hours, minutes, 0)
      );
  }



}