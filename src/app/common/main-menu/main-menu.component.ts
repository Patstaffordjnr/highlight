import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../util/auth.service';
import { RouterService } from '../../util/router.service';
import { CurrentUserService } from 'src/app/util/can-activate.service';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  menuVisible = true;

  isLoggedIn = false;
  userRoles = [];
  user = false;
  busker = false;
  admin = false;

  constructor(private authService: AuthService, private currentUserService: CurrentUserService, private routerService: RouterService) {}

  async ngOnInit() {

    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      // console.log('Logged In Status Changed:', this.isLoggedIn);
    });

    await this.currentUserService.userRole$.subscribe(userRoles => {
      this.userRoles = userRoles

      if(userRoles){
              if (this.userRoles.includes("ADMIN")) {
        this.admin = true;
      }
      
      if (this.userRoles.includes("BUSKER")) {
        this.busker = true;
      }
      
      if (this.userRoles.includes("USER")) {
        this.user = true;
      }
      }

    })
  }


  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    this.authService.logout();
    this.routerService.toLogoutPage();
  }

  ngOnDestroy() {

  }
}
