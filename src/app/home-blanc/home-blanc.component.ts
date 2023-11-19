import { Component, OnInit,Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-home-blanc',
  templateUrl: './home-blanc.component.html',
  styleUrls: ['./home-blanc.component.css']
})
export class HomeBlancComponent implements OnInit {

  @Output() selectedDate: EventEmitter<Date> = new EventEmitter<any>();  


  // selectedDate: Date;
  mapVisible: boolean = false;  // Control the visibility of the map component
  calendarVisible: boolean = false;



  constructor() { }

  ngOnInit(): void {

    // function myFunction() {
    //   var element = document.getElementById("myDIV");
    //   element.classList.remove("mystyle");
    // }
  }

  selectDateEventProcess(selectedDate: Date) : void {
    // this.selectedDate = selectedDate;
    this.selectedDate.emit(selectedDate);
    // console.log(selectedDate);
  }
  
  toggleMapVisibility() {
    this.mapVisible = !this.mapVisible;
    
  }

  toggleCalendarVisibility() {
    this.calendarVisible = !this.calendarVisible;
  }
}
