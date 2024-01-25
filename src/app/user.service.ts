import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: string;

  constructor(private httpClient: HttpClient) {
    // Initialize any necessary data or dependencies
  }

  makePostRequest(url: string, headers: HttpHeaders, body: any): Promise<any> {
    return this.httpClient.post(url, body, { headers }).toPromise();
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  setCurrentUser(user: string): void {
    this.currentUser = user;
  }
}