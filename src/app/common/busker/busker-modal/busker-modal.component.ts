import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Busker } from '../../../model/busker';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busker-modal',
  templateUrl: './busker-modal.component.html',
  styleUrl: './busker-modal.component.css'
})
export class BuskerModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() busker: Busker | null = null;

  @ViewChild('modalContent', { static: false }) modalContentRef!: ElementRef;

  isFollowing = false;
  isLoggedIn = false;

  constructor(
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.currentUserService.getUser();
    this.isLoggedIn = !!user;
    if (user && this.busker?.id) {
      this.openHttpClientService.isFollowingBusker(String(this.busker.id)).subscribe({
        next: (following) => this.isFollowing = following,
        error: () => this.isFollowing = false
      });
    }
  }

  onFollowClick() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.busker?.id) return;
    const id = String(this.busker.id);
    if (this.isFollowing) {
      this.openHttpClientService.unfollowBusker(id).subscribe({
        next: () => this.isFollowing = false
      });
    } else {
      this.openHttpClientService.followBusker(id).subscribe({
        next: () => this.isFollowing = true
      });
    }
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    const modalEl = this.modalContentRef?.nativeElement;
    if (modalEl && !modalEl.contains(event.target)) {
      this.onClose();
    }
  }
}
