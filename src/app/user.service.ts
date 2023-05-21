import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: string;

  constructor() {
    // Initialize any necessary data or dependencies
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  setCurrentUser(user: string): void {
    this.currentUser = user;
  }
}
