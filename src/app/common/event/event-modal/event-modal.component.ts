import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
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


export class EventModalComponent implements OnInit {

  private mapInitialized = false;  // Add this flag
  private _skipValidation = false;   // prevents infinite recursion

 @Input() isOpen = false;
  @Input() event!: AppEvent;

  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<AppEvent>();

  @ViewChild('modalContent', { static: false }) modalContentRef!: ElementRef;

  canEdit = false;
  isEditing = false;
  showModal = false;

  mapInstance!: L.Map;
  currentIndex = 0;
  noOfPages = 8;

  showDateControls = false;
  globalDate = new Date();

  userRoles: string[] = [];
  currentUser: User = {
    id: 'string',
    email: 'string',
    roles: [],
  };


   currentEvent: AppEvent = {
  createdAt: new Date(),
  endAt: new Date(),
  eventType: EventType.ALL,
  id: 'string',
  lat: 0,
  long: 0,
  startAt:  new Date(),
  title: 'string',
  updatedAt:  new Date(),
  userId: 'string'
  };

  mapDetails: any;
  markersLayer = L.layerGroup();
  events: AppEvent[] = [];
  filteredEvents: AppEvent[] = [];

  constructor(private currentUserService: CurrentUserService, private elementRef: ElementRef) {
  }

  async ngOnInit() {

    let currentEventX = await this.event;
    
    if(currentEventX){
      this.currentEvent = {
      createdAt: new Date(Number(this.event.startAt) * 1000),
      endAt: new Date(Number(this.event.endAt) * 1000),
      eventType: this.event.eventType,
      id: this.event.id,
      lat: this.event.lat,
      long: this.event.long,
      startAt:  new Date(Number(this.event.startAt) * 1000),
      title: this.event.title,
      updatedAt:  new Date(Number(this.event.updatedAt) * 1000),
      userId: this.event.userId
      };
    }

    const user = await this.currentUserService.getUser();

    if (user) {
      this.currentUser = {
        id: user.id,
        email: user.email,
        roles: user.roles,
      };

      this.userRoles = user.roles.map((r: any) => String(r));
      this.updateCanEdit();
    }

    if(this.isOpen == true) {
      this.onStartTimeSelected(this.currentEvent.startAt);
      this.onEndTimeSelected(this.currentEvent.endAt);
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
    console.log('EDIT');
    this.isEditing = true;
    console.log(this.event.startAt)
  }


 toggleFinishDateControls(){
    console.log(`FinishControlDateSelect`);

 }

onStartTimeSelected(selectedTime: Date): void {
  if (this._skipValidation) return;

  const newStart = new Date(this.currentEvent.startAt);
  newStart.setHours(selectedTime.getHours());
  newStart.setMinutes(selectedTime.getMinutes());

  this.currentEvent.startAt = newStart;
  this._enforceValidRange();               // <-- shared logic
}
onStartDateSelected(selectedDate: Date): void {
  if (!selectedDate || !this.currentEvent?.startAt) return;

  // Build the new start date keeping the current time
  const newStart = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    this.currentEvent.startAt.getHours(),
    this.currentEvent.startAt.getMinutes(),
    this.currentEvent.startAt.getSeconds(),
    this.currentEvent.startAt.getMilliseconds()
  );

  this.currentEvent.startAt = newStart;

  // ── Auto-fix: if start would be after end → push end forward ──
  if (this.currentEvent.endAt && this.currentEvent.endAt <= newStart) {
    this._skipValidation = true;               // block recursion
    const newEnd = new Date(newStart);
    newEnd.setMinutes(newEnd.getMinutes()); // minimum 30-minute event (feel free to change)
    this.currentEvent.endAt = newEnd;
    this._skipValidation = false;
  }
}


onEndTimeSelected(selectedTime: Date): void {
  if (this._skipValidation) return;

  const newEnd = new Date(this.currentEvent.endAt);
  newEnd.setHours(selectedTime.getHours());
  newEnd.setMinutes(selectedTime.getMinutes());

  this.currentEvent.endAt = newEnd;
  this._enforceValidRange();               // <-- shared logic
}

// ──────────────────────────────────────────────────────────────
// 4. Private helper – the single source of truth for validation
// ──────────────────────────────────────────────────────────────


onEndDateSelected(selectedDate: Date): void {
  if (!selectedDate || !this.currentEvent?.endAt) return;

  const newEnd = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    this.currentEvent.endAt.getHours(),
    this.currentEvent.endAt.getMinutes(),
    this.currentEvent.endAt.getSeconds(),
    this.currentEvent.endAt.getMilliseconds()
  );

  this.currentEvent.endAt = newEnd;

  // ── Auto-fix: if end would be before start → pull start back ──
  if (this.currentEvent.startAt && newEnd <= this.currentEvent.startAt) {
    this._skipValidation = true;
    const newStart = new Date(newEnd);
    newStart.setMinutes(newStart.getMinutes()); // keep at least 30 min before end
    this.currentEvent.startAt = newStart;
    this._skipValidation = false;
  }
}

private _enforceValidRange(): void {
  if (this._skipValidation) return;

  this._skipValidation = true;

  const start = this.currentEvent.startAt.getTime();
  const end   = this.currentEvent.endAt.getTime();

  if (end <= start) {
    // Decide your policy: extend end (most common) or shrink start
    const newEnd = new Date(start);
    newEnd.setMinutes(newEnd.getMinutes());   // minimum duration
    this.currentEvent.endAt = newEnd;
  }

  this._skipValidation = false;
}

onMapReady(map: L.Map) {
    this.mapInstance = map;

    // ← ONLY RUN CENTERING + MARKER LOGIC ONCE
    if (this.mapInitialized || !this.event) return;

    const { lat, long: lng, title, eventType } = this.event;
    const icon = markerIcons[eventType as keyof typeof markerIcons];

    // Center on the event (only once!)
    this.mapInstance.setView([lat, lng], 15);

    // Add marker with popup
    const marker = L.marker([lat, lng], { icon })
      .addTo(this.mapInstance)
      .bindPopup(`<b>${title}</b><br>${eventType}`)
      .openPopup();

    // Critical: tell Leaflet to recalculate size (modal was hidden)
    setTimeout(() => {
      this.mapInstance.invalidateSize();
    }, 200);

    // Mark as done — never run again
    this.mapInitialized = true;
  }

  // Optional: Reset flag when modal closes (so next open works correctly)
  onClose() {
    this.mapInitialized = false;  // ← reset for next time
    this.close.emit();
  }

  onMapMoved(event: { lat: number; lng: number }) {
    // console.log('Modal map moved to:', event);
  }

  onMapClicked(event: { lat: number; lng: number }) {
    // console.log('Modal map clicked at:', event);
  }

  onBackdropClick(event: MouseEvent) {
    const modalEl = this.modalContentRef?.nativeElement;

    // Close modal if clicked outside
    if (modalEl && !modalEl.contains(event.target)) {
      this.onClose();
      // console.log('Clicked outside modal content');
    } else {
      // console.log('Clicked inside modal content');
    }
  }
}