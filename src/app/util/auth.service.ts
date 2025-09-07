import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { CurrentUserService } from './can-activate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private currentUserService: CurrentUserService) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  login(user: User) {
    this.currentUserService.setUser(user);
    this.loggedIn.next(true);

    console.log('✅ Logged In:', user);
  }

  logout() {
    this.currentUserService.clearUser();
    this.loggedIn.next(false);

    console.log('🚪 Logged Out');
  }

  getUser(): User | null {
    return this.currentUserService.getUser();
  }
}
