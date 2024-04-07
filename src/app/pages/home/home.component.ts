import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginClient } from '../log-in/log-in.client';
import { RouterService } from 'src/app/util/router.service';
import { UserInterfaceNavComponent } from '../user-interface-nav/user-interface-nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// ---------------------------------------------------------

calenderEventVisible: boolean = false; 
googleMapEventVisible: boolean = false; 
createEventEventVisible: boolean = false; 

eventsEventVisible: boolean = false; 

eventTableVisible: boolean = false;

// ---------------------------------------------------------
   userDTO = {
    email: '',
    password: '', 
    }

    roles: '';
    token: '';
    id:'';

  googleRouterLink = document.querySelector('.routerLink');
  
  constructor(private httpClient: HttpClient, private routerService: RouterService) { 
  }

  makePostRequest(url: string, headers: HttpHeaders): Promise<any> {
    return this.httpClient.post(url, { headers }).toPromise();
  }
  ngOnInit(): void {
  }
    

// -----------------------------------------------

openCalender() {
  this.calenderEventVisible = !this.calenderEventVisible
}
openGoogleMap() {
  this.googleMapEventVisible = !this.googleMapEventVisible;
}
openCreateEvent() {
  this.createEventEventVisible = !this.createEventEventVisible;
}
openEvents() {
  this.eventsEventVisible = !this.eventsEventVisible;
}

openEventTable() {
  this.eventTableVisible = !this.eventTableVisible;
}



// ------------------------------------------------



  async toAdminHomePage(): Promise<void> {
    this.routerService.toAdminHomePage();
  }

  async logOff(): Promise<void> {
    this.routerService.toLogoutPage();
  }

  async toCreateEventPage(): Promise<void> {
    this.routerService.toCreateEventPage();
  }
  async toGoogleMapPage(): Promise<void> {
    this.routerService.toGoogleMapsPage();
  }
  async toEventsPage(): Promise<void> {
    this.routerService.toEventsPage();
  }
}
