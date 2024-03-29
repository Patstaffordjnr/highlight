import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
private markerPlacedSubject = new BehaviorSubject<boolean>(false);
private markerLatLngSubject = new BehaviorSubject<Object>([]);
private eventAddressSubject = new BehaviorSubject<string>("");

markerPlaced$ = this.markerPlacedSubject.asObservable();
eventLatLng$ = this.markerLatLngSubject.asObservable();
eventAddress$ = this.eventAddressSubject.asObservable();


updateMarkerPlacementStatus(status: boolean) {
  this.markerPlacedSubject.next(status);

}

updateEventLatLng(eventLatLng: object) {
  this.markerLatLngSubject.next(eventLatLng);
  console.log(eventLatLng);
}

updateEventAddress(eventAddress: string){
  this.eventAddressSubject.next(eventAddress);
}

}



