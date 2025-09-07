import { Component, OnInit } from '@angular/core';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { AuthService } from 'src/app/util/auth.service';

@Component({
  selector: 'app-buskers',
  templateUrl: './buskers.component.html',
  styleUrls: ['./buskers.component.css']
})
export class BuskersComponent implements OnInit {
  buskers: any[] = [];
  total: number = 0;

  constructor(
    private openHttpClientService: OpenHttpClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadBuskers(1, 10);
    } else {
      console.log('User not logged in, skipping buskers request.');
    }

    // Optionally, listen for login events to load buskers later
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) this.loadBuskers(1, 10);
    });
  }

  loadBuskers(page: number, size: number) {
    this.openHttpClientService.getBuskers(page, size).subscribe({
      next: (response) => {
        console.log('Buskers response:', response);
        this.total = response.total ?? 0;
        this.buskers = response.results ?? [];
      },
      error: (err) => {
        console.error('Error loading buskers:', err);
      }
    });
  }
}
