import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventType } from 'src/app/model/event-types';

const URL = 'http://localhost:8085/open';


@Injectable({
  providedIn: 'root'
})

export class OpenHttpClientService {
  constructor(private http: HttpClient) { 

  }

  getEvents(
    time: Date,
    minLat: number,
    minLong: number,
    maxLat: number,
    maxLong: number,
    eventTypes: EventType[]
  ): Observable<Event[]> { // Replace 'any' with a specific interface for your event data
    // Create HttpParams to build the query string safely
    let params = new HttpParams()
      .set('time', time.toISOString())
      .set('minLat', minLat.toString())
      .set('minLong', minLong.toString())
      .set('maxLat', maxLat.toString())
      .set('maxLong', maxLong.toString());

    // Add multiple 'eventTypes' parameters
    eventTypes.forEach(type => {
      params = params.append('eventTypes', type);
    });

    // Construct the full URL
    const url = `${URL}/getEvents`;

    // Make the GET request and return the Observable
    return this.http.get<Event[]>(url, { params: params });
  }
}
