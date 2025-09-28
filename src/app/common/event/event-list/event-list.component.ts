import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { CurrentUserService } from '../../../util/can-activate.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';
import { Event as AppEvent } from 'src/app/model/event';
import { Busker } from 'src/app/model/busker';

import { EventFilter } from 'src/app/model/event-list-filter';
import { BuskerModalComponent } from 'src/app/common/busker/busker-modal/busker-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {

  showModal = false;
  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);

  // Buskers
  buskers: Busker[] = [];
  allBuskers: Busker[] = []; // full list for search
  totalBuskers: number = 0;

    // Modal state is included for structure consistency, though not fully implemented
  busker: Busker | null = null; 

  // Events
  events: AppEvent[] = [];
  allEvents: AppEvent[] = []; // full list for search

  userRoles = [];
  currentUser: User = {
    id: "string",
    email: "string",
    roles: [],
  };

  form: FormGroup;
  event: AppEvent;

  // Pagination settings
  pageSize = 5;

  @Output() filterChange = new EventEmitter<EventFilter>();
  distances: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50];
  selectedDistance: number = 5; // default
  withinOptions: { label: string, value: number }[] = [
    { label: '30 minutes', value: 0.5 },
    { label: '1 hour', value: 1 },
    { label: '2 hours', value: 2 },
    { label: '3 hours', value: 3 },
    { label: '12 hours', value: 12 },
    { label: '24 hours', value: 24 },
    { label: '2 days', value: 48 },
    { label: '1 week', value: 168 },
    { label: '1 month', value: 720 }
  ];
  sortOptions: { label: string, value: string }[] = [
    { label: 'Starting', value: 'starting' },
    { label: 'Ending', value: 'ending' },
    { label: 'Nearest', value: 'distance' },
    { label: 'Most Followers', value: 'followers' },
    { label: 'Most Attended', value: 'attendance' }
  ];


// Event controls
eventSearchText: string = '';
eventSelectedSort: string = 'starting';
eventSelectedDistance: number = 5;
eventSelectedWithin: number = 1;


  // Event pagination
  currentEventPage = 0;
  get paginatedEvents(): AppEvent[] {
    const start = this.currentEventPage * this.pageSize;
    return this.events.slice(start, start + this.pageSize);
  }
  get totalEventPages(): number {
    return Math.ceil(this.events.length / this.pageSize);
  }
  nextEventPage(): void {
    if ((this.currentEventPage + 1) * this.pageSize < this.events.length) this.currentEventPage++;
  }
  prevEventPage(): void {
    if (this.currentEventPage > 0) this.currentEventPage--;
  }


// Event search
onEventSearchChange(): void {
  const value = this.eventSearchText.toLowerCase();
  this.events = this.allEvents.filter(ev =>
    ev.title.toLowerCase().includes(value) || ev.eventType.toLowerCase().includes(value)
  );
  this.currentEventPage = 0;
}

// Event sort
onEventSortChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value;
  this.eventSelectedSort = value;
  // this.sortEvents(value);
}

// Event distance / within
onEventDistanceChange(event: Event): void {
  this.eventSelectedDistance = Number((event.target as HTMLSelectElement).value);
  this.emitEventFilter();
}
onEventWithinChange(event: Event): void {
  this.eventSelectedWithin = Number((event.target as HTMLSelectElement).value);
  this.emitEventFilter();
}

  constructor(
    private formBuilder: FormBuilder,
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService,
  ) {
    this.openHttpClientService.getEvents(
      new Date(2025, 6, 6, 23, 0, 0),
      -88, -88, 80, 80,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (events: AppEvent[]) => {
        this.allEvents = events;
        this.events = [...this.allEvents];
      },
      error: (error) => console.error(error),
    });
  }

  async ngOnInit() {
    const user = await this.currentUserService.getUser();
    if (!user) {
      console.warn('No current user found!');
      return;
    }

    this.currentUser.id = user.id;
    this.currentUser.email = user.email;
    this.currentUser.roles = user.roles;

    const role = this.currentUser.roles.find(r => ['USER','BUSKER','ADMIN'].includes(String(r)));
    this.userRoles = role ? [String(role)] : [];
  }

  buskerSelect(busker: Busker) {
    console.log(busker);
  }

  eventSelect(event: AppEvent) {
    console.log(event);
  }

  loadBuskers(page: number, size: number): void {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response: { total: number, results: Busker[] }) => {
        this.totalBuskers = response.total;
        this.allBuskers = response.results;
        this.buskers = [...this.allBuskers];
      },
      error: (err) => console.error(err)
    });
  }

private emitEventFilter(): void {
  console.log({
    search: this.eventSearchText,
    distance: this.eventSelectedDistance,
    within: this.eventSelectedWithin,
    sort: this.eventSelectedSort
  });
}
}
