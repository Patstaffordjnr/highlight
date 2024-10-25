import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService { 
private mapCurrentLocationDetails = new BehaviorSubject<String[]>([]);

mapCurrentLocationDetails$ = this.mapCurrentLocationDetails.asObservable();

updateEvent(bounds, minLat, maxLat, minLong, maxLong){
    let updatedMapDetailsSubject = [bounds, minLat, maxLat, minLong, maxLong]
    this.mapCurrentLocationDetails.next(updatedMapDetailsSubject);
  }

}