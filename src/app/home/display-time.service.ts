import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class DisplayTimeService { 
  private event = new BehaviorSubject<Date>(new Date);
  
      displayTime$ = this.event.asObservable();

  
  updateEvent(updatedDisplayTime: Date){

      this.event.next(updatedDisplayTime);
      console.log(this.event);
    }
  
    clearSelectedEvent(){
      this.updateEvent(null);
    }
  }