import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CurrentUserService } from './can-activate.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RouterService {

  constructor(protected router: Router, private currentUserService: CurrentUserService, private http: HttpClient) {

  }

  setUser(user: User) {
    this.currentUserService.setUser(user);
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }


  toHomePage() {
    this.router.navigate(['/home']);
  }

  toGoogleMapsPage() {
    this.router.navigate(['/googlemap']);
  }


  toSignUpPage() {
    this.router.navigate(['/signup']);
  }

  toCreateEventPage() {
    this.router.navigate(['/createevent']);
  }

  toEventsPage() {
    this.router.navigate(['/events']);
  }

  toEventTablePage() {
    this.router.navigate(['/eventtable']);
  }

  async clearCookie(): Promise<void> {
    let response = await this.http.get<any>("http://localhost:8085/api/auth/logout", { withCredentials: true }).toPromise();
  }
  
  async toLogoutPage(): Promise<void> {    
    this.clearCookie();
    this.currentUserService.setUser(null);
    this.toLoginPage();
  }


  async toAdminHomePage(): Promise<void> {
    this.router.navigate(['/admin/home']);
  }

}

