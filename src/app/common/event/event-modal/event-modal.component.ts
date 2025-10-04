import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { GlobalDateService } from 'src/app/pages/home/global-date.service';
import { Subscription } from 'rxjs';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';
import * as L from 'leaflet';
import { Event as AppEvent } from 'src/app/model/event';
import { markerIcons } from '../../map/map-icons';
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() event: AppEvent;

  showModal = false;
  mapInstance!: L.Map;
  currentIndex = 0;
  noOfPages = 8;

  showDateControls = false;
  globalDate = new Date();


  mapDetails: any; 
  markersLayer = L.layerGroup(); 
    events: AppEvent[] = [];
    // event!: AppEvent;
    filteredEvents: AppEvent[] = [];
  @ViewChild('modalContent', { static: false }) modalContentRef!: ElementRef;
  
  onClose() {
    this.close.emit();
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