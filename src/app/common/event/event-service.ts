import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../../model/event'

@Injectable({
  providedIn: 'root',
})
export class EventService { 
  
private event = new BehaviorSubject<Event[]>([]);

    eventToBeDisplayed$ = this.event.asObservable();

updateEvent(updatedEventSubject: Event[]){
    this.event.next(updatedEventSubject);
  }

  clearSelectedEvent(){
    this.updateEvent(null);
  }
}