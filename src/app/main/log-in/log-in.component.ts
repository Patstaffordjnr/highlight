import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogInService } from './log-in.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userDTO: FormGroup;


  constructor(private formBuilder: FormBuilder, private logInService: LogInService ) { 
    this.userDTO = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {


    // console.log(`Email: ${this.userForm.value.email}, Password: ${this.userForm.value.password}`);
    // console.log(this.userD.value);

    this.logInService.loggingInService(this.userDTO);
      // this.authClientService.updateUserSignIn(this.userForm.value);
    

  }

}
