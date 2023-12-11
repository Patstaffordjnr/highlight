import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  userForm: FormGroup;

  
  constructor(private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userId: new FormControl(''),
      userDob: new FormControl(''),
      userPassword: new FormControl(''),
      userPasswordConfirmation: new FormControl(''),
      userRole: new FormControl(''),
      email: new FormControl(''),
      emailConfirmation: new FormControl(''),
    })
  
   }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log('USER:', this.userForm.value);
    // console.log(`USER`);
  }
}
