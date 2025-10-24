
import { User } from '../../model/user';
import { AuthService } from '../../util/auth.service';
import { CurrentUserService } from '../../util/can-activate.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenHttpClientService } from '../../common/http/open-http-client.service';
import { EventType } from '../../model/event-types';
import { UserProfileComponent } from '../../common/user-profile/user-profile.component';
import { Event as AppEvent } from '../../model/event';
import { Busker } from '../../model/busker';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { EventModalComponent } from '../../common/event/event-modal/event-modal.component';
import { Event as Event } from '../../model/event';
import { markerIcons } from './../../common/map/map-icons';
import { UserRole } from '../../model/user-roles';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
    showEventModal = false;
  showBuskerModal = false;
showModal = false;
  // Users
  users: User[] = [];
  allUsers: User[] = [];
  totalUsers: number = 0;
  busker: User | null = null;


    eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);
  buskers: Busker[] = [];
  total: number = 0;
  
  userRoles: string[] = [];
    currentUser: User = {
    id: "string",
    email: "string",
    roles: [],
  };

  form: FormGroup;

  events: AppEvent[] = [];
  event: AppEvent;
    mapInstance!: L.Map;
    mapDetails: any; // could be {lat, lng, bounds, etc.}
    markersLayer = L.layerGroup(); // This layer will hold all markers
    homeAddress: string = '';

  filteredEvents: AppEvent[] = []; // filtered list

  constructor(private formBuilder: FormBuilder, private currentUserService: CurrentUserService, private openHttpClientService: OpenHttpClientService) {

    // this.form = this.formBuilder.group({
    //   email: ['busker@dumb.com'],
    //   password: ['dumb'],
    // });

    this.openHttpClientService.getEvents(
      new Date(2025, 6, 6, 23, 0, 0),
      -88,
      -88
      ,80
      ,80,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (events: AppEvent[]) => {
  
        // 'events' here IS your complete list of Event[]
        // console.log('Successfully extracted events:', events);
        this.events = events; // Assign the full list to your component property
        console.log(events);
            if (this.mapInstance) {

      this.addMarkersToMap();
    }
        
      },
      error: (error) => {
        // console.error('Error fetching events:', error);
      },
    });


  }

  async ngOnInit() {
     this.loadBuskers(0, 10);
      let user = await this.currentUserService.getUser();

     if(user) {
      console.log(user);

    this.currentUser.id = user.id;
    this.currentUser.email =  user.email;
    this.currentUser.roles = user.roles;

    let a = this.currentUser.roles.filter((userRole) => {
      if(String(userRole) === "USER") {
        this.userRoles = ['USER'];
        return "USER";

    } else if (String(userRole) === "BUSKER") {
      this.userRoles = ['BUSKER'];
      return "BUSKER";
      
    } else if (String(userRole) === "ADMIN") {
      this.userRoles = ['ADMIN'];
      return "ADMIN";
    }
    })

     }

   
    
  }

onMapReady(map: L.Map) {
  this.mapInstance = map;
  const center = this.mapInstance.getCenter();
  console.log('Center:', center.lat, center.lng);

  // Only add markers once events exist
  if (this.events.length > 0) {
    this.addMarkersToMap();
  }

  // Reverse geocoding (unchanged)
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
      .on('click', () => this.onEventSelect(event));
  });
  this.markersLayer.addTo(this.mapInstance);
}

   onBuskerSelect(busker: User) {
    console.log('Received Busker: Home;', event);
    this.busker = busker;
    this.showBuskerModal = true;
  }

  onEventSelect(event: AppEvent) {
    this.event = event;
    this.showEventModal = true;
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
