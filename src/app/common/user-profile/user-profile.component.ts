import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';

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

  readonly defaultImage = '/assets/userprofile.jpg';

  constructor(private currentUserService: CurrentUserService) {}

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
}
