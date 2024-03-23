import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class EventsClient {


  constructor(private http: HttpClient) {

    console.log(`Yo`);
  }

  

  async getEvents(currentPage: Number, noOfProducts: Number): Promise<any>{    
    let url =  'http://localhost:8085/' ;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });      
    return await this.http.post<any>(url, JSON.stringify([currentPage, noOfProducts]), { withCredentials: true, headers: headers}).toPromise();
}
    
  }

