import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/util/auth.service';
import { CurrentUserService } from '../../util/can-activate.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userRoles = [];
    currentUser: User = {
    id: "string",
    email: "string",
    roles: [],
  };

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private currentUserService: CurrentUserService) {

    // this.form = this.formBuilder.group({
    //   email: ['busker@dumb.com'],
    //   password: ['dumb'],
    // });

  }

  async ngOnInit() {

    let user = await this.currentUserService.getUser()

    this.currentUser.id = user.id;
    this.currentUser.email =  user.email;
    this.currentUser.roles = user.roles;


    let a = this.currentUser.roles.filter((userRole) => {
      if(String(userRole) === "USER") {
        this.userRoles = ['USER'];
        console.log(`USER`);
        return "USER";

    } else if (String(userRole) === "BUSKER") {
      this.userRoles = ['BUSKER'];

      console.log(`BUSKER`);
      return "BUSKER";

      
    } else if (String(userRole) === "ADMIN") {
      this.userRoles = ['ADMIN'];
      console.log(`ADMIN`);
      return "ADMIN";
    }
    })

    console.log(a);



    
  }
  
  async onSubmit() {
    
   
    
  }
}
