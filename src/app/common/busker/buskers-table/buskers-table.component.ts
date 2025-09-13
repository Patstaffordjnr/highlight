import { Component, Input, OnInit } from '@angular/core';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';
import { BuskersTableControlComponent } from 'src/app/common/busker/buskers-table-control/buskers-table-control.component';


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
  imports: [],
  templateUrl: './buskers-table.component.html',
  styleUrl: './buskers-table.component.css'
})
export class BuskersTableComponent  implements OnInit {
  eventTypes: Set<string> = new Set(["Band", "Busker", "Dj", "Performance"]);
    @Input() buskers: Busker[] = [];
  total: number = 0;
  // Modal state is included for structure consistency, though not fully implemented
  showModal: boolean = false;
  selectedBusker: Busker | null = null; 

  constructor(private openHttpClientService: OpenHttpClientService) {}

  ngOnInit(): void {
    this.loadBuskers(0, 10);
  }

  loadBuskers(page: number, size: number): void {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response: { total: number, results: Busker[] }) => {
        console.log('Buskers response:', response);
        this.total = response.total;
        this.buskers = response.results;
      },
      error: (err) => {
        console.error('Error loading buskers:', err);
      }
    });
  }

  // Method for selecting a busker and showing the modal (if implemented)
  onSelect(busker: Busker): void {
      this.selectedBusker = busker;
      this.showModal = true;
  }


onGenreChange(updatedGenres: Set<string>) {
  this.eventTypes = new Set(['Band', 'Busker', 'Dj', 'Performance']);
  console.log(this.eventTypes);
}
}