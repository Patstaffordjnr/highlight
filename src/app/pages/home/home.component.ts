import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginClient } from '../log-in/log-in.client';
import { RouterService } from 'src/app/util/router.service';
import { UserInterfaceNavComponent } from '../user-interface-nav/user-interface-nav.component';
import { Subscription } from 'rxjs';
import { EventModalComponent } from 'src/app/components/event-modal/event-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

   userDTO = {
    email: '',
    password: '', 
    }

    roles: '';
    token: '';
    id:'';

  googleRouterLink = document.querySelector('.routerLink');
  
  constructor(private httpClient: HttpClient, private routerService: RouterService) { 
  }

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  ngOnInit(): void {}
  

  // @ViewChild('modal', {static: false}) modal: EventModalComponent

  // openModal() {
  //   this.modal.open();
  // }






    

// -----------------------------------------------



makePostRequest(url: string, headers: HttpHeaders): Promise<any> {
  return this.httpClient.post(url, { headers }).toPromise();
}


// ------------------------------------------------

  async toAdminHomePage(): Promise<void> {
    this.routerService.toAdminHomePage();
  }

  async logOff(): Promise<void> {
    this.routerService.toLogoutPage();
  }

}
