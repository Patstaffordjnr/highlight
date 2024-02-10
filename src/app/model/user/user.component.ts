import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/util/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userSpareService: string;

  firstName: string;
  lastName: string;
  userId: string;
  userDob: string;
  email: string;
  userPassword: string;
  userRole: string;



  constructor() { 

  }

  ngOnInit(): void {
  }
}

