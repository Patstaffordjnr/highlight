import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/util/shared.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private sharedService: SharedService) { 
    this.userForm = this.formBuilder.group({
      email: [''],
      userPassword: [''],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.sharedService.updateFormData(this.userForm.value);
    // console.log( this.sharedService);
    console.log(`as`);
  }

}
