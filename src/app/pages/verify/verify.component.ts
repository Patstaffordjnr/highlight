import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit {
  state: 'loading' | 'success' | 'error' = 'loading';
  errorMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.state = 'error';
      this.errorMessage = 'No verification token found in the link.';
      return;
    }
    this.http.get(`${environment.apiUrl}/open/verify`, { params: { token }, withCredentials: true })
      .subscribe({
        next: () => this.state = 'success',
        error: (err) => {
          this.state = 'error';
          this.errorMessage = err?.error?.message || 'This link is invalid or has already been used.';
        }
      });
  }
}
