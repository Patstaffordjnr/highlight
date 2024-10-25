import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map-service'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map | undefined;

  constructor(private mapService: MapService) {

  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Center the map over Waterford, Ireland with zoom level 13
    this.map = L.map('map', {
      center: [52.2593, -7.1101], // Waterford coordinates
      zoom: 13
    });

    let bounds = this.map.getBounds();
    let minLat = bounds.getSouth();
    let maxLat = bounds.getNorth();
    let minLong = bounds.getWest();
    let maxLong = bounds.getEast();

    this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong )
    // // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Optional: Add a marker at the center of Waterford
    const marker = L.marker([52.2593, -7.1101]).addTo(this.map);
    marker.bindPopup('<b>Welcome to Waterford!</b>').openPopup();

    // Add click event listener to log the coordinates of the clicked location
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
