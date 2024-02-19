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
 
  constructor(private formBuilder: FormBuilder, private loginClient: LoginClient, private routerService: RouterService) { 
    this.form = this.formBuilder.group({
      email: ['dumb@dumb.com', [Validators.required, Validators.email]],
      password: ['dumb', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {

  }

  generateRequest(): LoginRequest {
    return new LoginRequest(this.form.get('email').value, this.form.get('password').value)
  }

  async onSubmit() {
    var loggedInUser = await this.loginClient.logIn(this.generateRequest());
    if(loggedInUser) {
      this.routerService.setUser(loggedInUser);
      this.routerService.toHomePage();
    }  
  }

  async getForbidden() {
    await this.loginClient.getForbidden();
  }
  
}
