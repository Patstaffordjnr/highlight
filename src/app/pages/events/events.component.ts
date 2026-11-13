import { Component } from '@angular/core';
import { Event as AppEvent } from '../../model/event';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';
import { EventFilter } from 'src/app/model/event-list-filter';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  events: AppEvent[] = [];
  allEvents: AppEvent[] = [];
  activeFilter: EventFilter | null = null;

  constructor(private openHttpClientService: OpenHttpClientService) {
    this.openHttpClientService.getEvents(
      new Date(),
      -88,
      -88,
      80,
      80,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (events: AppEvent[]) => {
        this.allEvents = events;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      },
    });
  }

  onFilterChange(filter: EventFilter): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    const now = Date.now() / 1000;
    let result = [...this.allEvents];

    if (this.activeFilter) {
      const searching = !!this.activeFilter.search?.trim();

      if (!searching) {
        const cutoff = now + this.activeFilter.within * 3600;
        result = result.filter(e => (e.endAt as any) >= now && (e.startAt as any) <= cutoff);
      }

      const genres = this.activeFilter.genres;
      if (!genres.has(EventType.ALL)) {
        result = result.filter(e => genres.has(e.eventType as EventType));
      }

      if (searching) {
        const term = this.activeFilter.search.trim().toLowerCase();
        result = result.filter(e =>
          e.title?.toLowerCase().includes(term) ||
          e.address?.toLowerCase().includes(term) ||
          e.userName?.toLowerCase().includes(term)
        );
      }

      switch (this.activeFilter.sort) {
        case 'ending':
          result.sort((a, b) => (a.endAt as any) - (b.endAt as any));
          break;
        default:
          result.sort((a, b) => (a.startAt as any) - (b.startAt as any));
      }
    }

    this.events = result;
  }
}
