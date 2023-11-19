import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // googleMapOpenClose: Boolean = false;
  createEventVisible: boolean = false;
  googleMapEventVisible: boolean = false;
  calenderMapEventVisible: boolean = false;

  
  googleRouterLink = document.querySelector('.routerLink');
  
  
  constructor() { 

  }


  ngOnInit(): void {
  }
  onClick(): void {
    alert('blah');
  }

  openSaysMe(linkText: string): void {
    console.log(`remove classList of ${linkText}`);

    
    if (linkText === 'Create Event' && this.createEventVisible == false) {
      this.createEventVisible = true;
    } else if ( linkText === 'Create Event' && this.createEventVisible == true) {
      this.createEventVisible = false;
    }

    if (linkText === 'Google Map' && this.googleMapEventVisible == false) {
      this.googleMapEventVisible = true;
    } else if ( linkText === 'Google Map' && this.googleMapEventVisible == true) {
      this.googleMapEventVisible = false;
    }

    if (linkText === 'Calender' && this.calenderMapEventVisible == false) {
      this.calenderMapEventVisible = true;
    } else if ( linkText === 'Calender' && this.calenderMapEventVisible == true) {
      this.calenderMapEventVisible = false;
    }
  }

  


}
