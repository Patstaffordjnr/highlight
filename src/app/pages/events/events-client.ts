import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Event } from 'src/app/model/event';

@Injectable({
  providedIn: 'root',
})

export class EventsClient {


  constructor(private http: HttpClient) {

    console.log(`Yo`);
  }

  

  async getEvents(currentPage: Number, noOfProducts: Number): Promise<Event[]>{    
    let url =  'http://localhost:8085/busker/getEvents?pageNumber=1&pageSize=10' ;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });      
    return this.http.get<Event[]>(url, { withCredentials: true, headers: headers}).toPromise();
}
    
  }

