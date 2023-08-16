import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  date = new Date();

  checkoutForm = this.formBuilder.group({
    name: new FormControl(''),
    address: ''
  });


  // favoriteColorControl = new FormControl('');
  
  constructor(
    private formBuilder: FormBuilder,
  ) { 
    

    console.log(this.date);
  }

  ngOnInit(): void {
  }

}
