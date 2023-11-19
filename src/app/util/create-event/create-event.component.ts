import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { SharedService } from '../shared.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  markerAddress: string;
  buttonText: string = 'Address ';
 
  checkoutForm = this.formBuilder.group({
    name: new FormControl(''),
    address: '',  // Assuming this is the form control for markerAddress
    startDateTime: new FormControl(''),
    finishDateTime: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private zone: NgZone
  ) {
    this.sharedService.markerAddress$.subscribe((address) => {
      this.markerAddress = address;
      // Set the markerAddress value in the form group
      this.checkoutForm.patchValue({
        address: address
      });
    });
  }

  ngOnInit(): void {
  }

  placeMarker() {
    this.sharedService.updateCreateEventMarkerToBePlaced(true);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.checkoutForm.value);
  }
}
