import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  componentVisibility = {
    register: { visible: false, fontSize: '20px', textAlign: 'center' },
    logIn: { visible: false, fontSize: '20px', textAlign: 'center' },
    createEvent: { visible: false, fontSize: '20px', textAlign: 'center' },
    googleMap: { visible: false, fontSize: '20px',  textAlign: 'center'},
    eventsDisplpay: { visible: false, fontSize: '20px',textAlign: 'center' },
    user: { visible: false, fontSize: '20px',textAlign: 'center' },
    editUser: { visible: false, fontSize: '20px',textAlign: 'center' },
    calendar: { visible: false, fontSize: '20px', textAlign: 'center' }, // Corrected spelling
  };

  googleRouterLink = document.querySelector('.routerLink');
  
  
  constructor() { 

  }


  ngOnInit(): void {
  }
  onClick(): void {
    alert('click');
  }

  openSaysMe(component: string): void {
    // console.log(`remove classList of ${component}`);

    // Toggle the visibility of the selected component
    this.componentVisibility[component].visible = !this.componentVisibility[component].visible;

    // Toggle the font size along with visibility
    this.componentVisibility[component].fontSize = this.componentVisibility[component].visible ? '16px' : '20px';

  }
}
