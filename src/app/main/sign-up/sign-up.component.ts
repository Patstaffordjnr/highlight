import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/util/shared.service';
import { UserService } from 'src/app/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  userRoles = ['Busker', 'User', 'Admin'];
  userRole;
  roleSelected = false;
  roles = [];

  isCheckboxDisabled = false;
  isTextDisabled = false;

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      email: String,
      password: String,
      userRoles: [''],
    });
  }

  ngOnInit(): void {}


  onSubmit() {
    const role = this.userForm.get('userRoles').value;
    this.sharedService.updateUser(role);
    this.sharedService.updateFormData(this.userForm.value);
  
    const url = 'http://localhost:8083/open/register';
  
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Add other headers if needed
    });
  
    const body = {
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value,
      roles: this.userForm.get('userRoles').value,
    };
  
    this.userService.makePostRequest(url, headers, body);
  }



  // UserRegisterDTO(override val email: String, override var password: CharSequence, val roles: Set<UserRole>):
  // UserLoginDTO(email, password)



  onRoleClick(role: string) {
      this.userRole = role;
      this.sharedService.updateRole(role);

      if(this.roles.includes(role)) {
       this.roles.splice(this.roles.indexOf(role), 1);
      } else {
        this.roles.push(role)
      }
      console.log(this.roles);
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
