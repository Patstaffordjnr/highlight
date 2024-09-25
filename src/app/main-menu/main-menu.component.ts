import { Component, OnInit } from '@angular/core';
import { AuthService } from '../util/auth.service';
import { RouterService } from '../util/router.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  isLoggedIn = false;
  // private authSubscription: Subscription; 

  constructor(private authService: AuthService, private routerService: RouterService) {}

  ngOnInit() {
    // Subscribe to the authentication observable to listen for changes
    // this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {


    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      console.log('Logged In Status Changed:', this.isLoggedIn);
    });
  }

  logout() {
    this.authService.logout();
    this.routerService.toLogoutPage();
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    // if (this.authSubscription) {
    //   this.authSubscription.unsubscribe();
    // }
  }
}
