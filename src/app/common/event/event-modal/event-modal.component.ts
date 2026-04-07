import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { EventType } from 'src/app/model/event-types';
import * as L from 'leaflet';
import { Event as AppEvent } from 'src/app/model/event';
import { markerIcons } from '../../map/map-icons';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { User } from 'src/app/model/user';
import { UserRole } from 'src/app/model/user-roles';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent implements OnInit {

  private mapInitialized = false;
  private _skipValidation = false;
  private originalMarker?: L.Marker;

  isSelectingLocation = false;
  isCreateMode = false;

  @Input() isOpen = false;
  @Input() event!: AppEvent;

  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<AppEvent>();
  @Output() eventSaved = new EventEmitter<void>();

  @ViewChild('modalContent', { static: false }) modalContentRef!: ElementRef;

  canEdit = false;
  isEditing = false;
  isFollowing = false;
  isLoggedIn = false;

  mapInstance!: L.Map;

  userName: string = 'Loading...';

  userRoles: string[] = [];
  currentUser: User = {
    id: 'string',
    email: 'string',
    roles: [],
  };

  address: string = 'Loading address...';
  currentEvent: AppEvent = {
    createdAt: new Date(),
    endAt: new Date(),
    eventType: EventType.ALL,
    id: '',
    lat: 0,
    long: 0,
    startAt: new Date(),
    title: '',
    updatedAt: new Date(),
    userId: ''
  };

  markersLayer = L.layerGroup();

  constructor(
    private currentUserService: CurrentUserService,
    private elementRef: ElementRef,
    private openHttpClientService: OpenHttpClientService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.isCreateMode = !this.event;
    console.log('Modal opened, event:', this.event);
    console.log('userId:', this.event?.userId);

    if (this.isCreateMode) {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      this.currentEvent = {
        createdAt: now,
        endAt: oneHourLater,
        eventType: EventType.BUSKER,
        id: '',
        lat: 0,
        long: 0,
        startAt: now,
        title: '',
        updatedAt: now,
        userId: ''
      };
      this.address = 'Click the map to set a location';
      this.isEditing = true;
    } else {
      this.currentEvent = {
        createdAt: new Date(Number(this.event.startAt) * 1000),
        endAt: new Date(Number(this.event.endAt) * 1000),
        eventType: this.event.eventType,
        id: this.event.id,
        lat: this.event.lat,
        long: this.event.long,
        startAt: new Date(Number(this.event.startAt) * 1000),
        title: this.event.title,
        updatedAt: new Date(Number(this.event.updatedAt) * 1000),
        userId: this.event.userId
      };
      this.address = await this.reverseGeocode(this.event.lat, this.event.long);
    }

    const user = await this.currentUserService.getUser();
    this.isLoggedIn = !!user;
    if (user) {
      this.currentUser = {
        id: user.id,
        email: user.email,
        roles: user.roles,
      };
      this.userRoles = user.roles.map((r: any) => String(r));
      this.updateCanEdit();

      if (this.isCreateMode) {
        this.currentEvent.userId = String(user.id);
        this.userName = String(user.email);
      } else {
        this.userName = this.event.userName || 'Unknown';
        this.openHttpClientService.isFollowingEvent(this.event.id).subscribe({
          next: (following) => this.isFollowing = following,
          error: () => this.isFollowing = false
        });
      }
    } else if (!this.isCreateMode) {
      this.userName = this.event.userName || 'Unknown';
    }
  }

  onFollowClick() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.isFollowing) {
      this.openHttpClientService.unfollowEvent(this.event.id).subscribe({
        next: () => this.isFollowing = false
      });
    } else {
      this.openHttpClientService.followEvent(this.event.id).subscribe({
        next: () => this.isFollowing = true
      });
    }
  }

  private async fetchUserName(userId: string): Promise<void> {
    try {
      console.log('Fetching username for userId:', userId);
      const response = await fetch(
        `http://localhost:8085/user/${userId}`,
        { credentials: 'include' }
      );
      console.log('Response status:', response.status);
      const user = await response.json();
      console.log('User data:', user);
      this.userName = String(user.email) || 'Unknown';
    } catch (error) {
      console.error('Failed to fetch username:', error);
      this.userName = 'Unknown';
    }
  }

  private async reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      if (!response.ok) throw new Error('Failed to fetch address');
      const data = await response.json();
      const shorterAddress = [
        data.address?.city || data.address?.town || data.address?.village,
        data.address?.postcode
      ].filter(Boolean).join(', ');
      return shorterAddress || data.display_name || 'Address not found';
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return 'Address unavailable';
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

  onEditClick() {
    this.isEditing = true;
    if (this.event) console.log(this.event.startAt);
  }

  toggleStartDateControls() {}
  toggleFinishDateControls() {}

  startLocationSelection() {
    this.isSelectingLocation = true;

    this.mapInstance.on('click', (e: L.LeafletMouseEvent) => {
      if (!this.isSelectingLocation) return;

      const { lat, lng } = e.latlng;
      this.currentEvent.lat = lat;
      this.currentEvent.long = lng;

      if (this.originalMarker) {
        this.originalMarker.setLatLng([lat, lng]);
      } else {
        const icon = markerIcons[this.currentEvent.eventType as keyof typeof markerIcons];
        this.originalMarker = L.marker([lat, lng], { icon })
          .addTo(this.mapInstance)
          .bindPopup('New event location');
      }

      this.reverseGeocode(lat, lng).then(addr => {
        this.address = addr;
      });

      this.isSelectingLocation = false;
    });
  }

  cancelLocationSelection() {
    this.isSelectingLocation = false;
  }

  onSave() {
    if (this.isCreateMode) {
      this.openHttpClientService.createEvent(this.currentEvent).subscribe({
        next: (createdEvent) => {
          console.log('Event created:', createdEvent);
          this.eventSaved.emit();
          this.onClose();
        },
        error: (err) => {
          console.error('Error creating event:', err);
        }
      });
    } else {
      this.openHttpClientService.updateEvent(this.currentEvent).subscribe({
        next: (updatedEvent) => {
          console.log('Event updated:', updatedEvent);
          this.eventSaved.emit();
          this.onClose();
        },
        error: (err) => {
          console.error('Error updating event:', err);
        }
      });
    }
  }

  onStartTimeSelected(selectedTime: Date): void {
    if (this._skipValidation) return;
    const newStart = new Date(this.currentEvent.startAt);
    newStart.setHours(selectedTime.getHours());
    newStart.setMinutes(selectedTime.getMinutes());
    this.currentEvent.startAt = newStart;
    this._enforceValidRange();
  }

  onStartDateSelected(selectedDate: Date): void {
    if (!selectedDate || !this.currentEvent?.startAt) return;
    const newStart = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      this.currentEvent.startAt.getHours(),
      this.currentEvent.startAt.getMinutes(),
      0
    );
    this.currentEvent.startAt = newStart;
    if (this.currentEvent.endAt && this.currentEvent.endAt <= newStart) {
      this._skipValidation = true;
      this.currentEvent.endAt = new Date(newStart);
      this._skipValidation = false;
    }
  }

  onEndTimeSelected(selectedTime: Date): void {
    if (this._skipValidation) return;
    const newEnd = new Date(this.currentEvent.endAt);
    newEnd.setHours(selectedTime.getHours());
    newEnd.setMinutes(selectedTime.getMinutes());
    this.currentEvent.endAt = newEnd;
    this._enforceValidRange();
  }

  onEndDateSelected(selectedDate: Date): void {
    if (!selectedDate || !this.currentEvent?.endAt) return;
    const newEnd = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      this.currentEvent.endAt.getHours(),
      this.currentEvent.endAt.getMinutes(),
      0
    );
    this.currentEvent.endAt = newEnd;
    if (this.currentEvent.startAt && newEnd <= this.currentEvent.startAt) {
      this._skipValidation = true;
      this.currentEvent.startAt = new Date(newEnd);
      this._skipValidation = false;
    }
  }

  private _enforceValidRange(): void {
    if (this._skipValidation) return;
    this._skipValidation = true;
    const start = this.currentEvent.startAt.getTime();
    const end = this.currentEvent.endAt.getTime();
    if (end <= start) {
      this.currentEvent.endAt = new Date(start);
    }
    this._skipValidation = false;
  }

  onMapReady(map: L.Map) {
    this.mapInstance = map;
    if (this.mapInitialized) return;

    if (this.isCreateMode) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.mapInstance.setView([latitude, longitude], 13);
          },
          (error) => {
            console.warn('Geolocation failed, defaulting to Dublin:', error);
            this.mapInstance.setView([53.3498, -6.2603], 13);
          }
        );
      } else {
        this.mapInstance.setView([53.3498, -6.2603], 13);
      }

      this.mapInstance.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        this.currentEvent.lat = lat;
        this.currentEvent.long = lng;
        if (this.originalMarker) {
          this.originalMarker.setLatLng([lat, lng]);
        } else {
          const icon = markerIcons[EventType.BUSKER as keyof typeof markerIcons];
          this.originalMarker = L.marker([lat, lng], { icon })
            .addTo(this.mapInstance)
            .bindPopup('New event location');
        }
        this.reverseGeocode(lat, lng).then(addr => {
          this.address = addr;
        });
      });

    } else if (this.event) {
      const { lat, long: lng, title, eventType } = this.event;
      const icon = markerIcons[eventType as keyof typeof markerIcons];
      this.mapInstance.setView([lat, lng], 15);
      this.originalMarker = L.marker([lat, lng], { icon })
        .addTo(this.mapInstance)
        .bindPopup(`<b>${title}</b><br>${eventType}`)
        .openPopup();
    }

    setTimeout(() => this.mapInstance.invalidateSize(), 200);
    this.mapInitialized = true;
  }

  onClose() {
    this.mapInitialized = false;
    this.close.emit();
  }

  onMapMoved(event: { lat: number; lng: number }) {}
  onMapClicked(event: { lat: number; lng: number }) {}

  onBackdropClick(event: MouseEvent) {
    const modalEl = this.modalContentRef?.nativeElement;
    if (modalEl && !modalEl.contains(event.target)) {
      this.onClose();
    }
  }
}