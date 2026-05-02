import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { SignUpClient } from './sign-up.client';
import { UserRole } from 'src/app/model/user-roles';
import { SignUpRequest } from './sign-up-request';
import { minSelectedCheckboxes } from '../../util/validators/checkbox-validator';
import { RouterService } from 'src/app/util/router.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  visibleRoles = [UserRole.USER, UserRole.BUSKER];

  roleLabels: Record<string, string> = {
    [UserRole.USER]: 'Music Fan',
    [UserRole.BUSKER]: 'Busker / Performer',
  };

  constructor(private formBuilder: FormBuilder, private signUpClient: SignUpClient, private routerService: RouterService) {
    this.form = this.formBuilder.group({
      email: ['123@123.ie', [Validators.required, Validators.email]],
      password: ['qwertyu!}', [Validators.required, Validators.minLength(8)]],
      userRoles: new FormArray([], minSelectedCheckboxes(1))
    });
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.visibleRoles.forEach((_, i) => this.userRolesFormArray.push(new FormControl(i === 0)));
  }

  get userRolesFormArray() {
    return this.form.controls['userRoles'] as FormArray;
  }

  generateRequest(): SignUpRequest {
    const selectedRoles: UserRole[] = this.userRolesFormArray.value
      .map((checked: boolean, i: number) => checked ? this.visibleRoles[i] : null)
      .filter((v: UserRole | null) => v !== null);
    return new SignUpRequest(this.form.get('email').value, selectedRoles, this.form.get('password').value);
  }

  ngOnInit(): void {}

  async onSubmit() {
    this.errorMessage = '';
    this.loading = true;
    try {
      const successful = await this.signUpClient.signIn(this.generateRequest());
      if (successful) {
        this.routerService.toLoginPage();
      } else {
        this.errorMessage = 'Sign up failed. Please try again.';
      }
    } catch {
      this.errorMessage = 'Something went wrong. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
