import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { MapService } from '../../common/map/map-service';
import { HttpClient } from '@angular/common/http';
import { EventsClient } from '../../common/event/events-client';
import { EventService } from '../../common/event/event-service';
import { PageListResponse } from '../../common/event/page-list-response';
import { Event as AppEvent } from '../../model/event';
import { CommonModule } from '@angular/common';
import { EventsTableComponent } from '../../common/event/events-table/events-table.component';
import { GlobalDateService } from 'src/app/pages/home/global-date.service';
import { UserRole } from 'src/app/model/user-roles';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  globalDate = new Date();

  userRoles = [];
  currentUser: User = {
  id: "string",
  email: "string",
  roles: [],
};

  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);
  currentPage;
  noOfProducts;
  bounds
  minLat
  maxLat
  minLong
  maxLong 

  events: AppEvent[] = [];

constructor(private globalDateService: GlobalDateService, private currentUserService: CurrentUserService, private openHttpClientService: OpenHttpClientService, private mapService: MapService) {
  this.globalDateService.globalDate$.subscribe((globalDate) => {
    if(globalDate) {
        this.globalDate = globalDate;
    }
  });

  this.currentUserService.userRole$?.subscribe((roles: UserRole[] | null | undefined) => {
    if (!roles || roles.length === 0) {
      // console.log("NOT LOGGED IN");
    } else if (roles.includes(UserRole.ADMIN)) {
      // console.log("ADMIN");
    } else if (roles.includes(UserRole.BUSKER)) {
      // console.log("BUSKER");
    } else if (roles.includes(UserRole.USER)) {
      // console.log("USER");
    } else {
      // console.log("Unknown role");
    }
  });

  this.openHttpClientService.getEvents(
    new Date(2025, 6, 6, 23, 0, 0),
    -88,
    -88
    ,80
    ,80,
    [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
  ).subscribe({
    next: (events: AppEvent[]) => {
      // console.log('Successfully extracted events:', events);
      this.events = events; 
    },
    error: (error) => {
      console.error('Error fetching events:', error);
    },
  });
}

async ngOnInit() {
this.mapService.mapCurrentLocationDetails$.subscribe((mapDetails) => {
  const [ bounds, minLat, maxLat, minLong, maxLong ] = mapDetails;
  this.bounds = bounds;
  this.minLat = minLat;
  this.maxLat = maxLat;
  this.minLong = minLong;
  this.maxLong = maxLong;
});
}

onGenreChange(updatedGenres: Set<string>) {
  this.eventTypes = new Set(['Band', 'Busker', 'Dj', 'Performance']);
  console.log(this.eventTypes);
}

}
 
















//   userRoles = [];
//   currentUser: User = {
//   id: "string",
//   email: "string",
//   roles: [],
// };

// form: FormGroup;

// eventsAddressIndexed = []
// eventLatArray = [];
// eventLngArray = [];
// currentIndex = 0;
// reveivedObject

// pageNumberArray = []
// totalNumberOfEvents;
// totalNumberOfPages;
// noOfEventsPerPage = 10;
// lastElementOfCurrentArr = this.pageNumberArray.slice(-1);

// eventAddress = [];

// eventResponseList: PageListResponse = {
// total: 0,
// results: []
// };

// constructor(private formBuilder: FormBuilder, private currentUserService: CurrentUserService, private eventsClient: EventsClient, private eventService: EventService,  private http: HttpClient, private cdRef: ChangeDetectorRef, private mapService: MapService) {
  // this.form = this.formBuilder.group({
  //   email: ['busker@dumb.com'],
  //   password: ['dumb'],
  // });


// async ngOnInit() {

  // this.currentIndex = this.currentIndex;
//   let initialEventList =   await this.eventsClient.getEvents()
//   this.reveivedObject =  initialEventList;
//   this.eventResponseList.total = this.reveivedObject.total;
//   this.eventResponseList.results = this.reveivedObject.results;

// console.log(initialEventList);