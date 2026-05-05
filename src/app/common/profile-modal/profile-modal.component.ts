import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.css'
})
export class ProfileModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() currentUser: User = { id: '', email: '', roles: [] };
  @Output() close = new EventEmitter<void>();
  @Output() profileUpdated = new EventEmitter<User>();

  @ViewChild('modalContent', { static: false }) modalContentRef!: ElementRef;

  userRoles: string[] = [];

  editMode = false;
  editDisplayName = '';
  editBio = '';
  profileSaveSuccess = false;
  profileSaveError = '';

  passwordMode = false;
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  passwordSaveSuccess = false;
  passwordSaveError = '';

  imageUploading = false;
  imageUploadError = '';
  resendLoading = false;
  resendSent = false;

  positioning = false;
  previewUrl = '';
  naturalW = 0;
  naturalH = 0;
  posX = 50;
  posY = 50;
  zoom = 1.0;
  private selectedFile: File | null = null;
  private isDragging = false;
  private dragStartMouseX = 0;
  private dragStartMouseY = 0;
  private dragStartPosX = 50;
  private dragStartPosY = 50;
  readonly MAIN_FRAME = 100;

  constructor(private openHttpClientService: OpenHttpClientService) {}

  ngOnInit() {
    this.userRoles = this.currentUser.roles
      .map(r => String(r))
      .filter(r => r === 'USER' || r === 'BUSKER' || r === 'ADMIN');
  }

  get displayLabel(): string {
    if (this.currentUser.displayName) return this.currentUser.displayName;
    return String(this.currentUser.email).split('@')[0];
  }

  enterEditMode() {
    this.editDisplayName = this.currentUser.displayName ?? '';
    this.editBio = this.currentUser.bio ?? '';
    this.profileSaveSuccess = false;
    this.profileSaveError = '';
    this.editMode = true;
  }

  saveProfile() {
    this.profileSaveError = '';
    this.openHttpClientService.updateProfile(
      this.editDisplayName || null,
      this.editBio || null
    ).subscribe({
      next: (updated: User) => {
        this.currentUser.displayName = updated.displayName;
        this.currentUser.bio = updated.bio;
        this.editMode = false;
        this.profileSaveSuccess = true;
        this.profileUpdated.emit(this.currentUser);
      },
      error: () => { this.profileSaveError = 'Failed to save. Please try again.'; }
    });
  }

  savePassword() {
    this.passwordSaveError = '';
    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordSaveError = 'Passwords do not match.';
      return;
    }
    if (!this.newPassword) {
      this.passwordSaveError = 'New password cannot be empty.';
      return;
    }
    this.openHttpClientService.updatePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.passwordMode = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.passwordSaveSuccess = true;
      },
      error: (err: any) => {
        const msg = err?.error?.message || err?.message;
        this.passwordSaveError = msg && msg !== '[object Object]'
          ? msg : 'Failed to update password.';
      }
    });
  }

  get profileImage(): string {
    return this.currentUser.profileImageUrl ?? '/assets/userprofile.jpg';
  }

  get savedImgStyle(): { [key: string]: string } {
    const x = this.currentUser.imgOffsetX ?? 50;
    const y = this.currentUser.imgOffsetY ?? 50;
    const z = this.currentUser.imgZoom ?? 1.0;
    const size = 125 * z;
    return {
      'position': 'absolute',
      'width': `${size}px`,
      'height': `${size}px`,
      'object-fit': 'cover',
      'object-position': `${x}% ${y}%`,
      'left': `${(x / 100) * (125 - size)}px`,
      'top': `${(y / 100) * (125 - size)}px`
    };
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.selectedFile = file;
    this.imageUploadError = '';
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target!.result as string;
      const img = new Image();
      img.onload = () => {
        this.naturalW = img.naturalWidth;
        this.naturalH = img.naturalHeight;
        this.posX = 50;
        this.posY = 50;
        this.zoom = 1.2;
        this.positioning = true;
      };
      img.src = this.previewUrl;
    };
    reader.readAsDataURL(file);
  }

  getFrameBgStyle(fw: number, fh: number): { [key: string]: string } {
    if (!this.naturalW || !this.naturalH) return {};
    const coverScale = Math.max(fw / this.naturalW, fh / this.naturalH) * this.zoom;
    const scaledW = this.naturalW * coverScale;
    const scaledH = this.naturalH * coverScale;
    const maxOffsetX = fw - scaledW;
    const maxOffsetY = fh - scaledH;
    const offsetX = maxOffsetX !== 0 ? (this.posX / 100) * maxOffsetX : 0;
    const offsetY = maxOffsetY !== 0 ? (this.posY / 100) * maxOffsetY : 0;
    return {
      'background-image': `url(${this.previewUrl})`,
      'background-size': `${scaledW}px ${scaledH}px`,
      'background-position': `${offsetX}px ${offsetY}px`,
      'background-repeat': 'no-repeat'
    };
  }

  onDragStart(e: MouseEvent) {
    this.isDragging = true;
    this.dragStartMouseX = e.clientX;
    this.dragStartMouseY = e.clientY;
    this.dragStartPosX = this.posX;
    this.dragStartPosY = this.posY;
    e.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onDragMove(e: MouseEvent) {
    if (!this.isDragging) return;
    const fw = this.MAIN_FRAME, fh = this.MAIN_FRAME;
    const coverScale = Math.max(fw / this.naturalW, fh / this.naturalH) * this.zoom;
    const scaledW = this.naturalW * coverScale;
    const scaledH = this.naturalH * coverScale;
    const maxOffsetX = fw - scaledW;
    const maxOffsetY = fh - scaledH;
    const startOffsetX = maxOffsetX !== 0 ? (this.dragStartPosX / 100) * maxOffsetX : 0;
    const startOffsetY = maxOffsetY !== 0 ? (this.dragStartPosY / 100) * maxOffsetY : 0;
    const dx = e.clientX - this.dragStartMouseX;
    const dy = e.clientY - this.dragStartMouseY;
    const newOffsetX = this.clamp(startOffsetX + dx, maxOffsetX, 0);
    const newOffsetY = this.clamp(startOffsetY + dy, maxOffsetY, 0);
    this.posX = maxOffsetX !== 0 ? (newOffsetX / maxOffsetX) * 100 : 50;
    this.posY = maxOffsetY !== 0 ? (newOffsetY / maxOffsetY) * 100 : 50;
  }

  @HostListener('document:mouseup')
  onDragEnd() {
    this.isDragging = false;
  }

  zoomIn() {
    this.zoom = Math.min(+(this.zoom + 0.1).toFixed(2), 3.0);
  }

  zoomOut() {
    this.zoom = Math.max(+(this.zoom - 0.1).toFixed(2), 1.0);
  }

  private clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
  }

  confirmPosition() {
    if (!this.selectedFile) return;
    this.imageUploading = true;
    this.openHttpClientService.uploadProfileImage(this.selectedFile).subscribe({
      next: (uploaded: User) => {
        this.currentUser.profileImageUrl = uploaded.profileImageUrl;
        this.openHttpClientService.updateImagePosition(this.posX, this.posY, this.zoom).subscribe({
          next: (updated: User) => {
            this.currentUser.imgOffsetX = updated.imgOffsetX;
            this.currentUser.imgOffsetY = updated.imgOffsetY;
            this.currentUser.imgZoom = updated.imgZoom;
            this.imageUploading = false;
            this.positioning = false;
            this.profileUpdated.emit(this.currentUser);
          },
          error: () => {
            this.imageUploading = false;
            this.positioning = false;
            this.profileUpdated.emit(this.currentUser);
          }
        });
      },
      error: () => {
        this.imageUploadError = 'Upload failed. Please try again.';
        this.imageUploading = false;
      }
    });
  }

  cancelPositioning() {
    this.positioning = false;
    this.selectedFile = null;
    this.previewUrl = '';
  }

  resendVerification() {
    this.resendLoading = true;
    this.openHttpClientService.resendVerification().subscribe({
      next: () => { this.resendSent = true; this.resendLoading = false; },
      error: () => { this.resendLoading = false; }
    });
  }

  onBackdropClick(event: MouseEvent) {
    const modalEl = this.modalContentRef?.nativeElement;
    if (modalEl && !modalEl.contains(event.target)) {
      this.close.emit();
    }
  }
}
