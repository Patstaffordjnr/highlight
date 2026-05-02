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

  @Output() mapInput = new EventEmitter<L.Map>();
  @Output() mapCenterChanged = new EventEmitter<{ lat: number; lng: number }>();
  @Output() mapClicked = new EventEmitter<{ lat: number; lng: number }>();

  private defaultLat = 53.3498;
  private defaultLng = -6.2603;
  private defaultZoom = 12;

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

    // Emit map object once on init
    this.mapInput.emit(this.map);
    this.updateMapDetails();

    this.map.on('moveend', () => this.updateMapDetails());

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.mapClicked.emit({ lat: event.latlng.lat, lng: event.latlng.lng });
    });
  }

  private updateMapDetails(): void {
    if (!this.map) return;
    const center = this.map.getCenter();
    const bounds = this.map.getBounds();
    this.mapService.updateEvent(bounds, bounds.getSouth(), bounds.getNorth(), bounds.getWest(), bounds.getEast(), '');
    this.mapCenterChanged.emit({ lat: center.lat, lng: center.lng });
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }
}
