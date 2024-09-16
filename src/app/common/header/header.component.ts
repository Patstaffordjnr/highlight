import { Component } from '@angular/core';
import { RouterService } from 'src/app/util/router.service';

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
