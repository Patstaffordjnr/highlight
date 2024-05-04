import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapService } from '../app/pages/google-map/google-map.service';



declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'highlight';
  currentTime: string;

  constructor(private googleMapService: GoogleMapService) {

  }


  updateTime() {
    const date = new Date();
    this.currentTime = date.toLocaleTimeString();
  }
  ngOnInit() {
    this.updateTime();
    // Update the time every second
  
    setInterval(() => {
      this.updateTime();
    }, 1000);

  }


}