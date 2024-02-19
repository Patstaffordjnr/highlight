import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';


@Injectable()
export class RouterService {

  private user: User = null;

  constructor(protected router: Router) {

  }

  setUser(user: User) {
    this.user = user;
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }


  toHomePage() {
    this.router.navigate(['/home']);
  }
  
  async toLogoutPage(): Promise<void> {
    this.user = null;
    this.toLoginPage();
  }


  async toAdminHomePage(): Promise<void> {
    this.router.navigate(['/admin/home']);
  }

}

