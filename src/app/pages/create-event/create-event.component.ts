import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SharedService } from 'src/app/util/shared.service';

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
    address: '',
    startDateTime: new FormControl(''),
    finishDateTime: new FormControl(''),
    length: new FormControl('')
  })

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private zone: NgZone
  ) {
    this.sharedService.markerAddress$.subscribe((address) => {
      this.markerAddress = address;
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
  
      console.warn(this.checkoutForm.value);
    
  }


}