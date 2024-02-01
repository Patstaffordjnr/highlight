import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/util/shared.service';
import { UserService } from 'src/app/user.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthClientService } from './authClient.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  userRoles = ['BUSKER', 'USER', 'ADMIN'];
  userRole;
  roleSelected = false;
  roles = [];

  isCheckboxDisabled = false;
  isTextDisabled = false;

  constructor(private authClientService: AuthClientService, private formBuilder: FormBuilder, private sharedService: SharedService, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      email: [''],
      password: [''],
      roles: this.roles,
    });
  }

  ngOnInit(): void {

    this.authClientService.signInMethod$.subscribe((authorized) => {
      if (authorized) {
      } else {
      }
    });

    this.authClientService.helloAuthClientBuoyMethod$.subscribe((authorized) => {
      if (authorized) {
        console.log("Hello World");
      } else {
      }
    });
  }


  onSubmit() {


    // console.log(this.userForm);

    this.userForm.patchValue({
      roles: this.roles
    });

    let data = this.userForm.value;
    // console.log(a);
    this.authClientService.updateUserSignIn(data);
    // console.log(this.authClientService.updateUserSignIn(a));


this.authClientService.signInMethod(true);
this.authClientService.helloAuthClientBuoyMethod(true);

    const role = this.userForm.get('roles').value;
    this.sharedService.updateUser(role);
    this.sharedService.updateFormData(this.userForm.value);
  
    const url = 'http://localhost:8085/open/register';
  
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Add other headers if needed
    });

  
    const body = {
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value,
      roles: this.userForm.get('roles').value,
    };
  
    this.userService.makePostRequest(url, headers, body);

    // console.log(body);
  }

  onRoleClick(role: string) {

    this.userRole = role;
    this.sharedService.updateRole(role);

  
    if (this.roles.includes(role)) {
      this.roles.splice(this.roles.indexOf(role), 1);
    } else {
      this.roles.push(role);
    }
  
    this.isCheckboxDisabled = true;
    this.isTextDisabled = true;
  }

  updateRole(role: string): void {
    this.userRole = role;
    this.sharedService.updateRole(role);
    this.userForm.patchValue({
      userRoles: this.userRole
    });
    this.isCheckboxDisabled = true;
    this.isTextDisabled = true;
  }
}
