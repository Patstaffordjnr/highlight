import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  form: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    this.errorMessage = '';
    this.loading = true;
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      await this.http.post(`${environment.apiUrl}/open/forgot-password`, { email: this.form.get('email')!.value }, { headers }).toPromise();
      this.submitted = true;
    } catch {
      this.submitted = true;
    } finally {
      this.loading = false;
    }
  }
}
