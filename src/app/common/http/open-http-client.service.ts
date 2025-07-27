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
  ): Observable<Event[]> {
    let params = new HttpParams()
      .set('time', time.toISOString())
      .set('minLat', minLat.toString())
      .set('minLong', minLong.toString())
      .set('maxLat', maxLat.toString())
      .set('maxLong', maxLong.toString());

    eventTypes.forEach(type => {
      params = params.append('eventTypes', type);
    });

    const url = `${URL}/getEvents`;

    return this.http.get<Event[]>(url, { params: params });
  }
}
