import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createUserForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    id: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    userType: new FormControl(''),
    profileImage: new FormControl(null) // New FormControl for the profile image
  });

  constructor(private sanitizer: DomSanitizer) { }

  onSubmit() {
    console.warn(this.createUserForm.value);
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const imageUrl = URL.createObjectURL(file);
      const sanitizedImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl) as SafeUrl;
      this.createUserForm.patchValue({ profileImage: sanitizedImageUrl });
    }
  }

  ngOnInit(): void {
  }
}
