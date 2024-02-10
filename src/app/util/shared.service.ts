import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private createEventMarkerToBePlaced = new BehaviorSubject<boolean>(false);
  private markerAddress = new BehaviorSubject<string>('');
  private userSpareServiceSource = new BehaviorSubject<string>('');
  userSpareService$ = this.userSpareServiceSource.asObservable();

  private formDataSource = new BehaviorSubject<any>(null);
  formData$ = this.formDataSource.asObservable();

  updateCreateEventMarkerToBePlaced(status: boolean) {
    this.createEventMarkerToBePlaced.next(status);
  }

  updateMarkerAddress(address: string) {
    this.markerAddress.next(address);
  }

  get createEventMarkerToBePlaced$(): Observable<boolean> {
    return this.createEventMarkerToBePlaced.asObservable();
  }

  get markerAddress$(): Observable<string> {
    return this.markerAddress.asObservable();
  }


  }



