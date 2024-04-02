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
  
  let x = await [event][0].lat;
  let y = await [event][0].long;

let lat = x;
let lng = y;

console.log(`Lat: ${lat}, Lng: ${lng}`);
    // Create a new marker object with the clicked location

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map
    });
    this.markers.push(marker);

    console.log(this.markers);
}
async updateEvents(eventsToBeDisplayed) {

eventsToBeDisplayed[0].lat = 52.30549741995185;
eventsToBeDisplayed[0].long = -6.935912119262688;


eventsToBeDisplayed[1].lat = 52.30602222954823;
eventsToBeDisplayed[1].long = -6.913081156127922;

eventsToBeDisplayed[2].lat = 52.302873278655305;
eventsToBeDisplayed[2].long = -6.887846933715813;

eventsToBeDisplayed[3].lat = 52.29300511556882;
eventsToBeDisplayed[3].long = -6.9355687965087816;
  

eventsToBeDisplayed[4].lat = 52.29311010759907;
eventsToBeDisplayed[4].long = -6.9094762672119066;

eventsToBeDisplayed[5].lat = 52.293215099380475;
eventsToBeDisplayed[5].long = -6.8888769019775316;

eventsToBeDisplayed[6].lat = 52.27897631074111;
eventsToBeDisplayed[6].long = -6.938037872314453;

eventsToBeDisplayed[7].lat = 52.2797741285011;
eventsToBeDisplayed[7].long = -6.916322708129883;

eventsToBeDisplayed[8].lat = 52.268430137416665;
eventsToBeDisplayed[8].long = -6.964387893676758;

eventsToBeDisplayed[9].lat = 52.26720562683071;
eventsToBeDisplayed[9].long = -6.9412994384765625;

eventsToBeDisplayed.map(((event, i) => {



  let eventTitle = event.title;
  let eventType = event.eventType;
  let eventStart = event.startAt;
  let eventFinish = event.endAt;
  let eventLat = event.lat;
  let eventLng = event.lng
  let eventId = event.id;
  let eventUserId = event.userId;




  this.placeEventMarkers(event);

}))



}


onMapClick(event: PointerEvent) {
  
}

}



