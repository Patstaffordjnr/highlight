import { Component } from '@angular/core';
import { User } from '../../model/user';
import { UserRole } from '../../model/user-roles';
import { CurrentUserService } from '../../util/can-activate.service';
import { OpenHttpClientService } from '../../common/http/open-http-client.service';
import { EventType } from '../../model/event-types';
import { Event as AppEvent } from '../../model/event';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  activeTab: 'users' | 'events' = 'users';

  // Users
  users: User[] = [];
  filteredUsers: User[] = [];
  totalUsers: number = 0;
  userSearchText: string = '';
  userPage: number = 0;
  userPageSize: number = 20;

  // Events
  events: AppEvent[] = [];
  filteredEvents: AppEvent[] = [];
  eventSearchText: string = '';
  eventPage: number = 0;
  eventPageSize: number = 20;

  // Current user
  currentUser: User | null = null;

  // Role update state
  roleUpdateUserId: string | null = null;

  constructor(
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService,
  ) {}

  async ngOnInit() {
    this.currentUser = await this.currentUserService.getUser();
    this.loadUsers(0);
    this.loadEvents();
  }

  // ---- Tab ----

  setTab(tab: 'users' | 'events') {
    this.activeTab = tab;
  }

  // ---- Users ----

  loadUsers(page: number): void {
    this.userPage = page;
    this.openHttpClientService.getUsers(page, this.userPageSize).subscribe({
      next: (response: { total: number, results: User[] }) => {
        this.totalUsers = response.total;
        this.users = response.results;
        this.applyUserSearch();
      },
      error: (err) => console.error('Failed to load users', err)
    });
  }

  onUserSearchChange(): void {
    this.applyUserSearch();
  }

  private applyUserSearch(): void {
    const q = this.userSearchText.toLowerCase().trim();
    this.filteredUsers = q
      ? this.users.filter(u => u.email.toLowerCase().includes(q))
      : [...this.users];
  }

  get totalUserPages(): number {
    return Math.max(1, Math.ceil(this.totalUsers / this.userPageSize));
  }

  prevUserPage(): void {
    if (this.userPage > 0) this.loadUsers(this.userPage - 1);
  }

  nextUserPage(): void {
    if ((this.userPage + 1) < this.totalUserPages) this.loadUsers(this.userPage + 1);
  }

  hasRole(user: User, role: UserRole): boolean {
    return user.roles?.includes(role) ?? false;
  }

  makeBusker(user: User): void {
    const newRoles = [...(user.roles || [])];
    if (!newRoles.includes(UserRole.BUSKER)) newRoles.push(UserRole.BUSKER);
    this.updateRoles(user, newRoles);
  }

  removeBusker(user: User): void {
    const newRoles = (user.roles || []).filter(r => r !== UserRole.BUSKER);
    this.updateRoles(user, newRoles);
  }

  makeAdmin(user: User): void {
    const newRoles = [...(user.roles || [])];
    if (!newRoles.includes(UserRole.ADMIN)) newRoles.push(UserRole.ADMIN);
    this.updateRoles(user, newRoles);
  }

  removeAdmin(user: User): void {
    const newRoles = (user.roles || []).filter(r => r !== UserRole.ADMIN);
    this.updateRoles(user, newRoles);
  }

  private updateRoles(user: User, roles: UserRole[]): void {
    this.roleUpdateUserId = String(user.id);
    this.openHttpClientService.updateUserRoles(String(user.id), roles).subscribe({
      next: (updated) => {
        user.roles = updated.roles;
        this.roleUpdateUserId = null;
      },
      error: (err) => {
        console.error('Failed to update roles', err);
        this.roleUpdateUserId = null;
      }
    });
  }

  deleteUser(user: User): void {
    if (!confirm(`Delete user ${user.email}? This cannot be undone.`)) return;
    this.openHttpClientService.adminDeleteUser(String(user.id)).subscribe({
      next: () => this.loadUsers(this.userPage),
      error: (err) => console.error('Failed to delete user', err)
    });
  }

  // ---- Events ----

  loadEvents(): void {
    this.openHttpClientService.getEvents(
      new Date(2020, 0, 1),
      -90, -180, 90, 180,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (events: AppEvent[]) => {
        this.events = events;
        this.applyEventSearch();
      },
      error: (err) => console.error('Failed to load events', err)
    });
  }

  onEventSearchChange(): void {
    this.applyEventSearch();
    this.eventPage = 0;
  }

  private applyEventSearch(): void {
    const q = this.eventSearchText.toLowerCase().trim();
    this.filteredEvents = q
      ? this.events.filter(e =>
          e.title?.toLowerCase().includes(q) ||
          e.userName?.toLowerCase().includes(q) ||
          e.address?.toLowerCase().includes(q)
        )
      : [...this.events];
  }

  get paginatedEvents(): AppEvent[] {
    const start = this.eventPage * this.eventPageSize;
    return this.filteredEvents.slice(start, start + this.eventPageSize);
  }

  get totalEventPages(): number {
    return Math.max(1, Math.ceil(this.filteredEvents.length / this.eventPageSize));
  }

  prevEventPage(): void {
    if (this.eventPage > 0) this.eventPage--;
  }

  nextEventPage(): void {
    if ((this.eventPage + 1) < this.totalEventPages) this.eventPage++;
  }

  deleteEvent(event: AppEvent): void {
    if (!confirm(`Delete event "${event.title}"? This cannot be undone.`)) return;
    this.openHttpClientService.adminDeleteEvent(event.id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== event.id);
        this.applyEventSearch();
      },
      error: (err) => console.error('Failed to delete event', err)
    });
  }
}
