import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class GlobalDateService { 
  private globalDate = new BehaviorSubject<Date>(new Date);
  
      globalDate$ = this.globalDate.asObservable();

  
      updateEventDate(updatedDate: Date) {
        // Extract the existing time from the current value
        // const currentDateTime = this.event.getValue();
        // const currentHours = currentDateTime.getHours();
        // const currentMinutes = currentDateTime.getMinutes();
        // const currentSeconds = currentDateTime.getSeconds();
      
        // Create a new Date object with the updated date but the original time
        // const updatedDateTime = new Date(
        //   updatedDate.getFullYear(),
        //   updatedDate.getMonth(),
        //   updatedDate.getDate(),
        //   currentHours,
        //   currentMinutes,
        //   currentSeconds
        // );
      
        // Emit the updated date-time
        // this.event.next(updatedDateTime);
        // console.log('Updated Date:', updatedDateTime);
      }

      updateEventTime(updatedTime: Date) {
        console.log(updatedTime);
        // Extract the existing date from the current value
        // const currentDateTime = this.event.getValue();
        // const currentYear = currentDateTime.getFullYear();
        // const currentMonth = currentDateTime.getMonth();
        // const currentDate = currentDateTime.getDate();
      
        // Create a new Date object with the original date but the updated time
        // const updatedDateTime = new Date(
        //   currentYear,
        //   currentMonth,
        //   currentDate,
        //   updatedTime.getHours(),
        //   updatedTime.getMinutes(),
        //   updatedTime.getSeconds()
        // );
      
        // Emit the updated date-time
        // this.event.next(updatedDateTime);
        // console.log('Updated Time:', updatedDateTime);
      }
      
      

    clearSelectedEvent(){
      this.updateEventDate(null);
    }
  }