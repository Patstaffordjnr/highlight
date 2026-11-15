import { Component, OnInit } from '@angular/core';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { EventType } from 'src/app/model/event-types';
import { Event as AppEvent } from 'src/app/model/event';
import { Busker } from 'src/app/model/busker';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { markerIcons } from './../../common/map/map-icons';

@Component({
  selector: 'app-busker',
  templateUrl: './busker.component.html',
  styleUrl: './busker.component.css'
})
export class BuskerComponent implements OnInit {
  showModal = false;
  showBuskerModal = false;
  selectedBusker: Busker | null = null;

  userRoles: string[] = [];
  currentUser: User = { id: '', email: '', roles: [] };

  events: AppEvent[] = [];
  event!: AppEvent;

  mapInstance!: L.Map;
  markersLayer = L.layerGroup();

  constructor(
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loadEvents();

    const user = this.currentUserService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser.id = user.id;
    this.currentUser.email = user.email;
    this.currentUser.roles = user.roles;

    this.currentUser.roles.forEach((userRole) => {
      const roleString = String(userRole);
      if (roleString === 'USER') {
        this.userRoles = ['USER'];
      } else if (roleString === 'BUSKER') {
        this.userRoles = ['BUSKER'];
      } else if (roleString === 'ADMIN') {
        this.userRoles = ['ADMIN'];
      }
    });
  }

  onMapReady(map: L.Map) {
    this.mapInstance = map;
    if (this.events.length > 0) {
      this.addMarkersToMap();
    }
  }

  private addMarkersToMap() {
    this.markersLayer.clearLayers();
    this.events.forEach(event => {
      const icon = markerIcons[event.eventType as keyof typeof markerIcons];
      L.marker([event.lat, event.long], { icon })
        .addTo(this.markersLayer)
        .bindPopup(`<b>${event.title}</b><br>${event.eventType}`)
        .on('click', () => this.onSelect(event));
    });
    this.markersLayer.addTo(this.mapInstance);
  }

  createEvent() {
    this.event = null;
    this.showModal = true;
  }

  onSelect(event: AppEvent) {
    this.event = event;
    this.showModal = true;
  }

  loadEvents() {
    this.openHttpClientService.getUserEvents(
      0, 50,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE],
      'upcoming'
    ).subscribe({
      next: (response: any) => {
        const now = Date.now() / 1000;
        const events: AppEvent[] = response.results || response;
        // Keep finished gigs out of the live dashboard; they live in Settings → Gig archive.
        this.events = events.filter(event => Number(event.endAt) >= now);
        if (this.mapInstance) {
          this.addMarkersToMap();
        }
      },
      error: (error) => console.error('Error fetching events:', error)
    });
  }

  onEventSaved() {
    this.showModal = false;
    this.loadEvents();
  }

  onOpenBusker(userId: string) {
    this.openHttpClientService.getBuskerById(userId).subscribe({
      next: (busker) => {
        this.selectedBusker = busker;
        this.showModal = false;
        this.showBuskerModal = true;
      },
      error: () => {}
    });
  }
}
