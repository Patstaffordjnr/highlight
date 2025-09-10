import { Component, OnInit } from '@angular/core';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';

interface Busker {
  id: string;
  email: string;
  roles: string[];
  createdAt: number;
  updatedAt: number;
}

@Component({
  selector: 'app-buskers',
  templateUrl: './buskers.component.html',
  styleUrls: ['./buskers.component.css']
})
export class BuskersComponent implements OnInit {
  buskers: Busker[] = [];
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
}