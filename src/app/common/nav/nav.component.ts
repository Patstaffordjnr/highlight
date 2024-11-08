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

  userCurrentTranslate: number = 0;
  userSlider: HTMLElement | null = null;
  userInnerSlider: HTMLElement | null = null;
  userPressed = false;
  userStartX: number = 0;
  userX: number = 0;

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
  
    this.userSlider = document.querySelector('.user-slider');
    this.userInnerSlider = document.querySelector('.user-slider-inner');
    console.log(this.slider, this.innerSlider);
    console.log(this.userSlider, this.userInnerSlider)
    if (this.slider && this.innerSlider) {
      this.addSliderEventListeners();
    } else {
      console.warn('Slider or inner slider elements not found');
    }
  
    if (this.userSlider && this.userInnerSlider) {
       
      this.addUserSliderEventListeners(); // Correctly call the user-specific method
    } else {
      console.warn('User slider or user inner slider elements not found');
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

  private addUserSliderEventListeners() {
    this.userSlider!.addEventListener('mousedown', (e) => {
      this.userPressed = true;
      this.userStartX = e.clientX - this.userInnerSlider!.offsetLeft - this.userCurrentTranslate;
      this.userSlider!.style.cursor = 'grabbing';
    });
  
    this.userSlider!.addEventListener('mousemove', (e) => {
      if (!this.userPressed) return;
      e.preventDefault();
      this.userX = e.clientX - this.userStartX;
  
      // Boundary checks
      const maxTranslate = 0;
      const minTranslate = -(this.userInnerSlider!.offsetWidth - this.userSlider!.offsetWidth);
      this.userX = Math.min(maxTranslate, Math.max(this.userX, minTranslate));
  
      this.userInnerSlider!.style.transform = `translateX(${this.userX}px)`;
      console.log('User dragging');
    });
  
    ['mouseup', 'mouseleave'].forEach(eventType => {
      this.userSlider!.addEventListener(eventType, () => {
        if (!this.userPressed) return;
        this.userPressed = false;
        this.userSlider!.style.cursor = 'grab';
        
        // Save the current position when dragging ends
        this.userCurrentTranslate = this.userX;
        console.log(`${eventType} triggered, final user position: ${this.userCurrentTranslate}`);
      });
    });
  
    this.userSlider!.addEventListener('mouseenter', () => {
      this.userSlider!.style.cursor = 'grab';
    });

  }

  
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    this.authService.logout();
    this.routerService.toLogoutPage();
  }
}
