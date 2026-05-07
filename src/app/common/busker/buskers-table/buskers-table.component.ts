import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuskerPlaceholderPipe } from '../busker-placeholder.pipe';

interface Busker {
  id: string;
  email: string;
  roles: string[];
  createdAt: number;
  updatedAt: number;
  bio?: string;
  location?: string;
  displayName?: string;
  profileImageUrl?: string;
  imgOffsetX?: number;
  imgOffsetY?: number;
  imgZoom?: number;
  upcomingEventsCount?: number;
  nextEventAt?: number;
}

@Component({
  selector: 'app-buskers-table',
  standalone: true,
  imports: [CommonModule, BuskerPlaceholderPipe],
  templateUrl: './buskers-table.component.html',
  styleUrls: ['./buskers-table.component.css']
})
export class BuskersTableComponent {
  @Input() buskers: Busker[] = [];
    @Output() selectedBusker = new EventEmitter<Busker>();

      onSelect(busker: Busker) {
        this.selectedBusker.emit(busker);
      }
}