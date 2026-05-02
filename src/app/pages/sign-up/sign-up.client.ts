import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequest } from './sign-up-request';
import { SignUpResponse } from './sign-up-response';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SignUpClient {


  constructor(private http: HttpClient ) {
  }

  
  async whoAmI(){    
    let response = await this.http.get<any>(`${environment.apiUrl}/user/whoAmI`, { withCredentials: true }).toPromise();
    console.log(response)
  }

  async signIn(signUpRequest: SignUpRequest): Promise<boolean> {
      const url = `${environment.apiUrl}/open/signUp`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      await this.http.post(url, JSON.stringify(signUpRequest), { headers }).toPromise();
      return true;
  }


}