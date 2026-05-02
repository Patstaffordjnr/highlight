import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventType } from 'src/app/model/event-types';
import { Event as AppEvent } from 'src/app/model/event';
import { UserRole } from 'src/app/model/user-roles';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;


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

    return this.http.get<AppEvent[]>(`${API}/open/getEvents`, { params: params });
  }

getUsers(pageNumber: number, pageSize: number) {
  const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<any>(`${API}/admin/users/getUsers`, { params, withCredentials: true });
}

getUserEvents(pageNumber: number, pageSize: number, eventTypes: EventType[]): Observable<any> {
  let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

  eventTypes.forEach(type => {
    params = params.append('eventTypes', type);
  });

  return this.http.get<any>(`${API}/busker/getEvents`, { params, withCredentials: true });
}

getBuskers(pageNumber: number, pageSize: number): Observable<any> {
  const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<any>(`${API}/open/getBuskers`, { params });
}

createEvent(event: AppEvent): Observable<AppEvent> {
  return this.http.post<AppEvent>(`${API}/busker/createEvent`, event, { withCredentials: true });
}

updateEvent(event: AppEvent): Observable<AppEvent> {
  return this.http.put<AppEvent>(`${API}/busker/updateEvent`, event, { withCredentials: true });
}

deleteEvent(id: string): Observable<void> {
  return this.http.delete<void>(`${API}/busker/deleteEvent/${id}`, { withCredentials: true });
}

searchEvents(query: string): Observable<AppEvent[]> {
  const params = new HttpParams().set('query', query);
  return this.http.get<AppEvent[]>(`${API}/open/searchEvents`, { params });
}

getFollowedEvents(): Observable<AppEvent[]> {
  return this.http.get<AppEvent[]>(`${API}/user/follow/events`, { withCredentials: true });
}

followEvent(eventId: string): Observable<void> {
  return this.http.post<void>(`${API}/user/follow/event/${eventId}`, {}, { withCredentials: true });
}

unfollowEvent(eventId: string): Observable<void> {
  return this.http.delete<void>(`${API}/user/follow/event/${eventId}`, { withCredentials: true });
}

isFollowingEvent(eventId: string): Observable<boolean> {
  return this.http.get<boolean>(`${API}/user/follow/event/${eventId}/status`, { withCredentials: true });
}

getFollowedBuskers(): Observable<any[]> {
  return this.http.get<any[]>(`${API}/user/follow/buskers`, { withCredentials: true });
}

followBusker(buskerId: string): Observable<void> {
  return this.http.post<void>(`${API}/user/follow/busker/${buskerId}`, {}, { withCredentials: true });
}

unfollowBusker(buskerId: string): Observable<void> {
  return this.http.delete<void>(`${API}/user/follow/busker/${buskerId}`, { withCredentials: true });
}

isFollowingBusker(buskerId: string): Observable<boolean> {
  return this.http.get<boolean>(`${API}/user/follow/busker/${buskerId}/status`, { withCredentials: true });
}

updateUserRoles(userId: string, roles: UserRole[]): Observable<User> {
  return this.http.put<User>(
    `${API}/admin/users/${userId}/roles`,
    roles,
    { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
  );
}

adminDeleteUser(userId: string): Observable<void> {
  return this.http.delete<void>(`${API}/admin/user/delete/${userId}`, { withCredentials: true });
}

adminDeleteEvent(eventId: string): Observable<void> {
  return this.http.delete<void>(`${API}/admin/events/delete/${eventId}`, { withCredentials: true });
}

updateProfile(displayName: string | null, bio: string | null): Observable<User> {
  return this.http.put<User>(
    `${API}/user/profile`,
    { displayName, bio },
    { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
  );
}

updatePassword(currentPassword: string, newPassword: string): Observable<void> {
  return this.http.put<void>(
    `${API}/user/password`,
    { currentPassword, newPassword },
    { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
  );
}

resendVerification(): Observable<void> {
  return this.http.post<void>(`${API}/user/resend-verification`, {}, { withCredentials: true });
}

}
