import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { MapService } from '../../common/map/map-service';
import { HttpClient } from '@angular/common/http';
import { EventsClient } from '../../common/event/events-client';
import { EventService } from '../../common/event/event-service';
import { PageListResponse } from '../../common/event/page-list-response';
import { Event } from '../../model/event';
import { CommonModule } from '@angular/common';
import { EventsTableComponent } from '../../common/event/events-table/events-table.component';
import { GlobalDateService } from 'src/app/pages/home/global-date.service';
import { UserRole } from 'src/app/model/user-roles'; // adjust path if needed



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


constructor(private globalDateService: GlobalDateService, private currentUserService: CurrentUserService, private eventsClient: EventsClient, private mapService: MapService) {
  this.globalDateService.globalDate$.subscribe((globalDate) => {
    if(globalDate) {
        this.globalDate = globalDate;
    }
  });

  this.currentUserService.userRole$?.subscribe((roles: UserRole[] | null | undefined) => {
    if (!roles || roles.length === 0) {
      console.log("NOT LOGGED IN");
    } else if (roles.includes(UserRole.ADMIN)) {
      console.log("ADMIN");
    } else if (roles.includes(UserRole.BUSKER)) {
      console.log("BUSKER");
    } else if (roles.includes(UserRole.USER)) {
      console.log("USER");
    } else {
      console.log("Unknown role");
    }
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

let initialEventList = await this.eventsClient.getOpenEvents(
  this.globalDate,
  this.minLat,
  this.minLong,
  this.maxLat,
  this.maxLong,
  Array.from(this.eventTypes)  // Convert Set<string> to string[]
);


console.log(initialEventList);
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