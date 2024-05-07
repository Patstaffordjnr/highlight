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
      name: ['', [Validators.required, Validators.minLength(1)]],
      eventType: ['', [Validators.required]],
      eventLat: [Number, [Validators.required, this.validateCoordinate]],
      eventLng: [Number, [Validators.required, this.validateCoordinate]],
      address:  ['', [Validators.required]],
      startDateTime:  ['', [Validators.required]],
      finishDateTime:  ['', [Validators.required]],
    })
}

async ngOnInit() {
    await this.googleMapService.eventAddress$.subscribe((markerAddress) => {
      if (markerAddress) {
        this.address = markerAddress;
        console.log(this.address);
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
}

onStartTimeSelected($event) {
 this.startTime = $event
}

onFinishDateSelected($event) {
  const finishDateWithoutTime = new Date($event.getFullYear(), $event.getMonth(), $event.getDate()).toLocaleDateString();;
  // console.log(finishDateWithoutTime);
    this.finishDate = finishDateWithoutTime;
}

onFinishTimeSelected($event) {
  this.finishTime = $event
}

}