import { Component, ElementRef, OnInit, Output, EventEmitter, ViewChild, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GoogleMapService } from './google-map.service';



@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
  
  isMarkerPlaced = false;
  // marker: google.maps.Marker | null = null;
  markers: google.maps.Marker[] = [];




  selectAddressButtonText = "Select Address";
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



selectAddress() {
  this.isMarkerPlaced = true;
  // this.marker = null


  if (this.isMarkerPlaced) {
    // Add click event listener to add markers
    // this.map.
   
    this.mapClickListener = google.maps.event.addListener(this.map, 'click', (event: google.maps.MouseEvent) => {

      // Get the clicked location coordinates (latitude and longitude)
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Create a new marker object with the clicked location



      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map
      });

      console.log(this.markers)

      // console.log(marker);


      this.isMarkerPlaced = false
      google.maps.event.removeListener(this.mapClickListener);

      // (Optional) Call your GoogleMapService to handle marker placement logic
      // this.googleMapService.placeMarker(marker); // Assuming the service has such a method
    });
  } else {

  }
}
removeMarker(){


}

onMapClick(event: PointerEvent) {
// console.log( event.y);
// console.log( event.x)
 



}
}