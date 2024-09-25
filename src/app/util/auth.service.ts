import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Initialize as not logged in

  constructor() {}

  // Observable to expose the logged-in state
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Check if the user is authenticated (for internal use)
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  // Login method
  login() {
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
