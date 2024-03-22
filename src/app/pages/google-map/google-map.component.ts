import { Component, ElementRef, OnInit, Output, EventEmitter, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { GoogleMapService } from './google-map.service';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements AfterViewInit {

  // @Input('selectedDate') public selectedDate: Date;

  // @Output() addressClicked = new EventEmitter<string>();

  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;

  geocoder: any;
  map: google.maps.Map;
  mapClickListener: google.maps.MapsEventListener;

  constructor(private googleMapService: GoogleMapService, 
    private cd: ChangeDetectorRef) {
      this.googleMapService.markerPlaced$.subscribe((markerPlaced) => {
        if(markerPlaced) {
          console.log(`YO`);
        } else {
      
        }
      })
   }

  ngAfterViewInit(): void {
    // Run your initialization code here
    this.loadGoogleMaps(() => {
      this.initMap();
      this.geocoder = new google.maps.Geocoder();
    });
  }

  loadGoogleMaps(callback: () => void) {
    if (window.google) {
      callback();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA5mnnydr-3HjuPTwkoNmVUHAYy77CVSmQ`;
      script.onload = callback;
      document.body.appendChild(script);
    }
  }

  initMap() {
    const initialCoords: google.maps.LatLngLiteral = { lat: 41.73061, lng: -73.935242 };
    const mapOptions: google.maps.MapOptions = {
      center: initialCoords,
      zoom: 13
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
           
            lat: position.coords.latitude,
            lng: position.coords.longitude

          };
          this.map.setCenter(coords);


        })}


}




onMapClick(event: MouseEvent) {
  console.log('Map clicked!', event);
}
}