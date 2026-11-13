import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SignUpClient } from './sign-up.client';
import { UserRole } from 'src/app/model/user-roles';
import { SignUpRequest } from './sign-up-request';

function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
    return { passwordStrength: true };
  }
  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private signUpClient: SignUpClient) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator]],
      isBusker: [false]
    });
  }

  generateRequest(): SignUpRequest {
    const roles: UserRole[] = [UserRole.USER];
    if (this.form.get('isBusker').value) {
      roles.push(UserRole.BUSKER);
    }
    return new SignUpRequest(this.form.get('email').value, roles, this.form.get('password').value);
  }

  async onSubmit() {
    this.errorMessage = '';
    this.loading = true;
    try {
      await this.signUpClient.signIn(this.generateRequest());
      this.submitted = true;
    } catch (err: any) {
      const msg = err?.error?.message || err?.error || null;
      if (err?.status === 409) {
        this.errorMessage = 'An account with this email already exists.';
      } else if (msg) {
        this.errorMessage = msg;
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }
}
