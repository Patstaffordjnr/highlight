import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { MapService } from '../../map/map-service';
import { HttpClient } from '@angular/common/http';
import { EventsClient } from '../events-client';
import { EventService } from '../event-service';
import { PageListResponse } from '../page-list-response';
import { Event } from '../../../model/event';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  userRoles = [];
  currentUser: User = {
  id: "string",
  email: "string",
  roles: [],
};

form: FormGroup;

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

eventResponseList: PageListResponse = {
total: 0,
results: []
};

constructor(private formBuilder: FormBuilder, private currentUserService: CurrentUserService, private eventsClient: EventsClient, private eventService: EventService,  private http: HttpClient, private cdRef: ChangeDetectorRef, private mapService: MapService) {
  this.form = this.formBuilder.group({
    email: ['busker@dumb.com'],
    password: ['dumb'],
  });
}

async ngOnInit() {

  this.currentIndex = this.currentIndex;
  let initialEventList =   await this.eventsClient.getEvents(this.currentIndex, 30)
  this.reveivedObject =  initialEventList;
  this.eventResponseList.total = this.reveivedObject.total;
  this.eventResponseList.results = this.reveivedObject.results;

console.log(initialEventList);
}
}
 
