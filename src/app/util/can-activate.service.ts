import { Injectable, inject } from '@angular/core';
import { User } from '../model/user';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../model/user-roles';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private userRolesSubject = new BehaviorSubject<UserRole[] | null>(null);

  user$: Observable<User | null> = this.currentUserSubject.asObservable();
  userRole$: Observable<UserRole[] | null> = this.userRolesSubject.asObservable();

  setUser(user: User): void {
    this.currentUserSubject.next(user);
    this.userRolesSubject.next(user?.roles ?? null);
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
    this.userRolesSubject.next(null);
  }

  getUser(): User | null {
    return this.currentUserSubject.value ?? null;
  }
}

export const canActivateLoggedIn: CanActivateFn = () => {
  const user = inject(CurrentUserService).getUser();
  if (user) return true;
  inject(Router).navigate(['/login']);
  return false;
};

export const canActivateBusker: CanActivateFn = () => {
  const user = inject(CurrentUserService).getUser();
  if (user && (user.roles.includes(UserRole.BUSKER) || user.roles.includes(UserRole.ADMIN))) return true;
  inject(Router).navigate(['/login']);
  return false;
};

export const canActivateAdmin: CanActivateFn = () => {
  const user = inject(CurrentUserService).getUser();
  if (user && user.roles.includes(UserRole.ADMIN)) return true;
  inject(Router).navigate(['/login']);
  return false;
};
