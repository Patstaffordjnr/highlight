import { Component, OnInit } from '@angular/core';
// import { }

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  
role = ['Busker', 'User', 'Admin']



  constructor() { }

  ngOnInit(): void {
  }

}
