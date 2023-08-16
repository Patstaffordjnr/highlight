import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Output() addressClicked = new EventEmitter<string>();


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
