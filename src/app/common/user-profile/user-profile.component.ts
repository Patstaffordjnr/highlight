import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  userRoles: string[] = [];
  currentUser: User = {
    id: '',
    email: '',
    roles: [],
  };

  // Edit profile mode
  editMode = false;
  editDisplayName: string = '';
  editBio: string = '';
  profileSaveSuccess = false;
  profileSaveError = '';

  // Change password mode
  passwordMode = false;
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  passwordSaveSuccess = false;
  passwordSaveError = '';

  constructor(
    private currentUserService: CurrentUserService,
    private openHttpClientService: OpenHttpClientService
  ) {

  }

  async ngOnInit() {
    const user = await this.currentUserService.getUser();
    if (user) {
      this.currentUser.id = user.id;
      this.currentUser.email = user.email;
      this.currentUser.roles = user.roles;
      this.currentUser.displayName = (user as any).displayName ?? undefined;
      this.currentUser.bio = (user as any).bio ?? undefined;

      this.userRoles = user.roles.map((r: any) => String(r)).filter((r: string) =>
        r === 'USER' || r === 'BUSKER' || r === 'ADMIN'
      );
    }
  }

  get displayLabel(): string {
    if (this.currentUser.displayName) return this.currentUser.displayName;
    const email = String(this.currentUser.email);
    return email.split('@')[0];
  }

  enterEditMode() {
    this.editDisplayName = this.currentUser.displayName ?? '';
    this.editBio = this.currentUser.bio ?? '';
    this.profileSaveSuccess = false;
    this.profileSaveError = '';
    this.editMode = true;
  }

  cancelEditMode() {
    this.editMode = false;
    this.profileSaveSuccess = false;
    this.profileSaveError = '';
  }

  saveProfile() {
    this.profileSaveSuccess = false;
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
      },
      error: () => {
        this.profileSaveError = 'Failed to save profile. Please try again.';
      }
    });
  }

  togglePasswordMode() {
    this.passwordMode = !this.passwordMode;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
    this.passwordSaveSuccess = false;
    this.passwordSaveError = '';
  }

  savePassword() {
    this.passwordSaveSuccess = false;
    this.passwordSaveError = '';

    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordSaveError = 'New passwords do not match.';
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
          ? msg
          : 'Failed to update password. Check your current password and try again.';
      }
    });
  }
}
