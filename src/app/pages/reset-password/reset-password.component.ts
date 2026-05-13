import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  success: boolean = false;
  private token: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) {
      this.errorMessage = 'Invalid or missing reset token.';
    }
  }

  async onSubmit() {
    const newPassword = this.form.get('newPassword')!.value;
    const confirmPassword = this.form.get('confirmPassword')!.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.errorMessage = '';
    this.loading = true;
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      await this.http.post(`${environment.apiUrl}/open/reset-password`, { token: this.token, newPassword }, { headers }).toPromise();
      this.success = true;
    } catch (err: any) {
      this.errorMessage = err?.error || 'The reset link is invalid or has expired.';
    } finally {
      this.loading = false;
    }
  }
}
