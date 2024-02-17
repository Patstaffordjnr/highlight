import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { SignUpService } from './sign-up.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  signUpForm = this.formBuilder.group({
    email: ['dumb@dumb.com', [Validators.required, Validators.email]],
    password: ['dumb', [Validators.required, Validators.minLength(4)]],
  });
 
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService ) { 
   
  }


  ngOnInit(): void {
  }


  onSubmit() {

  }
}