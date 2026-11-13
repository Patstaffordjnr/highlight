import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService { 
// private mapCurrentLocationDetails = new BehaviorSubject<String[]>([]);
private mapCurrentLocationDetails = new BehaviorSubject<any[]>([]);
mapCurrentLocationDetails$ = this.mapCurrentLocationDetails.asObservable();

updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString){
    let updatedMapDetailsSubject = [bounds, minLat, maxLat, minLong, maxLong, addressString]
    this.mapCurrentLocationDetails.next(updatedMapDetailsSubject);
  }
  
}

