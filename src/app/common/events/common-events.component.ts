import { Component, OnInit ,ChangeDetectorRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PageListResponse } from '../event/page-list-response'; 
import { EventsClient } from '../event/events-client'; 
import { MapService } from '../map/map-service'; 
import { FormGroup, FormBuilder } from '@angular/forms';

import { Event } from 'src/app/model/event'; 
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

@Input() events: Event[] = [];
@Output() selectedEvent = new EventEmitter<Event>();

constructor (private globalDateService: GlobalDateService, private openHttpClientService: OpenHttpClientService, private mapService: MapService, private formBuilder: FormBuilder, private eventsClient: EventsClient, private eventService: EventService,  private http: HttpClient, private cdRef: ChangeDetectorRef) {
  this.form = this.formBuilder.group({
    searchText: [''],
  });
}

async ngOnInit() {
  if (this.events?.length) {
    this.reveivedObject = this.events;
    this.eventResponseList.total = this.reveivedObject.total;
    this.eventResponseList.results = this.reveivedObject.results;
  } else {
    // console.warn('No events received from parent.');
  }
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['events'] && changes['events'].currentValue) {
    // console.log('Received events via @Input():', this.events);
  }
}

onSelect(event: Event) {
  // console.log(event);
  this.selectedEvent.emit(event);
  return this.selectedEvent;
}

}



