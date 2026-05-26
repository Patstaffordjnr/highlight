import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { CurrentUserService } from './can-activate.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private currentUserService: CurrentUserService, private http: HttpClient) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  login(user: User) {
    this.currentUserService.setUser(user);
    this.loggedIn.next(true);
  }

  logout() {
    this.currentUserService.clearUser();
    this.loggedIn.next(false);
  }

  getUser(): User | null {
    return this.currentUserService.getUser();
  }

  restoreSession(): Promise<void> {
    return this.http
      .get<User>(`${environment.apiUrl}/user/whoAmI`, { withCredentials: true })
      .toPromise()
      .then(user => { if (user) this.login(user); })
      .catch(() => {});
  }
}
