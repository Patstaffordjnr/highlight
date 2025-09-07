import { Injectable, inject } from "@angular/core";
import { User } from "../model/user";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { UserRole } from "../model/user-roles";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private userRolesSubject = new BehaviorSubject<UserRole[] | null>(null);

  user$: Observable<User | null> = this.currentUserSubject.asObservable();
  userRole$: Observable<UserRole[] | null> = this.userRolesSubject.asObservable();

  setUser(user: User): void {
    this.currentUserSubject.next(user);
    this.userRolesSubject.next(user.roles);
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
    this.userRolesSubject.next(null);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }
}

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  canActivate(currentUser: CurrentUserService, url: string): boolean {
    const user = currentUser.getUser();

    if (!user) return false;

    if (url === "/home" && [UserRole.ADMIN, UserRole.BUSKER, UserRole.USER].some(r => user.roles.includes(r))) {
      console.log(user);
      return true;
    }

    if (url === "/admin/home" && user.roles.includes(UserRole.ADMIN)) {
      console.log(user);
      return true;
    }

    if (url === "/createevent" && [UserRole.ADMIN, UserRole.BUSKER].some(r => user.roles.includes(r))) {
      return true;
    }

    return false;
  }

  canMatch(): boolean {
    return true;
  }
}

export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivate(inject(CurrentUserService), state.url);
};