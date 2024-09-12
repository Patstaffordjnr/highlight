import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { SignUpClient } from '../sign-up/sign-up.client';
import { UserRole } from 'src/app/model/user-roles';
import { SignUpRequest } from '../sign-up/sign-up-request';
import { minSelectedCheckboxes } from '../util/validators/checkbox-validator';
import { RouterService } from 'src/app/util/router.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  allUserRoles = Object.keys(UserRole).filter((item) => {
      return isNaN(Number(item));
  });
 
  constructor(private formBuilder: FormBuilder, private signUpClient: SignUpClient, private routerService: RouterService) { 
    this.form = this.formBuilder.group({
      email: ['busker@dumb.com', [Validators.required, Validators.email]],
      password: ['dumb', [Validators.required, Validators.minLength(4)]],
      userRoles: new FormArray([], minSelectedCheckboxes(1))
    });
    this.addCheckboxes();
  }

  generateRequest(): SignUpRequest {
    const selectedRoled: UserRole[] = this.form.get('userRoles').value.filter((value) => value == true).map((value, index) => { 
      return Object.keys(UserRole)[index];
    })
    return new SignUpRequest(this.form.get('email').value, 
      selectedRoled, 
      this.form.get('password').value)
  }


  private addCheckboxes() {
    this.allUserRoles.forEach(userRole => this.userRolesFormArray.push(new FormControl(
      [UserRole.ADMIN, UserRole.BUSKER, UserRole.USER].includes(UserRole[userRole]))));
  }

  get userRolesFormArray() {
    return this.form.controls.userRoles as FormArray;
  }

  ngOnInit(): void {

  }

  async onSubmit() {
    var successful = await this.signUpClient.signIn(this.generateRequest());
    if(successful) {
      this.routerService.toLoginPage()
    } else {
      alert('something wrong')
    }
  }  
  
}