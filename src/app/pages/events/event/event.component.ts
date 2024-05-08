import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { GoogleMapService } from 'src/app/pages/google-map/google-map.service';
import { HttpClient } from '@angular/common/http';
import { CalenderComponent } from 'src/app/components/calender/calender.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

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
    // this.checkoutForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.minLength(1)]],
    //   eventType: ['', [Validators.required]],
    //   eventLat: [Number, [Validators.required, this.validateCoordinate]],
    //   eventLng: [Number, [Validators.required, this.validateCoordinate]],
    //   address:  ['', [Validators.required]],
    //   startDateTime:  ['', [Validators.required]],
    //   finishDateTime:  ['', [Validators.required]],
    // })
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