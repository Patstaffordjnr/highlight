import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'highlight';

  ngOnInit() {

  }

  
}