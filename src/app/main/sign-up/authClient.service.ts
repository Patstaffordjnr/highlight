import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {

  private userSignInFormData = new BehaviorSubject<any>(null);
  userSignIn$ = this.userSignInFormData.asObservable();

  constructor(private http: HttpClient) {
  }

  async updateUserSignIn(userSignIn: any): Promise<any>{
    this.userSignInFormData.next(userSignIn);

    let userDetails = { 
      email: userSignIn.email,
      password: userSignIn.password,
      roles: userSignIn.roles,
    }
    
    const url = 'http://localhost:8085/open/register'
    let response = await this.http.post<any>(url, userDetails).toPromise();

    console.log(`Email: ${response.email}, Password: ${response.password}, Roles: ${response.roles}`);
    return this.http.post<any>(url, userDetails);
  }


}
