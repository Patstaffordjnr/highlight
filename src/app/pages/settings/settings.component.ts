import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { Event as AppEvent } from 'src/app/model/event';
import { EventType } from 'src/app/model/event-types';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { CurrentUserService } from 'src/app/util/can-activate.service';
import { AuthService } from 'src/app/util/auth.service';
import { RouterService } from 'src/app/util/router.service';

type SettingsSectionId =
  | 'profile'
  | 'account'
  | 'events'
  | 'busker'
  | 'archive'
  | 'notifications'
  | 'privacy'
  | 'preferences'
  | 'admin'
  | 'session';

interface SettingsSection {
  id: SettingsSectionId;
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
  buskerOnly?: boolean;
}

interface ArchiveGroup {
  year: number;
  events: AppEvent[];
}

const EVENT_TYPES = [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE];

/** Cross-field validator: new password and confirmation must match. */
function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const newPassword = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (!newPassword || !confirmPassword) return null;
  return newPassword === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: User | null = null;

  /** The settings category currently open. `null` shows the category list. */
  activeSection: SettingsSectionId | null = null;

  readonly coreSections: SettingsSection[] = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Name, photo, bio and social links',
      icon: '👤'
    },
    {
      id: 'account',
      title: 'Account & Security',
      description: 'Email, verification and password',
      icon: '🔒'
    },
    {
      id: 'events',
      title: 'Events & Calendar',
      description: 'Followed events, reminders and calendar sync',
      icon: '📅',
      comingSoon: true
    },
    {
      id: 'busker',
      title: 'Busker',
      description: 'Busker mode, gig history, payments and stats',
      icon: '🎸'
    },
    {
      id: 'archive',
      title: 'Gig archive',
      description: 'Every gig you have played, newest first',
      icon: '🗂️',
      buskerOnly: true
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Choose what we email or push to you',
      icon: '🔔',
      comingSoon: true
    },
    {
      id: 'privacy',
      title: 'Privacy',
      description: 'Profile visibility, contact controls and your data',
      icon: '🛡️',
      comingSoon: true
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Language, appearance and map behaviour',
      icon: '⚙️',
      comingSoon: true
    },
    {
      id: 'session',
      title: 'Session & Danger Zone',
      description: 'Log out or delete your account',
      icon: '⚠️'
    }
  ];

  readonly adminSection: SettingsSection = {
    id: 'admin',
    title: 'Admin',
    description: 'Manage users and events',
    icon: '🛠️'
  };

  profileForm: FormGroup;
  passwordForm: FormGroup;

  profileSaving = false;
  profileSaved = false;
  profileError = '';

  avatarUploading = false;
  avatarError = '';

  passwordSaving = false;
  passwordSaved = false;
  passwordError = '';

  buskerSaving = false;
  buskerError = '';

  verificationSending = false;
  verificationSent = false;
  verificationError = '';

  archiveGroups: ArchiveGroup[] = [];
  archiveTotal = 0;
  archiveLoading = false;
  archiveLoadingMore = false;
  archiveLoaded = false;
  archiveError = '';

  private archivePage = 0;
  private readonly archivePageSize = 20;
  private pastEvents: AppEvent[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: OpenHttpClientService,
    private currentUserService: CurrentUserService,
    private authService: AuthService,
    private routerService: RouterService
  ) {
    this.profileForm = this.formBuilder.group({
      displayName: ['', Validators.maxLength(50)],
      location: ['', Validators.maxLength(100)],
      bio: ['', Validators.maxLength(500)],
      instagramUrl: ['', Validators.maxLength(200)],
      tiktokUrl: ['', Validators.maxLength(200)],
      youtubeUrl: ['', Validators.maxLength(200)],
      spotifyUrl: ['', Validators.maxLength(200)]
    });

    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validators: passwordsMatch }
    );
  }

  ngOnInit(): void {
    this.currentUserService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        if (user) this.patchProfileForm(user);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get sections(): SettingsSection[] {
    const sections = this.coreSections.filter(section => !section.buskerOnly || this.isBusker);
    return this.isAdmin ? [...sections, this.adminSection] : sections;
  }

  get activeSectionMeta(): SettingsSection | undefined {
    return this.sections.find(section => section.id === this.activeSection);
  }

  get displayLabel(): string {
    if (!this.user) return '';
    if (this.user.displayName) return this.user.displayName;
    return String(this.user.email || '').split('@')[0];
  }

  get profileImage(): string {
    return this.user?.profileImageUrl || '/assets/userprofile.jpg';
  }

  get isBusker(): boolean {
    return (this.user?.roles ?? []).map(role => String(role)).includes('BUSKER');
  }

  get isAdmin(): boolean {
    return (this.user?.roles ?? []).map(role => String(role)).includes('ADMIN');
  }

  get passwordMismatch(): boolean {
    return this.passwordForm.hasError('passwordsMismatch')
      && !!this.passwordForm.get('confirmPassword')?.value;
  }

  selectSection(section: SettingsSectionId): void {
    this.activeSection = section;
    this.profileSaved = false;
    this.profileError = '';
    this.avatarError = '';
    this.passwordSaved = false;
    this.passwordError = '';
    this.buskerError = '';
    this.verificationSent = false;
    this.verificationError = '';
    if (section === 'archive' && !this.archiveLoaded) {
      this.loadArchive(true);
    }
    window.scrollTo(0, 0);
  }

  backToList(): void {
    this.activeSection = null;
    window.scrollTo(0, 0);
  }

  trackBySectionId(_index: number, section: SettingsSection): string {
    return section.id;
  }

  saveProfile(): void {
    if (!this.user) return;

    this.profileSaving = true;
    this.profileSaved = false;
    this.profileError = '';

    const form = this.profileForm.value;

    this.http.updateProfile(
      this.blankToNull(form.displayName),
      this.blankToNull(form.bio),
      this.blankToNull(form.location),
      this.blankToNull(form.instagramUrl),
      this.blankToNull(form.tiktokUrl),
      this.blankToNull(form.youtubeUrl),
      this.blankToNull(form.spotifyUrl)
    ).subscribe({
      next: (updated: User) => {
        this.applyUser(updated);
        this.profileSaving = false;
        this.profileSaved = true;
        setTimeout(() => { this.profileSaved = false; }, 3000);
      },
      error: () => {
        this.profileSaving = false;
        this.profileError = 'Could not save your profile. Please try again.';
      }
    });
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.avatarUploading = true;
    this.avatarError = '';

    this.http.uploadProfileImage(file).subscribe({
      next: (updated: User) => {
        this.applyUser(updated);
        this.avatarUploading = false;
        input.value = '';
      },
      error: () => {
        this.avatarUploading = false;
        this.avatarError = 'Could not upload that image. Try a JPG or PNG under 5 MB.';
        input.value = '';
      }
    });
  }

  get archiveLoadedCount(): number {
    return this.pastEvents.length;
  }

  loadArchive(reset: boolean): void {
    const page = reset ? 0 : this.archivePage + 1;

    if (reset) {
      this.pastEvents = [];
      this.archiveGroups = [];
      this.archiveTotal = 0;
      this.archiveLoaded = false;
      this.archiveLoading = true;
      this.archiveLoadingMore = false;
    } else {
      this.archiveLoadingMore = true;
    }
    this.archiveError = '';

    this.http.getUserEvents(page, this.archivePageSize, EVENT_TYPES, 'past').subscribe({
      next: (response: any) => {
        const results: AppEvent[] = response?.results ?? response ?? [];
        this.pastEvents = reset ? results : [...this.pastEvents, ...results];
        this.archiveTotal = typeof response?.total === 'number' ? response.total : this.pastEvents.length;
        this.archivePage = page;
        this.archiveLoaded = true;
        this.archiveLoading = false;
        this.archiveLoadingMore = false;
        this.groupArchive();
      },
      error: () => {
        this.archiveError = 'Could not load your gig archive. Please try again.';
        this.archiveLoading = false;
        this.archiveLoadingMore = false;
      }
    });
  }

  loadMoreArchive(): void {
    if (this.archiveLoading || this.archiveLoadingMore) return;
    if (this.pastEvents.length >= this.archiveTotal) return;
    this.loadArchive(false);
  }

  private groupArchive(): void {
    const groups: ArchiveGroup[] = [];

    for (const event of this.pastEvents) {
      const year = new Date(Number(event.startAt) * 1000).getFullYear();
      let group = groups.find(candidate => candidate.year === year);
      if (!group) {
        group = { year, events: [] };
        groups.push(group);
      }
      group.events.push(event);
    }

    this.archiveGroups = groups;
  }

  savePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.passwordSaving = true;
    this.passwordSaved = false;
    this.passwordError = '';

    const { currentPassword, newPassword } = this.passwordForm.value;

    this.http.updatePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.passwordSaving = false;
        this.passwordSaved = true;
        this.passwordForm.reset();
        setTimeout(() => { this.passwordSaved = false; }, 3000);
      },
      error: (err: any) => {
        this.passwordSaving = false;
        this.passwordError = typeof err?.error === 'string' && err.error
          ? err.error
          : 'Could not update your password. Check your current password and try again.';
      }
    });
  }

  becomeBusker(): void {
    this.buskerSaving = true;
    this.buskerError = '';

    this.http.updateBuskerRole(true).subscribe({
      next: (updated: User) => {
        this.applyUser(updated);
        this.buskerSaving = false;
      },
      error: () => {
        this.buskerSaving = false;
        this.buskerError = 'Could not enable busker mode. Please try again.';
      }
    });
  }

  resendVerification(): void {
    if (!this.user) return;

    this.verificationSending = true;
    this.verificationSent = false;
    this.verificationError = '';

    this.http.resendVerification(String(this.user.email)).subscribe({
      next: () => {
        this.verificationSending = false;
        this.verificationSent = true;
      },
      error: () => {
        this.verificationSending = false;
        this.verificationError = 'Could not send the verification email. Please try again later.';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.routerService.toLogoutPage();
  }

  private patchProfileForm(user: User): void {
    this.profileForm.patchValue({
      displayName: user.displayName ?? '',
      location: user.location ?? '',
      bio: user.bio ?? '',
      instagramUrl: user.instagramUrl ?? '',
      tiktokUrl: user.tiktokUrl ?? '',
      youtubeUrl: user.youtubeUrl ?? '',
      spotifyUrl: user.spotifyUrl ?? ''
    }, { emitEvent: false });
  }

  private applyUser(user: User): void {
    this.user = user;
    this.currentUserService.setUser(user);
    this.patchProfileForm(user);
  }

  private blankToNull(value: string | null | undefined): string | null {
    const trimmed = (value ?? '').trim();
    return trimmed.length > 0 ? trimmed : null;
  }
}
