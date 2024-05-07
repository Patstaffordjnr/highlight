import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../../model/event'


@Injectable({
  providedIn: 'root',
})
export class GlobalDateAndTimeComponentService { 
  private globalDateSubject = new BehaviorSubject<Date>(new Date);
  private globalTimeSubject = new BehaviorSubject<string>('');


  globalDate$ = this.globalDateSubject.asObservable();
  globalTime$ = this.globalTimeSubject.asObservable();

  
  updateGlobalDateSubject(status: Date) {
    this.globalDateSubject.next(status);
  }

  updateGlobalTimeSubject(status: string) {
    this.globalTimeSubject.next(status);
  }
  
}
