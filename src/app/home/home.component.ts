import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // googleRouterLink = document.querySelector('.routerLink');

  googleMap = document.querySelector('.googleMap');
  placeMarkerButton = document.querySelector('.placeMarkerButton');
  displayAddress = document.querySelector('.addressDisplay');
  

  constructor() { 

    // console.log(this.googleRouterLink);
    this.googleMap.classList.add('hidden');
    this.placeMarkerButton.classList.add('hidden');
    this.displayAddress.classList.add('hidden');
  
  }

  ngOnInit(): void {
  }


}
