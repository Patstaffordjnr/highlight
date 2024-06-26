import { Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { GoogleMapService } from './google-map.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
  
  isMarkerPlaced = false;
  eventsToBeDisplayed = [];

  // marker: google.maps.Marker | null = null;
  markers: google.maps.Marker[] = [];//#endregion
  markerAddressLatLng = {};
  markerAddress: string;

  selectAddressButtonText = "Select Address";
  geocoder: any;
  map: google.maps.Map;
  mapClickListener: google.maps.MapsEventListener;

  constructor(private googleMapService: GoogleMapService, private http: HttpClient) {
    this.googleMapService.markerPlaced$.subscribe((markerPlaced => {
      if(markerPlaced) {
        this.isMarkerPlaced = true
        this.selectAddress();
      }
    }));

   this.googleMapService.eventsToBeDisplayed$.subscribe(events => {
    this.eventsToBeDisplayed = events;
    this.updateEvents(this.eventsToBeDisplayed);
  });

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

updateEventLatLng(eventLatLng) {
  this.googleMapService.updateEventLatLng(eventLatLng);
}


selectAddress() {
  this.isMarkerPlaced = true;

  if(this.markers.length > 0) {
    const markerToRemove = this.markers[0];
    markerToRemove.setMap(null);
    this.markers.shift();
  }

  if (this.isMarkerPlaced) {
    // Add click event listener to add markers
    this.mapClickListener = google.maps.event.addListener(this.map, 'click', (event: google.maps.MouseEvent) => {

      // Get the clicked location coordinates (latitude and longitude)
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Create a new marker object with the clicked location
   this.markerAddressLatLng = {lat, lng}
   this.updateEventLatLng(this.markerAddressLatLng)

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map
      });
      this.markers.push(marker);

      google.maps.event.removeListener(this.mapClickListener);

      // (Optional) Call your GoogleMapService to handle marker placement logic
      // this.googleMapService.placeMarker(marker); // Assuming the service has such a method

      if(this.markers.length > 0) {
    this.getAddressFromCoordinates(lat, lng);
      }

      this.isMarkerPlaced = false
    });
  } else {

  }
}

updateEventAddress(eventAddress: string) {
  this.googleMapService.updateEventAddress(eventAddress);
}

async getAddressFromCoordinates(latitude: number, longitude: number) {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA5mnnydr-3HjuPTwkoNmVUHAYy77CVSmQ`; // Replace with your API endpoint and key
  await this.http.get(geocodingUrl)
   .subscribe((response: any) => {
     if (response.results && response.results.length > 0) {
       const address = response.results[0].formatted_address;
       this.updateEventAddress(address);

     } else {
       console.error("Failed to retrieve address from coordinates.");
     }
   },
   (error) => {
     console.error("Error during geocoding:", error);
   });
}

async placeEventMarkers(event) {
  
let lat = await [event][0].lat;
let lng = await [event][0].long;

// console.log(`Lat: ${lat}, Lng: ${lng}`);
    // Create a new marker object with the clicked location

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map
    });
    this.markers.push(marker);
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <b>${event.title}</b><br>
      <i>${event.eventType}</i><br>
      Start: ${event.startAt}<br>
      End: ${event.endAt}
    `,
  });

  marker.addListener('click', () => {
    infoWindow.open(this.map, marker);
    
  }
  
  );
  
}


async updateEvents(eventsToBeDisplayed) {

  eventsToBeDisplayed.map(((event, i) => {
    this.placeEventMarkers(event);
}))

}

onMapClick(event: PointerEvent) {
}

}



