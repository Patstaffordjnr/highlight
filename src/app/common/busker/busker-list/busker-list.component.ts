import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup } from '@angular/forms';
import { Event as AppEvent } from 'src/app/model/event';
import { Busker } from 'src/app/model/busker';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventFilter } from 'src/app/model/event-list-filter';

@Component({
  selector: 'app-busker-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './busker-list.component.html',
  styleUrl: './busker-list.component.css'
})
export class BuskerListComponent {

  showModal = false;
  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);
  allBuskers: Busker[] = []; 
  totalBuskers: number = 0;
  busker: Busker | null = null; 
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

  @Output() filterChange = new EventEmitter<EventFilter>();
  @Input() buskers: Busker[] = [];
  @Output() selectedBusker = new EventEmitter<Busker>();
  
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

buskerSearchText: string = '';
buskerSelectedSort: string = 'distance';
buskerSelectedDistance: number = 5;
buskerSelectedWithin: number = 1;

  currentBuskerPage = 0;
  pageSize = 5;
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

  // Busker search (fixed: uses allBuskers as source)
onBuskerSearchChange(): void {
  const value = this.buskerSearchText.toLowerCase();
  this.buskers = this.allBuskers.filter(busker =>
    busker.email.toLowerCase().includes(value)
  );
  this.currentBuskerPage = 0;
}

// Busker sort
onBuskerSortChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value;
  this.buskerSelectedSort = value;
  // Implement sort logic if needed
}

// Busker distance / within
onBuskerDistanceChange(event: Event): void {
  this.buskerSelectedDistance = Number((event.target as HTMLSelectElement).value);
  this.emitBuskerFilter();
}
onBuskerWithinChange(event: Event): void {
  this.buskerSelectedWithin = Number((event.target as HTMLSelectElement).value);
  this.emitBuskerFilter();
}

 buskerSelect(busker: Busker) {
  this.selectedBusker.emit(busker);
  console.log(busker);
  }

private emitBuskerFilter(): void {
  console.log({
    search: this.buskerSearchText,
    distance: this.buskerSelectedDistance,
    within: this.buskerSelectedWithin,
    sort: this.buskerSelectedSort
  });
}

}
