import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  signUpRequest = new SignUpRequest('dumb@dumb.com', [UserRole.ADMIN,  UserRole.USER], 'dumb')


  signUpForm = this.formBuilder.group({
    email: [this.signUpRequest.email, [Validators.required, Validators.email]],
    password: [this.signUpRequest.password, [Validators.required, Validators.minLength(4)]],
    roles: [this.signUpRequest.roles, new FormArray([], [Validators.required])],
  });
 
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService ) { 
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

  ngOnInit(): void {
  }


  onSubmit() {

  }

  isChecked(userRole: UserRole): Boolean {
    return this.signUpRequest.roles.includes(userRole)
  }
}