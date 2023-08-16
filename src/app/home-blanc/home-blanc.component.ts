import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-home-blanc',
  templateUrl: './home-blanc.component.html',
  styleUrls: ['./home-blanc.component.css']
})
export class HomeBlancComponent implements OnInit {

  title = 'highlight';
  band = 'Band:';
  address = 'Address:';
  geocoder: any;

  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
  placeMarkerButtonMessage = 'PlaceMarker';
  map: google.maps.Map;
  marker: google.maps.Marker;
  markerText: string;
  markerPlaced = false;
  mapClickListener: google.maps.MapsEventListener;

  constructor() { }

  ngOnInit(): void {
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
      zoom: 8
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
          this.marker = new google.maps.Marker({ position: coords, map: this.map });
          this.updateAddress(coords.lat, coords.lng);
        },
        () => {
          this.marker = new google.maps.Marker({ position: initialCoords, map: this.map });
        }
      );
    } else {
      this.marker = new google.maps.Marker({ position: initialCoords, map: this.map });
    }

    if (this.marker) {
      this.marker.addListener('click', () => {
        console.log('Marker clicked!');
      });
    }
  }
  onMapClick(event: MouseEvent) {
    console.log('Map clicked!', event);
  }
  








  

  placeMarker() {
    if (!this.markerPlaced) {
      if (this.mapClickListener) {
        this.mapClickListener.remove();
      }
  
      this.mapClickListener = this.map.addListener('click', (event: google.maps.MouseEvent) => {
        if (this.marker) {
          this.marker.setPosition(event.latLng);
          this.updateAddress(event.latLng.lat(), event.latLng.lng());
        } else {
          this.marker = new google.maps.Marker({
            position: event.latLng,
            map: this.map,
            title: 'My Marker'
          });
          this.updateAddress(event.latLng.lat(), event.latLng.lng());
        }
        this.markerPlaced = true;
  
        this.mapClickListener.remove();
      });
    } else {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
      if (this.mapClickListener) {
        this.mapClickListener.remove();
        this.mapClickListener = null;
      }
      this.markerPlaced = false;
    }
  }
  
  updateAddress(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          this.address = 'Address not found';
        }
      } else {
        this.address = 'Geocoder failed due to: ' + status;
      }
    });
  }

}
