import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {
  private signIn = new BehaviorSubject<boolean>(false);
  private helloAuthClientBuoy = new BehaviorSubject<boolean>(false);


  private userSignInFormData = new BehaviorSubject<any>(null);
  userSignIn$ = this.userSignInFormData.asObservable();


  updateUserSignIn(userSignIn: any): void {
    this.userSignInFormData.next(userSignIn);

    let userEmail = userSignIn.email;
    let userPassword = userSignIn.password;
    let userRole = userSignIn.roles
    console.log(userEmail,userPassword, userRole );

  }





  signInMethod(status: boolean) {
    this.signIn.next(status);
  }

  helloAuthClientBuoyMethod(status: boolean) {
    this.helloAuthClientBuoy.next(status);
  }



  get signInMethod$(): Observable<boolean> {
    return this.signIn.asObservable(); // Use asObservable to expose only Observable part
  }

  get helloAuthClientBuoyMethod$(): Observable<boolean> {
    return this.helloAuthClientBuoy.asObservable(); // Use asObservable to expose only Observable part
  }

  
}
