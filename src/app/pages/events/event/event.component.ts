import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GoogleMapService } from 'src/app/pages/google-map/google-map.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  typesOfEvents = ["Busker"];

  markerAddress: string;
  markerAddressObject: Object;

  markerLat: number;
  markerLng: number;

  buttonText: string = 'Select Address';
  checkoutForm: FormGroup

  // password: ['dumb', [Validators.required, Validators.minLength(4)]]

  
  
  constructor(
    private formBuilder: FormBuilder,
    private googleMapService: GoogleMapService
  ) {



    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      eventType: ['', [Validators.required]],
      eventLat: [Number, [Validators.required, this.validateCoordinate]],
      eventLng: [Number, [Validators.required, this.validateCoordinate]],
      address:  [''],
      startDateTime:  ['', [Validators.required]],
      finishDateTime:  ['', [Validators.required]],
  
    })

  }

  ngOnInit(): void {

  }

  selectAddress() {
  this.googleMapService.updateMarkerPlacementStatus(true);
  this.googleMapService.markerAddress$.subscribe((markerAddress) => {
  
  this.markerAddressObject = [markerAddress];
  this.markerLat = this.markerAddressObject[0].lat;
  this.markerLng = this.markerAddressObject[0].lng;
  this.checkoutForm.patchValue({ eventLat: this.markerLat, eventLng: this.markerLng });
    })

  }




  validateCoordinate(control: AbstractControl): { [key: string]: any} | null {

    let value = control.value;
    if (isNaN(value) || value < -90 || value > 90) {
      return { 'invalidCoordinate': true };
    }
    return null

  }





  onSubmit() {
      console.warn(this.checkoutForm.value);
  }

}