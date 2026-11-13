import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from './can-activate.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class RouterService {
  constructor(
    protected router: Router,
    private currentUserService: CurrentUserService,
    private http: HttpClient
  ) {}

  toHomePage() {
    this.router.navigate(['/home']);
  }

  async clearCookie(): Promise<void> {
    await this.http.get<any>(`${environment.apiUrl}/api/auth/logout`, { withCredentials: true }).toPromise();
  }

  async toLogoutPage(): Promise<void> {
    this.clearCookie();
    this.currentUserService.setUser(null);
    this.toHomePage();
  }
}
