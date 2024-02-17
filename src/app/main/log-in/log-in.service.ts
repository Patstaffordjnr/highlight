import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LogInService {
 private updatedUser = new BehaviorSubject<any>(null);
 updatedUser$ = this.updatedUser.asObservable();

  constructor(private http: HttpClient ) {
  }

  updateUser(registeredUser) {
    this.updatedUser.next(registeredUser);
  }


async loggingInService(userDTO){

    userDTO = { 
        email: userDTO.value.email,
        password:  userDTO.value.password,
      }
    let url =  'http://localhost:8085/api/auth/login' ;

    let response = await this.http.post<any>(url, userDTO).toPromise();

    let registeredUser = {
    email: response.email,
    password: response.password, 
    roles: response.roles,
    token: response.token,
    id:response.id,
    }

    this.updateUser(registeredUser);
}

}
