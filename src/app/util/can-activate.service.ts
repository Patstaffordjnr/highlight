import { Injectable, inject } from "@angular/core";
import { User } from "../model/user";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { UserRole } from "../model/user-role";

@Injectable()
export class CurrentUserService {
    private currentUser: User;

    async setUser(user: User): Promise<void> {
        this.currentUser = user;
    }

    async getUser(): Promise<User> {
        return this.currentUser;
    }
}

@Injectable()
export class PermissionsService {
  async canActivate(currentUser: CurrentUserService, url: string): Promise<boolean> {
    var user = await currentUser.getUser();


   
    if(!user) {
        return false;
    }

    if(url === "/home" && [UserRole.ADMIN, UserRole.BUSKER, UserRole.USER].some(obj => user.roles.includes(obj))) {
        return true;
    }

    if(url === "/admin/home" && [UserRole.ADMIN].some(obj => user.roles.includes(obj))) {
        return true;
    }

    return false;
  }
  canMatch(currentUser: CurrentUserService): boolean {
    return true;
  }
}

export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivate(inject(CurrentUserService), state.url);
};