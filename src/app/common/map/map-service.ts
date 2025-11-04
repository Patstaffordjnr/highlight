import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService { 
// private mapCurrentLocationDetails = new BehaviorSubject<String[]>([]);
private mapCurrentLocationDetails = new BehaviorSubject<any[]>([]);
mapCurrentLocationDetails$ = this.mapCurrentLocationDetails.asObservable();

constructor(private http: HttpClient) {} 

updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString){
    let updatedMapDetailsSubject = [bounds, minLat, maxLat, minLong, maxLong, addressString]
    this.mapCurrentLocationDetails.next(updatedMapDetailsSubject);
  }
  
  getAddressFromCoords(lat: number, lon: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    return this.http.get(url);
  }
  
}

