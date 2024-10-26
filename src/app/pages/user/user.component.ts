import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/util/auth.service';
import { CurrentUserService } from '../../util/can-activate.service'

@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {



  constructor(private currentUserService: CurrentUserService) {


  }



  async ngOnInit() {

    let user = await this.currentUserService.getUser()
    console.log(user);

  }
  

}
