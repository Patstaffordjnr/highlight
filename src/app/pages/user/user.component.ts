import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'; 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {




yo;


  constructor(private userService: UserService) { 
    let x = userService.getCurrentUser()
    console.log(x, 'a');
  }

  ngOnInit(): void {
  }
}

