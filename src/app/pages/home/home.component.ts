import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginClient } from '../log-in/log-in.client';
import { RouterService } from 'src/app/util/router.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
