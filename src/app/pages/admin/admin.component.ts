import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { CurrentUserService } from '../../util/can-activate.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';
import { Event as AppEvent } from 'src/app/model/event';
import { Busker } from 'src/app/model/busker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  showModal = false;
  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);

  buskers: Busker[] = [];
  events: AppEvent[] = [];
  totalBuskers: number = 0;

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

  // Busker pagination
  currentBuskerPage = 0;
  get paginatedBuskers(): Busker[] {
    const start = this.currentBuskerPage * this.pageSize;
    return this.buskers.slice(start, start + this.pageSize);
  }
  get totalBuskerPages(): number {
    return Math.ceil(this.buskers.length / this.pageSize);
  }
  nextBuskerPage(): void {
    if ((this.currentBuskerPage + 1) * this.pageSize < this.buskers.length) this.currentBuskerPage++;
  }
  prevBuskerPage(): void {
    if (this.currentBuskerPage > 0) this.currentBuskerPage--;
  }

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

  constructor(
    private formBuilder: FormBuilder,
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService
  ) {
    // Load events
    this.openHttpClientService.getEvents(
      new Date(2025, 6, 6, 23, 0, 0),
      -88,
      -88,
      80,
      80,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (events: AppEvent[]) => {
        this.events = events;
      },
      error: (error) => console.error(error),
    });
  }

  async ngOnInit() {
    this.loadBuskers(0, 20);

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
  buskerSelect(busker: Busker){
    console.log(busker);
  }

  eventSelect(event: AppEvent){
  console.log(event);
  }
  // onSelect(event: AppEvent) {
  //   this.event = event;
  //   this.showModal = true;
  // }

  loadBuskers(page: number, size: number): void {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response: { total: number, results: Busker[] }) => {
        this.totalBuskers = response.total;
        this.buskers = response.results;
      },
      error: (err) => console.error(err)
    });
  }
}
