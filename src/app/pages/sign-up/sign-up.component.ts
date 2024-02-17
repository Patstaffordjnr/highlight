import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { UserRole } from 'src/app/model/user-role';
import { SignUpRequest } from './sign-up-request';
import { minSelectedCheckboxes } from 'src/app/util/validators/checkbox-validator';


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

  signUpRequest = new SignUpRequest('dumb@dumb.com', [UserRole.ADMIN, UserRole.BUSKER, UserRole.USER], 'dumb')  
 
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService ) { 
    this.form = this.formBuilder.group({
      email: [this.signUpRequest.email, [Validators.required, Validators.email]],
      password: [this.signUpRequest.password, [Validators.required, Validators.minLength(4)]],
      userRoles: new FormArray([], minSelectedCheckboxes(1))
    });
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.allUserRoles.forEach(userRole => this.userRolesFormArray.push(new FormControl(
      this.signUpRequest.roles.includes(UserRole[userRole]))));
  }

  onUserRoleUpdate(event: Event): void {
    var checkBoxEvent = event.target as HTMLInputElement
    var roleClicked = UserRole[checkBoxEvent.value]
    if(checkBoxEvent.checked) {
      this.signUpRequest.roles.push(roleClicked)
    } else {
      this.signUpRequest.roles = this.signUpRequest.roles.filter((e, i) => e !== roleClicked); 
    }
  }

  get userRolesFormArray() {
    return this.form.controls.userRoles as FormArray;
  }

  ngOnInit(): void {
  }

  onSubmit() {
  }  
  
}
