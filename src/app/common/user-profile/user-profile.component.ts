import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  userRoles: string[] = [];
  currentUser: User = { id: '', email: '', roles: [] };

  imageUploading = false;
  imageUploadError = '';
  readonly defaultImage = '/assets/userprofile.jpg';

  resendLoading = false;
  resendSent = false;

  constructor(
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService
  ) {}

  ngOnInit() {
    this.currentUserService.user$.subscribe(user => {
      if (!user) return;
      this.currentUser.id = user.id;
      this.currentUser.email = user.email;
      this.currentUser.roles = user.roles;
      this.currentUser.displayName = (user as any).displayName ?? undefined;
      this.currentUser.bio = (user as any).bio ?? undefined;
      this.currentUser.verified = (user as any).verified ?? true;
      this.currentUser.profileImageUrl = (user as any).profileImageUrl ?? undefined;
      this.currentUser.imgOffsetX = (user as any).imgOffsetX ?? undefined;
      this.currentUser.imgOffsetY = (user as any).imgOffsetY ?? undefined;
      this.currentUser.imgZoom    = (user as any).imgZoom    ?? undefined;

      this.userRoles = user.roles.map((r: any) => String(r)).filter((r: string) =>
        r === 'USER' || r === 'BUSKER' || r === 'ADMIN'
      );
    });
  }

  get profileImage(): string {
    return this.currentUser.profileImageUrl ?? this.defaultImage;
  }

  get imgPosition(): string {
    const x = this.currentUser.imgOffsetX ?? 50;
    const y = this.currentUser.imgOffsetY ?? 50;
    return `${x}% ${y}%`;
  }

  get imgTransform(): string {
    const z = this.currentUser.imgZoom ?? 1.0;
    return z > 1.0 ? `scale(${z})` : 'none';
  }

  get displayLabel(): string {
    if (this.currentUser.displayName) return this.currentUser.displayName;
    return String(this.currentUser.email).split('@')[0];
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.imageUploading = true;
    this.imageUploadError = '';
    this.openHttpClientService.uploadProfileImage(file).subscribe({
      next: (updated: User) => {
        this.currentUser.profileImageUrl = updated.profileImageUrl;
        this.imageUploading = false;
      },
      error: () => {
        this.imageUploadError = 'Failed to upload image. Please try again.';
        this.imageUploading = false;
      }
    });
  }

  resendVerification() {
    this.resendLoading = true;
    this.openHttpClientService.resendVerification().subscribe({
      next: () => { this.resendSent = true; this.resendLoading = false; },
      error: () => { this.resendLoading = false; }
    });
  }
}
