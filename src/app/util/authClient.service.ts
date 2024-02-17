import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthClientService {

  userDTO = { 
    email: 'dumb',
    password: 'dumb',
    roles: [],
  }

  private userSignIn = new BehaviorSubject<any>(null);
  userSignIn$ = this.userSignIn.asObservable();

  constructor(private http: HttpClient) {
  }

  async updateUserSignIn(userSignIn: any): Promise<any>{
    debugger;

    // await this.http.get<any>("http://localhost:8085/csrf").toPromise();

    this.userSignIn.next(userSignIn);

    this.userDTO = { 
      email: userSignIn.email,
      password: userSignIn.password,
      roles: userSignIn.roles,
    }

    const url = 'http://localhost:8085/open/register'
    let response = await this.http.post<any>(url, this.userDTO).toPromise();
    this.userDTO.email = response.email;
    this.userDTO.password =  response.password;
    this.userDTO.roles = response.roles;

    let registeredUser = [this.userDTO.email, this.userDTO.password]
    console.log(`Response:`,registeredUser, response.roles);

    return this.http.post<any>(url, this.userDTO);
  }


}

