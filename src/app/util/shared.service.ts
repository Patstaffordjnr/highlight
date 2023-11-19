import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private  createEventMarkerToBePlaced  = new BehaviorSubject<boolean>(false);
  private markerAddress = new BehaviorSubject<string>(''); // Add this

  updateCreateEventMarkerToBePlaced(status: boolean) {
    this.createEventMarkerToBePlaced.next(status);
  }
 
  updateMarkerAddress(address: string) { // Add this method
    this.markerAddress.next(address);
  }

  get createEventMarkerToBePlaced$(): Observable<boolean> {
    return this.createEventMarkerToBePlaced.asObservable();
  }
  
  get markerAddress$(): Observable<string> { // Add this
    return this.markerAddress.asObservable();
  }
}

