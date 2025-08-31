import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  // Emit full map object to parent
  @Output() mapInput = new EventEmitter<L.Map>();

  // Emit map center changes
  @Output() mapCenterChanged = new EventEmitter<{ lat: number; lng: number }>();

  // Emit click coordinates
  @Output() mapClicked = new EventEmitter<{ lat: number; lng: number }>();

  // Default fallback location (Dublin)
  private defaultLat = 53.346304;
  private defaultLng = -6.2881792;
  private defaultZoom = 13;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => this.initMap(pos.coords.latitude, pos.coords.longitude),
        () => this.initMap(this.defaultLat, this.defaultLng)
      );
    } else {
      this.initMap(this.defaultLat, this.defaultLng);
    }
  }

  private initMap(lat: number, lng: number): void {
    if (this.map) this.map.remove();

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [lat, lng],
      zoom: this.defaultZoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map);

    // Emit full map object once after initialization
    this.mapInput.emit(this.map);

    // Initial mapDetails update
    this.updateMapDetails();

    // Update mapDetails on move or zoom
    this.map.on('moveend', () => this.updateMapDetails());

    // Listen for clicks on the map
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.mapClicked.emit({ lat: event.latlng.lat, lng: event.latlng.lng });
      console.log('Map clicked at:', event.latlng);
    });
  }

  private updateMapDetails(): void {
    if (!this.map) return;

    const center = this.map.getCenter();
    const bounds = this.map.getBounds();

    // Update your service if needed
    this.mapService.updateEvent(bounds, bounds.getSouth(), bounds.getNorth(), bounds.getWest(), bounds.getEast(), '');

    // Emit map center to parent
    this.mapCenterChanged.emit({ lat: center.lat, lng: center.lng });

    // Emit full map if you want parent to have it updated
    this.mapInput.emit(this.map);

    console.log('Map updated:', { center, bounds });
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
}
