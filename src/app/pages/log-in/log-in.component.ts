import { Component } from '@angular/core';
import { LoginRequest } from './login-request';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginClient } from './log-in.client';
import { RouterService } from 'src/app/util/router.service';
import { AuthService } from 'src/app/util/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})  
export class LogInComponent {

  form: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginClient: LoginClient, private routerService: RouterService, private authService: AuthService) {

    this.form = this.formBuilder.group({
      email: ['123@123.ie'],
      password: ['qwertyu!}'],
    });
  }

ngOnInit(): void {}

generateRequest(): LoginRequest {
  return new LoginRequest(this.form.get('email').value, this.form.get('password').value)
}

async onSubmit() {
  this.errorMessage = '';
  this.loading = true;
  try {
    const loggedInUser = await this.loginClient.logIn(this.generateRequest());
    if (loggedInUser) {
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


}
