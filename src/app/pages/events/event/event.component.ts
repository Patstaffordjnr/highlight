import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GoogleMapService } from 'src/app/pages/google-map/google-map.service';
import { HttpClient } from '@angular/common/http';

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

  onSubmit() {
      console.warn(this.checkoutForm.value);
  }

}