import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../../model/event'


@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
private markerPlacedSubject = new BehaviorSubject<boolean>(false);
private markerLatLngSubject = new BehaviorSubject<Object>([]);
private eventAddressSubject = new BehaviorSubject<string>("");

private eventsToBeDisplayedSubject = new BehaviorSubject<Event[]>([]);

markerPlaced$ = this.markerPlacedSubject.asObservable();
eventLatLng$ = this.markerLatLngSubject.asObservable();
eventAddress$ = this.eventAddressSubject.asObservable();

eventsToBeDisplayed$ = this.eventsToBeDisplayedSubject.asObservable();


updateMarkerPlacementStatus(status: boolean) {
  this.markerPlacedSubject.next(status);
}

updateEventLatLng(eventLatLng: object) {
  this.markerLatLngSubject.next(eventLatLng);
}

updateEventAddress(eventAddress: string){
  this.eventAddressSubject.next(eventAddress);
}

updateEventsToBeDisplayed(updatedEvents: Event[]){
  this.eventsToBeDisplayedSubject.next(updatedEvents);
  console.log(updatedEvents);
}

}



