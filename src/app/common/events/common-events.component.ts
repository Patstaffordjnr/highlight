import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event as AppEvent } from '../../model/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'common-events.component.html',
  styleUrl: 'common-events.component.css'
})
export class CommonEventsComponent implements OnInit {

  @Input() events: AppEvent[] = [];
  @Input() loading: boolean = false;
  @Output() selectedEvent = new EventEmitter<AppEvent>();

  constructor() {}

  ngOnInit() {}

  onSelect(event: AppEvent) {
    this.selectedEvent.emit(event);
  }
}
