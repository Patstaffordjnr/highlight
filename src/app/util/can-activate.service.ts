import { Injectable, inject } from "@angular/core";
import { User } from "../model/user";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class CurrentUserService {
    private currentUser: User;

    async setUser(user: User): Promise<void> {
        this.currentUser = user;
    }

    async getUser(user: User): Promise<User> {
        return this.currentUser;
    }
}

@Injectable()
export class PermissionsService {
  canActivate(currentUser: CurrentUserService): boolean {
    debugger;
    return true;
  }
  canMatch(currentUser: CurrentUserService): boolean {
    debugger;
    return true;
  }
}

export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivate(inject(CurrentUserService));
};