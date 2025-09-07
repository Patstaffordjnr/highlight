import { Component, OnInit } from '@angular/core';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';

@Component({
  selector: 'app-buskers',
  templateUrl: './buskers.component.html',
  styleUrls: ['./buskers.component.css']
})
export class BuskersComponent implements OnInit {
  buskers: any[] = [];   // Replace `any[]` with a proper Busker model later
  total: number = 0;

  constructor(private openHttpClientService: OpenHttpClientService) {}

  ngOnInit(): void {
    this.loadBuskers(1, 10);  // page 1, size 10
  }

  loadBuskers(page: number, size: number) {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response) => {
        console.log('Buskers response:', response);
        this.total = response.total;       // based on Swagger screenshot
        this.buskers = response.results;   // API response looks like { total, results }
      },
      error: (err) => {
        console.error('Error loading buskers:', err);
      }
    });
  }
}
