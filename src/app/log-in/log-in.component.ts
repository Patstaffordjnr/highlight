import { Component } from '@angular/core';
import { LoginRequest } from './login-request';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginClient } from './log-in.client';
// import { RouterService } from ''

@Component({
  selector: 'app-log-in',
  // standalone: true,
  // imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})  // await this.routerService.clearCookie();
export class LogInComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginClient: LoginClient) {

    this.form = this.formBuilder.group({
      email: ['busker@dumb.com'],
      password: ['dumb'],
    });

  }

// async onSubmit(){
//   console.log(this.form);
//   let a = await this.login(this.form.value).subscribe((response: any) => {
//     // console.log(response);
//   })
// console.log(a);

// }

// login(data: { email: string; password: string }) {
//   return this.http.post('http://localhost:8085/api/auth/login', data);
// }


ngOnInit(): void {

}

generateRequest(): LoginRequest {
  return new LoginRequest(this.form.get('email').value, this.form.get('password').value)
}

async onSubmit() {
  var loggedInUser = await this.loginClient.logIn(this.generateRequest());
  // if(loggedInUser) {
  //   this.routerService.setUser(loggedInUser);
  //   this.routerService.toHomePage();
  // }  
}

async getForbidden() {
  await this.loginClient.getForbidden();
}

async clearCookie() {
  // await this.routerService.clearCookie();
}



}
