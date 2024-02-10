import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

async loggingInService(userDTO){
    console.log(`Email: ${userDTO.value.email}, Password: ${userDTO.value.password}`);

    this.userDTO = { 
        email: userDTO.value.email,
        password:  userDTO.value.password,
      }
    let url =  'http://localhost:8085/api/auth/login' ;


    let response = await this.http.post<any>(url, this.userDTO).toPromise();
    console.log(response);

}


}
