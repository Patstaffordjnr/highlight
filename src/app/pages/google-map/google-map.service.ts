import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
private markerPlacedSubject = new BehaviorSubject<boolean>(false)

markerPlaced$ = this.markerPlacedSubject.asObservable();

updateMarkerPlacementStatus(status: boolean) {
  this.markerPlacedSubject.next(status);
}

}



