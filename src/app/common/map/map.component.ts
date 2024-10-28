import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map | undefined;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Check if geolocation is available
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          this.loadMap(userLatitude, userLongitude);
        },
        () => {
          // If location access is denied, fallback to Waterford coordinates
          this.loadMap(52.2593, -7.1101);
        }
      );
    } else {
      // Fallback if geolocation is unavailable
      this.loadMap(52.2593, -7.1101);
    }
  }

  private loadMap(lat: number, lng: number): void {
    // Initialize the map centered at the provided lat/lng
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: 13
    });

    let bounds = this.map.getBounds();
    let minLat = bounds.getSouth();
    let maxLat = bounds.getNorth();
    let minLong = bounds.getWest();
    let maxLong = bounds.getEast();

    // this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a marker at the user's current location
    const marker = L.marker([lat, lng]).addTo(this.map);
    marker.bindPopup('<b>You are here!</b>').openPopup();

    // Log coordinates on map click
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      console.log('Map clicked at:', event.latlng);
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
