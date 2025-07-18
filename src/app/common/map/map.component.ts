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

  private updateMapService(): void {
  if (!this.map) return;

  const bounds = this.map.getBounds();
  const minLat = bounds.getSouth();
  const maxLat = bounds.getNorth();
  const minLong = bounds.getWest();
  const maxLong = bounds.getEast();

  const center = this.map.getCenter();
  // console.log('Updated center:', center.lat, center.lng);
  this.mapService.getAddressFromCoords(center.lat, center.lng).subscribe(res => {
    const addressString = res.display_name;
    // Now update the BehaviorSubject *after* we have the address string
    this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString);
  });
}

  private loadMap(lat: number, lng: number): void {
    // Initialize the map centered at the provided lat/lng
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: 13
    });

    // console.log(lat, lng);
    let bounds = this.map.getBounds();
    let minLat = bounds.getSouth();
    let maxLat = bounds.getNorth();
    let minLong = bounds.getWest();
    let maxLong = bounds.getEast();

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a marker at the user's current location
    const marker = L.marker([lat, lng]).addTo(this.map);
    // marker.bindPopup('<b>Paul is DUMB!</b>').openPopup();

      // Initial map update
  this.updateMapService();

  // ✅ Auto-update the service whenever map is moved or zoomed
  this.map.on('moveend', () => {
    this.updateMapService();
    this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString);
  });

  // Optional: log address on initial load
  this.mapService.getAddressFromCoords(lat, lng).subscribe(res => {
    console.log('Address:', res.display_name);
  });

    // Log coordinates on map click
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      console.log('Map clicked at:', event.latlng);
    });
    let addressString: string; 

    this.mapService.getAddressFromCoords(lat, lng).subscribe(res => {
      addressString = res.display_name;
      // console.log('Address:', res.display_name);
    });

    this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString);

  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
