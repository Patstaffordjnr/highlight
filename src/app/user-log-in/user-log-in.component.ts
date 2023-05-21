import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {


  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });


  username: string;
  password: string;
  
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }

  login(): void {
    // Perform login logic, e.g., authentication with a server
    // Assuming the login is successful, set the current user using the user service
    this.userService.setCurrentUser(this.username);

    // Clear the username and password fields
    this.username = '';
    this.password = '';

    // Redirect or perform other actions after successful login
  }



}
