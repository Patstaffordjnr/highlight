import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventType } from 'src/app/model/event-types';
import { Event as AppEvent } from 'src/app/model/event';

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
  ): Observable<AppEvent[]> {
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

    return this.http.get<AppEvent[]>(url, { params: params });
  }

getUsers(pageNumber: number, pageSize: number) {
  const url = `http://localhost:8085/admin/users/getUsers`;

  const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<any>(url, { params, withCredentials: true }); // important for cookies

  // return this.http.get<{ total: number, results: User[] }>(
  //   `/admin/users/getUsers?pageNumber=${page}&pageSize=${size}`
  // );
}

getUserEvents(pageNumber: number, pageSize: number, eventTypes: EventType[]): Observable<any> {
  const url = `http://localhost:8085/busker/getEvents`;
  let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

  eventTypes.forEach(type => {
    params = params.append('eventTypes', type);
  });

  return this.http.get<any>(url, { params, withCredentials: true });
}

getBuskers(pageNumber: number, pageSize: number): Observable<any> {
  const url = `http://localhost:8085/user/getBuskers`; // removed `/open`

  const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<any>(url, { params, withCredentials: true }); // important for cookies
}

createEvent(event: AppEvent): Observable<AppEvent> {
  const url = `http://localhost:8085/busker/createEvent`;
  return this.http.post<AppEvent>(url, event, { withCredentials: true });
}

updateEvent(event: AppEvent): Observable<AppEvent> {
  const url = `http://localhost:8085/busker/updateEvent`;
  return this.http.put<AppEvent>(url, event, { withCredentials: true });
}

followEvent(eventId: string): Observable<void> {
  return this.http.post<void>(`http://localhost:8085/user/follow/event/${eventId}`, {}, { withCredentials: true });
}

unfollowEvent(eventId: string): Observable<void> {
  return this.http.delete<void>(`http://localhost:8085/user/follow/event/${eventId}`, { withCredentials: true });
}

isFollowingEvent(eventId: string): Observable<boolean> {
  return this.http.get<boolean>(`http://localhost:8085/user/follow/event/${eventId}/status`, { withCredentials: true });
}

followBusker(buskerId: string): Observable<void> {
  return this.http.post<void>(`http://localhost:8085/user/follow/busker/${buskerId}`, {}, { withCredentials: true });
}

unfollowBusker(buskerId: string): Observable<void> {
  return this.http.delete<void>(`http://localhost:8085/user/follow/busker/${buskerId}`, { withCredentials: true });
}

isFollowingBusker(buskerId: string): Observable<boolean> {
  return this.http.get<boolean>(`http://localhost:8085/user/follow/busker/${buskerId}/status`, { withCredentials: true });
}

}
