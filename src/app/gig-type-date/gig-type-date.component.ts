import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gig-type-date',
  templateUrl: './gig-type-date.component.html',
  styleUrls: ['./gig-type-date.component.css']
})
export class GigTypeDateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onPress(): void {
    console.log("test string");
  }

}
