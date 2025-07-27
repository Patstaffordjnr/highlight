import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/util/auth.service';
import { CurrentUserService } from '../../util/can-activate.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenHttpClientService } from 'src/app/common/http/open-http-client.service';
import { EventType } from 'src/app/model/event-types';
import { UserProfileComponent } from 'src/app/common/user-profile/user-profile.component';

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
  events: Event[] = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private currentUserService: CurrentUserService, private openHttpClientService: OpenHttpClientService) {

    // this.form = this.formBuilder.group({
    //   email: ['busker@dumb.com'],
    //   password: ['dumb'],
    // });

    this.openHttpClientService.getEvents(
      new Date(2025, 6, 6, 23, 0, 0),
      -88,
      -88
      ,80
      ,80,
      [EventType.BUSKER, EventType.BAND, EventType.DJ, EventType.PERFORMANCE]
    ).subscribe({
      next: (events: Event[]) => {
  
        // 'events' here IS your complete list of Event[]
        // console.log('Successfully extracted events:', events);
        this.events = events; // Assign the full list to your component property
      },
      error: (error) => {
        // console.error('Error fetching events:', error);
      },
    });
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

  
}
