import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthClientService } from './authClient.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  userRoles = ['BUSKER', 'USER', 'ADMIN'];
  userRole;
  roles = [];

  isCheckboxDisabled = false;
  isTextDisabled = false;

  constructor(private authClientService: AuthClientService, private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      email: ['dumb'],
      password: ['dumb'],
      roles: this.roles,
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {

    this.userForm.patchValue({
      roles: this.roles
    });
    
    this.authClientService.updateUserSignIn(this.userForm.value);
  }

  onRoleClick(role: string) {

    this.userRole = role;

    if (this.roles.includes(role)) {
      this.roles.splice(this.roles.indexOf(role), 1);
    } else {
      this.roles.push(role);
    }

  }
}