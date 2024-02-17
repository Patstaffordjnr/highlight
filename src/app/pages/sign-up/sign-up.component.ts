import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { UserRole } from 'src/app/model/user-role';
import { SignUpRequest } from './sign-up-request';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  allUserRoles = Object.keys(UserRole).filter((item) => {
      return isNaN(Number(item));
  });

  signUpRequest = new SignUpRequest('', [], '')

  signUpForm = this.formBuilder.group({
    email: [this.signUpRequest.email, [Validators.required, Validators.email]],
    password: [this.signUpRequest.password, [Validators.required, Validators.minLength(4)]],
    roles: [this.signUpRequest.roles, new FormArray([], [Validators.required])],
  });
 
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService ) { 
    this.signUpRequest = new SignUpRequest('', [], '')
  }
  
  onUserRoleUpdate(event: Event): void {
    var checkBoxEvent = event.target as HTMLInputElement
    console.log(UserRole[checkBoxEvent.value])
    var roleClicked = UserRole[checkBoxEvent.value]
    if(checkBoxEvent.checked) {
      this.signUpRequest.roles.push(roleClicked)
    } else {
      this.signUpRequest.roles.splice(roleClicked, 1);
    }
    console.log(this.signUpRequest.roles)
  }

  ngOnInit(): void {
  }


  onSubmit() {

  }
}