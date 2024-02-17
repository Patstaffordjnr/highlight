import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { LogInService } from './log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  // imports: [NgFor, ReactiveFormsModule, JsonPipe],
})
export class LogInComponent implements OnInit {

  
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required, Validators.min(4)],
  });


  constructor(private formBuilder: FormBuilder, private logInService: LogInService ) { 
   
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
