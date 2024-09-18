import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent implements OnInit {

  from: Date;
  to: Date;


  constructor(private route: ActivatedRoute) {
  }
  
  //http://localhost:4200/home?from='Fri Sep 20 2024 00:34:11 GMT+0200'&to='Sat Sep 21 2024 07:34:11 GMT+0200'

  ngOnInit(): void {
    this.initialiseSearchData();
    this.printSeletedDates();
  }

  initialiseSearchData(): void  {     
    debugger;
     this.from = this.getDateOrDefault('from');
     this.to = this.getDateOrDefault('to');
  }

  getDateOrDefault(parameterName: string): Date {
    var dateStr = this.route.snapshot.queryParamMap.get(parameterName);
    var date;
    if(dateStr) {
      date = new Date(dateStr);      
      // Check if the parsed date is valid (Invalid dates in JS return `Invalid Date`)
      if (isNaN(date.getTime())) {
        console.error('Invalid date format in query parameters');
        date = new Date();
      }
    } else {
      date = new Date();
    }
    return date;
  }

  updateFromDateEvent(from: Date): void  {
    this.from = from;
    this.printSeletedDates();
  }
  updateToDateEvent(to: Date): void  {
    this.to = to;
    this.printSeletedDates();
  }
  printSeletedDates(): void {
    console.log("From [" + this.from + "] To [" + this.to + "]");   
  }
}
