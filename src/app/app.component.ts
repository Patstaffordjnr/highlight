import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './util/auth.service';
import { User } from './model/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'highlight';

  constructor(private http: HttpClient, private authService: AuthService) {}

  async ngOnInit() {
    try {
      const user = await this.http.get<User>(`${environment.apiUrl}/api/auth/me`, { withCredentials: true }).toPromise();
      if (user) {
        this.authService.login(user);
      }
    } catch {
      // Not logged in — nothing to restore
    }
  }
}
