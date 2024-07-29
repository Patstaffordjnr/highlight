import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Event } from 'src/app/model/event';

@Injectable({
  providedIn: 'root',
})

export class EventsClient {

  constructor(private http: HttpClient) {

  }

  
  async getEvents(currentPage: Number, noOfProducts: Number): Promise<{}>{ 
    
    let params = new HttpParams().set("pageNumber",1).set("pageSize", 8);


    let url =  `http://localhost:8085/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}` ;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });      
    
    return this.http.get<{}>(url, {withCredentials: true, headers: headers, params: params}).toPromise();
    
  }

  // async getEventsGenreControl(currentPage: Number, noOfProducts: Number): Promise<{}>{ 
    
  //   let params = new HttpParams().set("pageNumber",1).set("pageSize", 10);


  //   let url =  `http://localhost:8085/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}` ;
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });      
    
  //   return this.http.get<{}>(url, {withCredentials: true, headers: headers, params: params}).toPromise();
    
  // }
}


