import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoginRequest } from './login-request';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class LoginClient {


  constructor(private http: HttpClient) {
  }

  
  async whoAmI(){    
    let response = await this.http.get<any>(`${environment.apiUrl}/user/whoAmI`, { withCredentials: true }).toPromise();
    console.log(response)
  }

  async logIn(loginRequest: LoginRequest): Promise<User>{    
      let url = `${environment.apiUrl}/api/auth/login`;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });      

      return await this.http.post<User>(url, JSON.stringify(loginRequest), { withCredentials: true, headers: headers}).toPromise();
  }

  async getForbidden(){    
    let response = await this.http.get<any>(`${environment.apiUrl}/open/getForbidden`, { withCredentials: true }).toPromise();
    console.log(response)
    
  }



}