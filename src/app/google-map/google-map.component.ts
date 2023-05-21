import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {


  googleMap = document.querySelector('.googleMap');
  placeMarkerButton = document.querySelector('.placeMarkerButton');
  displayAddress = document.querySelector('.addressDisplay');

  constructor() { 

    this.googleMap.classList.remove('hidden');
    this.placeMarkerButton.classList.remove('hidden');
    this.displayAddress.classList.remove('hidden');
    

  }

  ngOnInit(): void {
  }

}
