import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { UserProfileComponent } from 'src/app/common/user-profile/user-profile.component';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { EventType } from 'src/app/model/event-types';
import { Event as AppEvent } from 'src/app/model/event';
import { Busker } from 'src/app/model/busker';
import { AuthService } from 'src/app/util/auth.service';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { EventModalComponent } from 'src/app/common/event/event-modal/event-modal.component';
import { markerIcons } from './../../common/map/map-icons';

@Component({
  selector: 'app-busker',
  templateUrl: './busker.component.html',
  styleUrl: './busker.component.css'
})
export class BuskerComponent implements OnInit { // Implement OnInit
  showModal = false;
  buskers: Busker[] = [];
  total: number = 0;
  
  userRoles: string[] = []; // Changed to string[] for better type safety
  currentUser: User = {
    id: "string",
    email: "string",
    roles: [],
  };
  events: AppEvent[] = [];
  form!: FormGroup; // Use ! if initialized elsewhere, or remove if not needed.
                   // Since you commented out the form, I'll leave it as is.

  event!: AppEvent; // Use ! since it's assigned in onSelect
  
  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);
  
  mapInstance!: L.Map;
  mapDetails: any; 
  markersLayer = L.layerGroup(); 
  homeAddress: string = '';

  filteredEvents: AppEvent[] = []; 
  
  constructor(
    private formBuilder: FormBuilder, 
    private currentUserService: CurrentUserService, 
    private openHttpClientService: OpenHttpClientService
  ) {
    
    // --- Event Loading Logic (Same as UserComponent) ---
    this.openHttpClientService.getEvents(
      new Date(2025, 6, 6, 23, 0, 0),
      -88,
      -88,
      80,
      80,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (events: AppEvent[]) => {
        this.events = events; 
        // Check if map is ready to add markers immediately after events load
        if (this.mapInstance) {
          this.addMarkersToMap();
        }
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      },
    });
  }

  // --- ngOnInit Logic (Copied from UserComponent) ---
  async ngOnInit() {
    // 1. Load Buskers (THIS WAS MISSING/DIFFERENT IN YOUR ORIGINAL BuskerComponent)
    this.loadBuskers(0, 10); 
    
    // 2. Load User Profile
    let user = await this.currentUserService.getUser()

    this.currentUser.id = user.id;
    this.currentUser.email =  user.email;
    this.currentUser.roles = user.roles;

    // 3. Process Roles (Filter is used incorrectly, but the logic is kept for 1:1 copy)
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

  // --- Map and Event Logic (Same as UserComponent) ---
  onMapReady(map: L.Map) {
    this.mapInstance = map;
    const center = this.mapInstance.getCenter();
    console.log('Center:', center.lat, center.lng);
  
    // Add markers if events are already loaded
    if (this.events.length > 0) {
      this.addMarkersToMap();
    }
  
    // Reverse geocoding (copied 1:1)
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
  
  onMapMoved(event: { lat: number; lng: number }) {
    console.log('Home Map moved to:', event);
  }
  
  onMapClicked(event: { lat: number; lng: number }) {
    console.log('Home Clicked:', event);
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
  
  onSelect(event: AppEvent) {
    console.log('Received Event: Home;', event);
    this.event = event;
    this.showModal = true;
  }
  
  loadBuskers(page: number, size: number): void {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response: { total: number, results: Busker[] }) => {
        console.log('Buskers response:', response);
        this.total = response.total;
        this.buskers = response.results;
      },
      error: (err) => {
        console.error('Error loading buskers:', err);
      }
    });
  }
}