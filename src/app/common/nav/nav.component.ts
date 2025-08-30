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
  userRoles: string[] = [];
  user = false;
  busker = false;
  admin = false;

  currentTranslate = 0;
  slider: HTMLElement | null = null;
  innerSlider: HTMLElement | null = null;
  pressed = false;
  startx = 0;
  x = 0;

  constructor(
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.currentUserService.userRole$.subscribe(userRoles => {
      this.userRoles = userRoles || [];
      this.admin = this.userRoles.includes('ADMIN');
      this.busker = this.userRoles.includes('BUSKER');
      this.user = this.userRoles.includes('USER');
    });
  }

  ngAfterViewInit() {
    this.slider = document.querySelector('.slider');
    this.innerSlider = document.querySelector('.slider-inner');
    if (this.slider && this.innerSlider) {
      this.addSliderEventListeners();
    }
  }

  private addSliderEventListeners() {
    if (!this.slider || !this.innerSlider) return;

    // Mouse drag
    this.slider.addEventListener('mousedown', e => {
      this.pressed = true;
      this.startx = e.clientX - this.currentTranslate;
      this.slider!.style.cursor = 'grabbing';
    });

    this.slider.addEventListener('mousemove', e => {
      if (!this.pressed) return;
      e.preventDefault();
      this.x = e.clientX - this.startx;
      this.updateTranslate();
    });

    ['mouseup', 'mouseleave'].forEach(eventType => {
      this.slider!.addEventListener(eventType, () => {
        this.pressed = false;
        this.slider!.style.cursor = 'grab';
        this.currentTranslate = this.x;
      });
    });

    // Touch drag
    this.slider.addEventListener('touchstart', e => {
      this.pressed = true;
      this.startx = e.touches[0].clientX - this.currentTranslate;
    });

    this.slider.addEventListener('touchmove', e => {
      if (!this.pressed) return;
      this.x = e.touches[0].clientX - this.startx;
      this.updateTranslate();
    });

    this.slider.addEventListener('touchend', () => {
      this.pressed = false;
      this.currentTranslate = this.x;
    });

    // Wheel scroll
    this.slider.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault();
        this.currentTranslate -= e.deltaY;
        this.updateTranslate(true);
      },
      { passive: false }
    );
  }

  private updateTranslate(save = false) {
    if (!this.slider || !this.innerSlider) return;
    const maxTranslate = 0;
    const minTranslate = -(this.innerSlider.offsetWidth - this.slider.offsetWidth);
    this.x = Math.min(maxTranslate, Math.max(this.x, minTranslate));
    this.innerSlider.style.transform = `translateX(${this.x}px)`;
    if (save) this.currentTranslate = this.x;
  }

  logout() {
    this.authService.logout();
    this.routerService.toLogoutPage();
  }
}
