import { Component, OnInit ,ChangeDetectorRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PageListResponse } from '../event/page-list-response'; 
import { EventsClient } from '../event/events-client'; 
import { MapService } from '../map/map-service'; 
import { FormGroup, FormBuilder } from '@angular/forms';

import { Event  as AppEvent } from 'src/app/model/event'; 
import { EventService } from '../event/event-service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OpenHttpClientService } from '../http/open-http-client.service';
import { GlobalDateService } from 'src/app/pages/home/global-date.service';

@Component({
  selector: 'app-common-events',
  standalone: true, // <- Add this
  imports: [CommonModule], // <- Add any modules needed by the template
  templateUrl: 'common-events.component.html',
  styleUrl: 'common-events.component.css'
})

export class CommonEventsComponent implements OnInit {

  globalDate

  eventsAddressIndexed = []
  eventLatArray = [];
  eventLngArray = [];
  currentIndex = 0;
  reveivedObject

  pageNumberArray = []
  totalNumberOfEvents;
  totalNumberOfPages;
  noOfEventsPerPage = 10;
  lastElementOfCurrentArr = this.pageNumberArray.slice(-1);

  eventAddress = [];
  
  form: FormGroup;

  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);
  currentPage;
  noOfProducts;
  bounds
  minLat
  maxLat
  minLong
  maxLong 

eventResponseList: PageListResponse = {
  total: 0,
 results: []
};

@Input() events: AppEvent[] = [];
@Output() selectedEvent = new EventEmitter<AppEvent>();

constructor (private globalDateService: GlobalDateService, private openHttpClientService: OpenHttpClientService, private mapService: MapService, private formBuilder: FormBuilder, private eventsClient: EventsClient, private eventService: EventService,  private http: HttpClient, private cdRef: ChangeDetectorRef) {
  this.form = this.formBuilder.group({
    searchText: [''],
  });

this.reverseGeocode(1,0)
}

async ngOnInit() {
  if (this.events?.length) {
    this.reveivedObject = this.events;
    this.eventResponseList.total = this.reveivedObject.total;
    this.eventResponseList.results = this.reveivedObject.results;
    this.reverseGeocode(1,0)
  } else {
    // console.warn('No events received from parent.');
  }

  
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['events'] && changes['events'].currentValue?.length) {
    const firstEvent = this.events[0];
    if (firstEvent.lat && firstEvent.long) {
      this.reverseGeocode(firstEvent.lat, firstEvent.long).then(address => {
        this.eventsAddressIndexed[0] = address;
        console.log('Resolved Address:', address);
      });
    }
  }
}

onSelect(event: AppEvent) {
  console.log(event);
          console.log(this.events);
  this.selectedEvent.emit(event);
  return this.selectedEvent;
}

private async reverseGeocode(lat: number, lng: number): Promise<string> {

  console.log('XXXXXXXXXXXX');
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();

    if (data.address) {
      const addr = data.address;
      const road = addr.road || addr.suburb || '';
      const city = addr.city || addr.town || addr.village || addr.county || '';
      const country = addr.country || '';
      return `${road ? road + ', ' : ''}${city}, ${country}`;
    } else {
      return data.display_name || 'Unknown Location';
    }
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return 'Unknown Location';
  }
}

}



