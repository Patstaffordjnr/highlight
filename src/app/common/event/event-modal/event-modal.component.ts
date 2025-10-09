import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { GlobalDateService } from 'src/app/pages/home/global-date.service';
import { Subscription } from 'rxjs';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';
import * as L from 'leaflet';
import { Event as AppEvent } from 'src/app/model/event';
import { markerIcons } from '../../map/map-icons';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { User } from 'src/app/model/user';
import { UserRole } from 'src/app/model/user-roles';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<AppEvent>();
  @Input() event: AppEvent;

  canEdit = false;
  isEditing = false;


  showModal = false;

  mapInstance!: L.Map;
  currentIndex = 0;
  noOfPages = 8;

  showDateControls = false;
  globalDate = new Date();

  userRoles: string[] = []; // Changed to string[] for better type safety
  currentUser: User = {
    id: "string",
    email: "string",
    roles: [],
  };

  mapDetails: any; 
  markersLayer = L.layerGroup(); 
    events: AppEvent[] = [];
    // event!: AppEvent;
    filteredEvents: AppEvent[] = [];
  @ViewChild('modalContent', { static: false }) modalContentRef!: ElementRef;
  
  constructor(
    private currentUserService: CurrentUserService, 
  ){

    
  }
async ngOnInit() {
  const user = await this.currentUserService.getUser();

  if (user) {
    this.currentUser = {
      id: user.id,
      email: user.email,
      roles: user.roles
    };

    this.userRoles = user.roles.map((r: any) => String(r));
    this.updateCanEdit();
  }
}
updateCanEdit() {
  if (!this.currentUser || !this.event) return;

  const isBuskerOwner =
    this.currentUser.roles.includes(UserRole.BUSKER) &&
    this.event.userId === this.currentUser.id;
  const isAdmin = this.currentUser.roles.includes(UserRole.ADMIN);
  this.canEdit = isBuskerOwner || isAdmin;
}

  onClose() {
    this.close.emit();
  }

onEditClick() {
  console.log("EDIT");
  // this.edit.emit(this.event);
  // console.log(this.event);
  // console.log(this.currentUser.roles);
  // console.log(this.event.userId);
  // console.log(this.currentUser.id);

    
}

onMapReady(map: L.Map) {
  this.mapInstance = map;

  if (this.event) {
    const lat = this.event.lat;
    const lng = this.event.long;

    // Center the map on the event
    this.mapInstance.setView([lat, lng], 15);

    // Add marker for the event
    const icon = markerIcons[this.event.eventType as keyof typeof markerIcons];
    L.marker([lat, lng], { icon })
      .addTo(this.mapInstance)
      .bindPopup(`<b>${this.event.title}</b><br>${this.event.eventType}`)
      .openPopup();
  }
}

onMapMoved(event: { lat: number; lng: number }) {
  // console.log('Modal map moved to:', event);
}

onMapClicked(event: { lat: number; lng: number }) {
  // console.log('Modal map clicked at:', event);
}


  onBackdropClick(event: MouseEvent) {
    const modalEl = this.modalContentRef?.nativeElement;

    // Click is outside the modal content
    if (modalEl && !modalEl.contains(event.target)) {
      this.onClose(); 
      // console.log('Clicked outside modal content');
    } else {
      // console.log('Clicked inside modal content');
    }
  }

}