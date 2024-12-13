import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class GlobalDateService { 
   
  private globalDate = new BehaviorSubject<Date>(new Date);
  
      globalDate$ = this.globalDate.asObservable();
      private isUpdating = false;

      upDate(updatedTime: Date) {
        if (this.isUpdating) return; // Prevent redundant updates
        this.isUpdating = true;
 
        const updatedDateTime = new Date(
          updatedTime.getFullYear(),
          updatedTime.getMonth(),
          updatedTime.getDate(),
          updatedTime.getHours(),
          updatedTime.getMinutes(),
          updatedTime.getSeconds()
        );
      console.log(`Selected Time: ${updatedTime}`);
      console.log(`Global Date: ${this.globalDate.value}`);
      // this.globalDate.next(updatedDateTime);
       this.isUpdating = false;

      }
      
    clearSelectedEvent(){
      this.upDate(null);
    }
  }

 
