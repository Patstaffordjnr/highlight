import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      email: [''],
      password: [''],
      roles: this.roles,
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userForm.patchValue({
      roles: this.roles
    });
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