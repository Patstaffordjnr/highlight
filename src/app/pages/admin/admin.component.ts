import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../model/user';
import { CurrentUserService } from '../../util/can-activate.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenHttpClientService } from '../../common/http/open-http-client.service';
import { EventType } from '../../model/event-types';
import { Event as AppEvent } from '../../model/event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventFilter } from '../../model/event-list-filter';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  showEventModal = false;
  showBuskerModal = false;

  // Users
  users: User[] = [];
  allUsers: User[] = [];
  totalUsers: number = 0;
  user: User | null = null;

  // Events
  events: AppEvent[] = [];
  allEvents: AppEvent[] = [];

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
    if ((this.currentEventPage + 1) * this.pageSize < this.events.length) {
      this.currentEventPage++;
    }
  }
  prevEventPage(): void {
    if (this.currentEventPage > 0) {
      this.currentEventPage--;
    }
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
    // Implement sorting if needed
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
    // Load events
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
    this.loadUsers(0, 20);

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

  // Load users from backend
  loadUsers(page: number, size: number): void {
    this.openHttpClientService.getUsers(page, size).subscribe({
      next: (response: { total: number, results: User[] }) => {
        this.totalUsers = response.total;
        this.allUsers = response.results;
        this.users = [...this.allUsers];
      },
      error: (err) => console.error(err)
    });
  }

  // Select user
  userSelect(user: User) {
    console.log('Selected User:', user);
    this.user = user;
    this.showBuskerModal = true;
  }

  // Select event
  eventSelect(event: AppEvent) {
    console.log('Selected Event:', event);
    this.event = event;
    this.showEventModal = true;
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
