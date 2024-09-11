import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-log-in',
  // standalone: true,
  // imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.form = this.formBuilder.group({
      email: ['busker@dumb.com'],
      password: ['dumb'],
    });

  }

async onSubmit(){
  console.log(this.form);
  let a = await this.login(this.form.value).subscribe((response: any) => {
    // console.log(response);
  })
console.log(a);

}

login(data: { email: string; password: string }) {
  return this.http.post('http://localhost:8080/api/auth/login', data);
}


}
