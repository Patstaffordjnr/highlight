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



  constructor(private sharedService: SharedService) { 
    this.sharedService.formData$.subscribe((formData) => {
      if (formData) {
        // Update your component properties with the new form data
        this.email = formData.email;
        this.userPassword = formData.userPassword;
        this.userRole = formData.userRole; // Assuming you have userRole in your form data
      }
    });

    this.sharedService.userSpareService$.subscribe((userSpareService) => {
      this.userSpareService = userSpareService;
    });

    this.sharedService.formData$.subscribe((formData) => {
      console.log('Received formData:', formData);
      // Rest of the code...
    });
  }

  ngOnInit(): void {
  }
}

