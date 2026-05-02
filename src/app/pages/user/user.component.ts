import { User } from '../../model/user';
import { CurrentUserService } from '../../util/can-activate.service'
import { OpenHttpClientService } from '../../common/http/open-http-client.service';
import { EventType } from '../../model/event-types';
import { Event as AppEvent } from '../../model/event';
import { Busker } from '../../model/busker';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { markerIcons } from './../../common/map/map-icons';
import { UserRole } from '../../model/user-roles';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  showEventModal = false;
  showBuskerModal = false;
  showModal = false;

  busker: User | null = null;
  buskers: Busker[] = [];
  total: number = 0;

  userRoles: string[] = [];
  currentUser: User = {
    id: "string",
    email: "string",
    roles: [],
  };

  events: AppEvent[] = [];
  private ownedEvents: AppEvent[] = [];
  private followedEvents: AppEvent[] = [];

  event: AppEvent;
  mapInstance!: L.Map;
  markersLayer = L.layerGroup();
  homeAddress: string = '';

  constructor(
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService
  ) {}

  async ngOnInit() {
    this.loadBuskers(0, 10);
    this.loadOwnedEvents();
    this.loadFollowedEvents();

    const user = await this.currentUserService.getUser();
    if (user) {
      this.currentUser.id = user.id;
      this.currentUser.email = user.email;
      this.currentUser.roles = user.roles;

      this.currentUser.roles.forEach((userRole) => {
        const roleString = String(userRole);
        if (roleString === "USER") {
          this.userRoles = ['USER'];
        } else if (roleString === "BUSKER") {
          this.userRoles = ['BUSKER'];
        } else if (roleString === "ADMIN") {
          this.userRoles = ['ADMIN'];
        }
      });
    }
  }

  loadOwnedEvents() {
    this.openHttpClientService.getUserEvents(
      0, 50,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (response: any) => {
        this.ownedEvents = response.results || response;
        this.mergeEvents();
      },
      error: (error) => console.error('Error fetching user events:', error)
    });
  }

  loadFollowedEvents() {
    this.openHttpClientService.getFollowedEvents().subscribe({
      next: (events: AppEvent[]) => {
        this.followedEvents = events;
        this.mergeEvents();
      },
      error: (error) => console.error('Error fetching followed events:', error)
    });
  }

  private mergeEvents() {
    const followed = this.followedEvents.filter(f => !this.ownedEvents.some(o => o.id === f.id));
    this.events = [...this.ownedEvents, ...followed];
    if (this.mapInstance) this.addMarkersToMap();
  }

  onEventSaved() {
    this.showEventModal = false;
    this.loadOwnedEvents();
  }

  onMapReady(map: L.Map) {
    this.mapInstance = map;
    const center = this.mapInstance.getCenter();

    if (this.events.length > 0) {
      this.addMarkersToMap();
    }

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${center.lat}&lon=${center.lng}`)
      .then(response => response.json())
      .then(data => {
        if (data.address) {
          const addr = data.address;
          const road = addr.road || addr.suburb || '';
          const city = addr.city || addr.town || addr.village || addr.county || '';
          const country = addr.country || '';
          this.homeAddress = `${road ? road + ', ' : ''}${city}, ${country}`;
        } else {
          const parts = data.display_name.split(',').map((p: string) => p.trim());
          const street = parts[0] || '';
          const city = parts[2] || parts[3] || '';
          const country = parts[parts.length - 1] || '';
          this.homeAddress = `${street}, ${city}, ${country}`;
        }
      })
      .catch(error => console.error('Reverse geocoding error:', error));
  }

  onMapMoved(event: { lat: number; lng: number }) {}
  onMapClicked(event: { lat: number; lng: number }) {}

  private addMarkersToMap() {
    this.markersLayer.clearLayers();
    this.events.forEach(event => {
      const icon = markerIcons[event.eventType as keyof typeof markerIcons];
      L.marker([event.lat, event.long], { icon })
        .addTo(this.markersLayer)
        .bindPopup(`<b>${event.title}</b><br>${event.eventType}`)
        .on('click', () => this.onEventSelect(event));
    });
    this.markersLayer.addTo(this.mapInstance);
  }

  onBuskerSelect(busker: User) {
    this.busker = busker;
    this.showBuskerModal = true;
  }

  onEventSelect(event: AppEvent) {
    this.event = event;
    this.showEventModal = true;
    this.showModal = true;
  }

  onEventModalClose() {
    this.showEventModal = false;
    this.loadFollowedEvents();
  }

  loadBuskers(page: number, size: number): void {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response: { total: number, results: Busker[] }) => {
        this.total = response.total;
        this.buskers = response.results;
      },
      error: (err) => console.error('Error loading buskers:', err)
    });
  }
}
