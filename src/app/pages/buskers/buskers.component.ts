import { Component, OnInit, Output } from '@angular/core';
import { OpenHttpClientService } from '../../common/http/open-http-client.service'
import { EventType } from '../../model/event-types';
import { BuskersTableControlComponent } from '../../common/busker/buskers-table-control/buskers-table-control.component';
import { EventEmitter } from 'events';
import { Busker } from '../../model/busker';
import { EventFilter } from '../../model/event-list-filter';

// interface Busker {
//   id: string;
//   email: string;
//   roles: string[];
//   createdAt: number;
//   updatedAt: number;
// }

@Component({
  selector: 'app-buskers',
  templateUrl: './buskers.component.html',
  styleUrls: ['./buskers.component.css']
})
export class BuskersComponent implements OnInit {
  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);


  total: number = 0;
  // Modal state is included for structure consistency, though not fully implemented
  showModal: boolean = false;

  buskers: Busker[] = [];
  allBuskers: Busker[] = [];
  busker: Busker | null = null;



  constructor(private openHttpClientService: OpenHttpClientService) {
  }

  ngOnInit(): void {
    this.loadBuskers(0, 20);
  }

  loadBuskers(page: number, size: number): void {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response: { total: number, results: Busker[] }) => {
        this.total = response.total;
        this.allBuskers = response.results;
        this.buskers = [...this.allBuskers];
      },
      error: (err) => {
        console.error('Error loading buskers:', err);
      }
    });
  }

  // Method for selecting a busker and showing the modal (if implemented)
  onSelect(busker: Busker): void {
      this.busker = busker;
      this.showModal = true;
  }


onGenreChange(updatedGenres: Set<string>) {
  this.eventTypes = new Set(['Band', 'Busker', 'Dj', 'Performance']);
}

onFilterChange(filter: EventFilter): void {
  const searching = !!filter.search?.trim();
  let result = [...this.allBuskers];

  if (searching) {
    const term = filter.search.trim().toLowerCase();
    result = result.filter(b =>
      b.email.toLowerCase().includes(term) ||
      (b.displayName && b.displayName.toLowerCase().includes(term))
    );
  }

  const genres = filter.genres;
  if (!genres.has(EventType.ALL)) {
    result = result.filter(b =>
      b.roles.some(r => genres.has(String(r).toUpperCase() as any))
    );
  }

  this.buskers = result;
}
}