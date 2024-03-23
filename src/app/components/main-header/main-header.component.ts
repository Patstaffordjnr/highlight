import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/util/router.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private routerService: RouterService) {

    
   }


   async toHomePage(): Promise<void> {

    this.routerService.toHomePage();
  }

  ngOnInit(): void {
  }



}
