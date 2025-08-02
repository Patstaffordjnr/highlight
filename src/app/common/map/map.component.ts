import { Component, OnInit, OnDestroy } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as L from 'leaflet';
import { MapService } from './map-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | undefined;

@ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(private mapService: MapService) {}

ngAfterViewInit(): void {
  this.initMap();
}

private initMap(): void {
  if (this.map) {
    this.map.remove();
    this.map = null;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        this.loadMap(userLatitude, userLongitude);
      },
      () => {
        this.loadMap(52.2593, -7.1101); // fallback
      }
    );
  } else {
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
  this.mapService.getAddressFromCoords(center.lat, center.lng).subscribe(res => {
    const addressString = res.display_name;
    this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString);
  });
}

  private loadMap(lat: number, lng: number): void {
  this.map = L.map(this.mapContainer.nativeElement, {
    center: [lat, lng],
    zoom: 13
  });

  setTimeout(() => {
    this.map!.invalidateSize();
  }, 0);

  let bounds = this.map.getBounds();
  let minLat = bounds.getSouth();
  let maxLat = bounds.getNorth();
  let minLong = bounds.getWest();
  let maxLong = bounds.getEast();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(this.map);

  const marker = L.marker([lat, lng]).addTo(this.map);

  this.updateMapService();

  this.map.on('moveend', () => {
    this.updateMapService();
    this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString);
  });

  this.mapService.getAddressFromCoords(lat, lng).subscribe(res => {
    console.log('Address:', res.display_name);
  });

  this.map.on('click', (event: L.LeafletMouseEvent) => {
    console.log('Map clicked at:', event.latlng);
  });

  let addressString: string;
  this.mapService.getAddressFromCoords(lat, lng).subscribe(res => {
    addressString = res.display_name;
    this.mapService.updateEvent(bounds, minLat, maxLat, minLong, maxLong, addressString);
  });
}

ngOnDestroy(): void {
  if (this.map) {
    this.map.remove();
    this.map = null;
  }
}
}
