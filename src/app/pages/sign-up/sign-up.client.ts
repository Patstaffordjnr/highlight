import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequest } from './sign-up-request';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SignUpClient {


  constructor(private http: HttpClient ) {
  }

  async signIn(signUpRequest: SignUpRequest): Promise<boolean> {
      const url = `${environment.apiUrl}/open/signUp`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      await this.http.post(url, JSON.stringify(signUpRequest), { headers }).toPromise();
      return true;
  }


}