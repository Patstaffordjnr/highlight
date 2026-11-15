import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './login-request';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginClient } from './log-in.client';
import { RouterService } from 'src/app/util/router.service';
import { AuthService } from 'src/app/util/auth.service';

const REMEMBERED_EMAIL_KEY = 'highlight.rememberedEmail';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginClient: LoginClient,
    private routerService: RouterService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
      rememberMe: [false],
    });
  }

  ngOnInit() {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (rememberedEmail) {
      this.form.patchValue({ email: rememberedEmail, rememberMe: true });
    }
  }

  generateRequest(): LoginRequest {
    return new LoginRequest(
      this.form.get('email').value,
      this.form.get('password').value,
      !!this.form.get('rememberMe').value
    );
  }

  async onSubmit() {
    this.errorMessage = '';
    this.loading = true;
    try {
      const loggedInUser = await this.loginClient.logIn(this.generateRequest());
      if (loggedInUser) {
        this.rememberEmail();
        this.authService.login(loggedInUser);
        this.routerService.toHomePage();
      } else {
        this.errorMessage = 'Invalid email or password.';
      }
    } catch {
      this.errorMessage = 'Invalid email or password.';
    } finally {
      this.loading = false;
    }
  }

  private rememberEmail() {
    const email = String(this.form.get('email').value || '').trim();
    if (this.form.get('rememberMe').value && email) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }
  }
}
