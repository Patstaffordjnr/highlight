import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/util/router.service';

@Component({
  selector: 'admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
 
  constructor(private routerService: RouterService) { 
  }

  ngOnInit(): void {

  }

  async toHomePage(): Promise<void>{
    this.routerService.toHomePage()
  }
  
}
