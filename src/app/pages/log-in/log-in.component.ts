import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogInService } from './log-in.service'
import { LoginRequest } from './login-request';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {

  loginRequest: LoginRequest
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private logInService: LogInService ) { 
    this.loginForm = this.formBuilder.group({
      email: 'dumb',
      password: 'dumb',
    });
  }

  ngOnInit(): void {
  }

  whoAmI() {
    this.logInService.whoAmI();
  }

  onSubmit() {

    // this.logInService.loggingInService(this.userDTO);
      // this.authClientService.updateUserSignIn(this.userForm.value);
    

  }

}
