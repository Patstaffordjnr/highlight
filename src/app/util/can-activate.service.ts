import { Injectable, inject } from "@angular/core";
import { User } from "../model/user";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { UserRole } from "../model/user-roles";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CurrentUserService {
    private currentUser: User;
    private userRoles = new BehaviorSubject<UserRole[]>(null)

    userRole$ = this.userRoles.asObservable();
    
    async setUser(user: User): Promise<void> {
        this.currentUser = user;
        this.userRoles.next(user.roles);
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

      console.log(user);
        return true;  
    }

    if(url === "/admin/home" && [UserRole.ADMIN].some(obj => user.roles.includes(obj))) {
      console.log(user);
        return true;
    }

    if(url === "/createevent" && [UserRole.ADMIN, UserRole.BUSKER].some(obj => user.roles.includes(obj))) {
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