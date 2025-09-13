import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Busker {
  id: string;
  email: string;
  roles: string[];
  createdAt: number;
  updatedAt: number;
}

@Component({
  selector: 'app-buskers-table',
  standalone: true,
  imports: [CommonModule],  // needed for *ngFor, *ngIf
  templateUrl: './buskers-table.component.html',
  styleUrls: ['./buskers-table.component.css']
})
export class BuskersTableComponent {
  @Input() buskers: Busker[] = [];
}