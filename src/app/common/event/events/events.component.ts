import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';
import { CurrentUserService } from 'src/app/util/can-activate.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
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

async onSubmit() { 
}
}
