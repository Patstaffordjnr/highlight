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

// AfterViewInit, OnChanges


export class EventModalComponent implements OnInit {
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


// ngAfterViewInit() {
//   if (this.isOpen) {
//     setTimeout(() => {
//       const modal = this.elementRef.nativeElement.closest('.event-modal') as HTMLElement;
//       if (modal) {
//         modal.scrollTop = 0;
//         console.log('Modal scroll forced to top');
//       }
//     }, 100);
//   }
// }

// ngOnChanges(changes: SimpleChanges) {
//   if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
//     setTimeout(() => {
//       const modal = document.querySelector('.event-modal') as HTMLElement;
//       if (modal) {
//         modal.scrollTop = 0;
//         console.log('Modal forced to top');
//       }
//     }, 200); // 200ms delay to beat calendar focus
//   }
// }
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
    console.log('EDIT');
    this.isEditing = true;
    console.log(this.event.startAt)
  }


 toggleFinishDateControls(){
    console.log(`FinishControlDateSelect`);

 }

 onStartTimeSelected(selectedDate: Date) {

  const updatedStartTime = new Date(
    this.currentEvent.startAt.getFullYear(), 
    this.currentEvent.startAt.getMonth(),
    this.currentEvent.startAt.getDate(),
    selectedDate.getHours(),
    selectedDate.getMinutes(),
  0
);

this.currentEvent.startAt = updatedStartTime;
}

 onEndTimeSelected(selectedDate: Date) {

  const updatedEndTime = new Date(
    this.currentEvent.endAt.getFullYear(), 
    this.currentEvent.endAt.getMonth(),
    this.currentEvent.endAt.getDate(),
    selectedDate.getHours(),
    selectedDate.getMinutes(),
  0
);

this.currentEvent.endAt = updatedEndTime;
}

// onDateSelected(selectedDate: Date): void {
//   if (!selectedDate) return;
//   const updatedGlobalDate = new Date(
//     selectedDate.getFullYear(),
//     selectedDate.getMonth(),
//     selectedDate.getDate(),
//     this.event.startAt.getHours(),
//     this.event.startAt.getMinutes(),
//     0
//   );
//   this.globalDate = updatedGlobalDate;
  // this.globalDateService.upDate(updatedGlobalDate);

  // if (this.globalDate.getTime() !== updatedGlobalDate.getTime()) {
    // this.globalDateService.upDate(updatedGlobalDate);
    // console.log(`Home Calendar Select Date: ${updatedGlobalDate}`);
//   }
// }
onMapReady(map: L.Map) {
  this.mapInstance = map;

  if (!this.event || !this.mapInstance) return;

  const { lat, long: lng, title, eventType } = this.event;
  const icon = markerIcons[eventType as keyof typeof markerIcons];

  // Set center
  this.mapInstance.setView([lat, lng], 15);

  // Add marker
  const marker = L.marker([lat, lng], { icon }).addTo(this.mapInstance);

  // Bind popup
  marker.bindPopup(`<b>${title}</b><br>${eventType}`);

  // Wait for DOM + map to stabilize
  setTimeout(() => {
    if (marker.getPopup()) {
      marker.openPopup();
    }
  }, 150);
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