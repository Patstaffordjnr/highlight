import { Component, OnInit } from '@angular/core';
import { OpenHttpClientService } from '../../common/http/open-http-client.service';
import { EventType } from '../../model/event-types';
import { Busker } from '../../model/busker';
import { EventFilter } from '../../model/event-list-filter';
import { CurrentUserService } from '../../util/can-activate.service';

@Component({
  selector: 'app-buskers',
  templateUrl: './buskers.component.html',
  styleUrls: ['./buskers.component.css']
})
export class BuskersComponent implements OnInit {
  eventTypes: Set<string> = new Set(['Band', 'Busker', 'Dj', 'Performance']);

  total: number = 0;
  showModal: boolean = false;
  showEventModal: boolean = false;
  hasProfileImage = false;

  buskers: Busker[] = [];
  allBuskers: Busker[] = [];
  busker: Busker | null = null;
  selectedEvent: any = null;

  constructor(
    private openHttpClientService: OpenHttpClientService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.loadBuskers(0, 20);
    this.currentUserService.user$.subscribe(u => {
      this.hasProfileImage = !!(u as any)?.profileImageUrl;
    });
  }

  loadBuskers(page: number, size: number): void {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response: { total: number, results: Busker[] }) => {
        this.total = response.total;
        this.allBuskers = response.results;
        this.buskers = [...this.allBuskers];
      },
      error: (err) => console.error('Error loading buskers:', err)
    });
  }

  onSelect(busker: Busker): void {
    this.busker = busker;
    this.showModal = true;
  }

  onOpenEvent(event: any): void {
    this.selectedEvent = event;
    this.showEventModal = true;
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
