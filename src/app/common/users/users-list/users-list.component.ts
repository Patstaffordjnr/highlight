import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { Event as AppEvent } from 'src/app/model/event';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventFilter } from 'src/app/model/event-list-filter';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  showModal = false;

  // All Users
  allUsers: User[] = []; 
  totalUsers: number = 0;
  user: User | null = null; 

  events: AppEvent[] = [];
  allEvents: AppEvent[] = [];

  @Output() filterChange = new EventEmitter<EventFilter>();
  @Input() users: User[] = [];
  @Output() selectedUser = new EventEmitter<User>();
  
  // Filters
  distances: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50];
  selectedDistance: number = 5;

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

  // Controls
  userSearchText: string = '';
  userSelectedSort: string = 'distance';
  userSelectedDistance: number = 5;
  userSelectedWithin: number = 1;

  // Pagination
  currentUserPage = 0;
  pageSize = 5;

get paginatedUsers(): User[] {
  const start = this.currentUserPage * this.pageSize;
  return this.users.slice(start, start + this.pageSize);
}

get totalUserPages(): number {
  return Math.ceil(this.users.length / this.pageSize);
}

  nextUserPage(): void {
    if ((this.currentUserPage + 1) * this.pageSize < this.users.length) {
      this.currentUserPage++;
    }
  }

  prevUserPage(): void {
    if (this.currentUserPage > 0) {
      this.currentUserPage--;
    }
  }

  // User search
onUserSearchChange(): void {
  const value = this.userSearchText.toLowerCase();
  this.users = this.allUsers.filter(user =>
    user.email.toLowerCase().includes(value)
  );
  this.currentUserPage = 0;
}

  // User sort
  onUserSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.userSelectedSort = value;
    // Optional: implement actual sorting logic
  }

  // User distance / within
  onUserDistanceChange(event: Event): void {
    this.userSelectedDistance = Number((event.target as HTMLSelectElement).value);
    this.emitUserFilter();
  }

  onUserWithinChange(event: Event): void {
    this.userSelectedWithin = Number((event.target as HTMLSelectElement).value);
    this.emitUserFilter();
  }

  // User select
  userSelect(user: User) {
    this.selectedUser.emit(user);
    console.log('Selected User:', user);
  }

  private emitUserFilter(): void {
    console.log({
      search: this.userSearchText,
      distance: this.userSelectedDistance,
      within: this.userSelectedWithin,
      sort: this.userSelectedSort
    });
  }
}
