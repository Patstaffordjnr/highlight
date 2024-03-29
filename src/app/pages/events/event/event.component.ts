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
    private http: HttpClient
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



  async selectAddress() {
  this.googleMapService.updateMarkerPlacementStatus(true);
  this.googleMapService.eventLatLng$.subscribe((markerAddress) => {
  
  this.markerAddressObject = [markerAddress];
  this.markerLat = this.markerAddressObject[0].lat;
  this.markerLng = this.markerAddressObject[0].lng;
  this.checkoutForm.patchValue({ eventLat: this.markerLat, eventLng: this.markerLng });
    })
  this.addressToBeGeocoded = true;


    this.googleMapService.eventAddress$.subscribe((markerAddress => {
      if(markerAddress) {
        this.address = markerAddress;
        this.checkoutForm.get('address').setValue(markerAddress);
      }

    }));

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