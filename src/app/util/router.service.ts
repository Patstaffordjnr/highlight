import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CurrentUserService } from './can-activate.service';


@Injectable()
export class RouterService {

  constructor(protected router: Router, private currentUserService: CurrentUserService) {

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
  
  async toLogoutPage(): Promise<void> {
    this.currentUserService.setUser(null);
    this.toLoginPage();
  }


  async toAdminHomePage(): Promise<void> {
    this.router.navigate(['/admin/home']);
  }

}

