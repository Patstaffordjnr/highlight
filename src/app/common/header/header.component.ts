import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/util/router.service';
import { MapService } from '../map/map-service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private routerService: RouterService) {

  }

  async toHomePage(): Promise<void> {
    await this.routerService.toHomePage();
  }

}
