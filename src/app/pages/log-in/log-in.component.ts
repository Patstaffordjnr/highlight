import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { LoginClient } from './log-in.client';
import { LoginRequest } from './login-request';
import { RouterService } from 'src/app/util/router.service';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
 
  form: FormGroup;
  loginRequest = new LoginRequest('dumb@dumb.com', 'dumb')  
 
  constructor(private formBuilder: FormBuilder, private loginClient: LoginClient, private routerService: RouterService) { 
    this.form = this.formBuilder.group({
      email: [this.loginRequest.email, [Validators.required, Validators.email]],
      password: [this.loginRequest.password, [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {

  }

  async onSubmit() {
    var loggedInUser = await this.loginClient.logIn(this.loginRequest);
    if(loggedInUser) {
      this.routerService.setUser(loggedInUser);
      this.routerService.toHomePage();
    }  
  }

  async getForbidden() {
    await this.loginClient.getForbidden();
  }
  
}
