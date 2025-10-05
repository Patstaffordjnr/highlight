import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Busker {
  id: string;
  email: string;
  roles: string[];
  createdAt: number;
  updatedAt: number;
}
@Component({
  selector: 'app-buskers-mini-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buskers-mini-display.component.html',
  styleUrl: './buskers-mini-display.component.css'
})
export class BuskersMiniDisplayComponent {
  @Input() buskers: Busker[] = [];

      @Output() selectedBusker = new EventEmitter<Busker>();

      onSelect(busker: Busker) {
        this.selectedBusker.emit(busker);
        console.log(busker);
      }

}
