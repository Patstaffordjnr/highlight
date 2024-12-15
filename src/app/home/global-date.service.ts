import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class GlobalDateService { 
   
  private globalDate = new BehaviorSubject<Date>(new Date);
  
      globalDate$ = this.globalDate.asObservable();
      private isUpdating = false;

      upDateTime(updatedTime: Date) {
        if (this.isUpdating) return; // Prevent redundant updates
        this.isUpdating = true;
 
        const updatedDateTime = new Date(
          this.globalDate.value.getFullYear(),
          this.globalDate.value.getMonth(),
          this.globalDate.value.getDate(),
          updatedTime.getHours(),
          updatedTime.getMinutes(),
          0
        );
       this.isUpdating = false;
       this.globalDate.next(updatedDateTime);
      }
      

      upDate(updatedTime: Date) {
        if (this.isUpdating) return; // Prevent redundant updates
        this.isUpdating = true;
 
        const updatedDateTime = new Date(
          updatedTime.getFullYear(),
          updatedTime.getMonth(),
          updatedTime.getDate(),
          this.globalDate.value.getHours(),
          this.globalDate.value.getMinutes(),
          0
        );
       this.isUpdating = false;
       this.globalDate.next(updatedDateTime);
      }
    clearSelectedEvent(){
      this.upDate(null);
    }
  }

 
