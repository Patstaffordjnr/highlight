import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  userRoles = [];
  currentUser: User = {
  id: "string",
  email: "string",
  roles: [],
};

constructor(private currentUserService: CurrentUserService) {


}

async ngOnInit() {
  let user = await this.currentUserService.getUser()
  if(user) {

  this.currentUser.id = user.id;
  this.currentUser.email =  user.email;
  this.currentUser.roles = user.roles;

  let a = this.currentUser.roles.filter((userRole) => {
    if(String(userRole) === "USER") {
      this.userRoles = ['USER'];
      return "USER";

  } else if (String(userRole) === "BUSKER") {
    this.userRoles = ['BUSKER'];
    return "BUSKER";

    
  } else if (String(userRole) === "ADMIN") {
    this.userRoles = ['ADMIN'];
    return "ADMIN";
  }
  })
  }
  


}

}
