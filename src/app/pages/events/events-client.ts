import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Event } from 'src/app/model/event';

@Injectable({
  providedIn: 'root',
})

export class EventsClient {

  genreArray = ["Band","Busker","Dj","Performance"];

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

  async getEventsGenreControl(currentPage: Number, noOfProducts: Number, genre: string): Promise<{}> {
    // Update the genre array by toggling the presence of the genre
    if (this.genreArray.includes(genre)) {
      this.genreArray = this.genreArray.filter(g => g !== genre);
    } else {
      this.genreArray.push(genre);
    }

    console.log(this.genreArray);

    let params = new HttpParams().set("pageNumber", 1).set("pageSize", 8);

    let url = `http://localhost:8085/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<{}>(url, { withCredentials: true, headers: headers, params: params }).toPromise();
  }
}


