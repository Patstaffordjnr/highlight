import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/util/auth.service';
import { CurrentUserService } from '../../util/can-activate.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-users',
  standalone: true,
  imports: [],
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.css'
})
export class EditUsersComponent {

  userRoles = [];
    currentUser: User = {
    id: "string",
    email: "string",
    roles: [],
  };

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private currentUserService: CurrentUserService) {
    
  }

  async ngOnInit() {

    let user = await this.currentUserService.getUser()

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

  a() {
    console.log(`A`);

  }

  b(){
     console.log(`B`);
  }

}
