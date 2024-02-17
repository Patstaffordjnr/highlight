import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  private createEventMarkerToBePlaced = new BehaviorSubject<boolean>(false);
  private markerAddress = new BehaviorSubject<string>('');

  updateMarkerAddress(address: string) {
    this.markerAddress.next(address);
  }

  get createEventMarkerToBePlaced$(): Observable<boolean> {
    return this.createEventMarkerToBePlaced.asObservable();
  }
}



