import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from './login-request';

@Injectable({
  providedIn: 'root',
})

export class LogInService {

  userDTO = { 
    email: '',
    password: '',
  }


  constructor(private http: HttpClient ) {
  }

  
  async whoAmI(){    
    let response = await this.http.get<any>("http://localhost:8085/user/whoAmI", { withCredentials: true }).toPromise();
    console.log(response)
  }

async loggingInService(loginRequest: LoginRequest){

    // let response2 = await this.http.get<any>("http://localhost:8085/csrf").toPromise();

    // console.log(`Email: ${userDTO.value.email}, Password: ${userDTO.value.password}`);

    // this.userDTO = { 
    //     email: userDTO.value.email,
    //     password:  userDTO.value.password,
    //   }
    // let url =  'http://localhost:8085/api/auth/login' ;


    // let response = await this.http.post<any>(url, this.userDTO, { withCredentials: true }).toPromise();
    // console.log(response);

}


}
