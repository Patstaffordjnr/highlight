import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../util/auth.service';
import { RouterService } from '../../util/router.service';
import { CurrentUserService } from 'src/app/util/can-activate.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, AfterViewInit {
  menuVisible = true;
  isLoggedIn = false;
  userRoles = [];
  user = false;
  busker = false;
  admin = false;

  currentTranslate: number = 0;
  slider: HTMLElement | null = null;
  innerSlider: HTMLElement | null = null;
  pressed = false;
  startx: number = 0;
  x: number = 0;

  constructor(
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private routerService: RouterService
  ) {}

  async ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    await this.currentUserService.userRole$.subscribe(userRoles => {
      this.userRoles = userRoles;

      if (userRoles) {
        this.admin = this.userRoles.includes('ADMIN');
        this.busker = this.userRoles.includes('BUSKER');
        this.user = this.userRoles.includes('USER');
      }
    });
  }

  ngAfterViewInit() {
    this.slider = document.querySelector('.slider');
    this.innerSlider = document.querySelector('.slider-inner');
  
    // console.log(this.slider, this.innerSlider);
    if (this.slider && this.innerSlider) {
      this.addSliderEventListeners();
    } else {
      console.warn('Slider or inner slider elements not found');
    }

  }

  private addSliderEventListeners() {
    this.slider!.addEventListener('mousedown', (e) => {
      this.pressed = true;
      this.startx = e.clientX - this.innerSlider!.offsetLeft - this.currentTranslate; // Adjust for current position
      this.slider!.style.cursor = 'grabbing';

    });

    this.slider!.addEventListener('mousemove', (e) => {
      if (!this.pressed) return;
      e.preventDefault();
      this.x = e.clientX - this.startx;

      // Boundary checks
      const maxTranslate = 0;
      const minTranslate = -(this.innerSlider!.offsetWidth - this.slider!.offsetWidth);
      this.x = Math.min(maxTranslate, Math.max(this.x, minTranslate));

      this.innerSlider!.style.transform = `translateX(${this.x}px)`;
      console.log('Dragging');
    });

    ['mouseup', 'mouseleave'].forEach(eventType => {
      this.slider!.addEventListener(eventType, () => {
        if (!this.pressed) return;
        this.pressed = false;
        this.slider!.style.cursor = 'grab';
        
        // Save the current position when dragging ends
        this.currentTranslate = this.x;
        console.log(`${eventType} event triggered, final position: ${this.currentTranslate}`);
      });
    });

    this.slider!.addEventListener('mouseenter', () => {
      this.slider!.style.cursor = 'grab';
    });

  }

 
  
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    if(this.menuVisible == true) {
      console.log(this.menuVisible);
      
    }
  }

  logout() {
    this.authService.logout();
    this.routerService.toLogoutPage();
  }
}
