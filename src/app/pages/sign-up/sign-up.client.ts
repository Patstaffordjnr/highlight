import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequest } from './sign-up-request';
import { SignUpResponse } from './sign-up-response';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class SignUpClient {


  constructor(private http: HttpClient ) {
  }

  
  async whoAmI(){    
    let response = await this.http.get<any>("http://localhost:8085/user/whoAmI", { withCredentials: true }).toPromise();
    console.log(response)
  }

  async signIn(signUpRequest: SignUpRequest): Promise<Boolean>{
    
      let url =  'http://localhost:8085/open/signUp' ;

      debugger;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
      var boom = await this.http.post<SignUpResponse>(url, JSON.stringify(signUpRequest), { withCredentials: true, headers: headers}).toPromise();

      debugger;

      return true;
  }


}
