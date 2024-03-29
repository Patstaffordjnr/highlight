import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
private markerPlacedSubject = new BehaviorSubject<boolean>(false);
private markerAddressSubject = new BehaviorSubject<Object>([]);

markerPlaced$ = this.markerPlacedSubject.asObservable();
markerAddress$ = this.markerAddressSubject.asObservable();


updateMarkerPlacementStatus(status: boolean) {
  this.markerPlacedSubject.next(status);
}

updateMarkerAddress(address: object) {
  this.markerAddressSubject.next(address);
}

}



