import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRole } from '../model/user-roles';
import { CurrentUserService } from './can-activate.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Initialize as not logged in
 
  constructor(private currentUserService: CurrentUserService) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  // Login method
 async login() {
    this.loggedIn.next(true);
    console.log('Logged In');
    console.log(this.loggedIn.value);

  }

  // Logout method
  logout() {
    this.loggedIn.next(false);
    console.log('Logged Out');
    console.log(this.loggedIn.value);
  }
}
