import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginClient } from '../log-in/log-in.client';
import { RouterService } from 'src/app/util/router.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   userDTO = {
    email: '',
    password: '', 
    }

    roles: '';
    token: '';
    id:'';

  componentVisibility = {
    register: { visible: false, fontSize: '20px', textAlign: 'center' },
    logIn: { visible: false, fontSize: '20px', textAlign: 'center' },
    createEvent: { visible: false, fontSize: '20px', textAlign: 'center' },
    googleMap: { visible: true, fontSize: '20px',  textAlign: 'center'},
    eventsDisplpay: { visible: false, fontSize: '20px',textAlign: 'center' },
    user: { visible: false, fontSize: '20px',textAlign: 'center' },
    editUser: { visible: false, fontSize: '20px',textAlign: 'center' },
    calendar: { visible: false, fontSize: '20px', textAlign: 'center' }, // Corrected spelling
  };

  googleRouterLink = document.querySelector('.routerLink');
  
  
  constructor(private logInService: LoginClient, private httpClient: HttpClient, private routerService: RouterService) { 

  }

  makePostRequest(url: string, headers: HttpHeaders): Promise<any> {
    
    return this.httpClient.post(url, { headers }).toPromise();
  }
  ngOnInit(): void {

    // this.logInService.updatedUser$.subscribe((response) => {
    //   // Handle potential null response safely
    //   if (!response) { 
    //      }
    //     else {

    //       this.userDTO.email = response.email;
    //       this.userDTO.password = response.password;
    //       this.roles = response.roles;
    //       this.token = response.token;
    //       this.id = response.id;


    //       let url = 'http://localhost:8085/admin/whoAmI';
    //       let headers = new HttpHeaders({
            
    //       'Content-Type' : 'appilication/json',
    //       'Authorization' : `Bearer: ${response.token}`
    //       });

    //       this.httpClient.get<String>(url, {headers}).subscribe(response => {
    //         console.log(response);
    //       })
    //     }
    //   });

  }

    
  async toAdminHomePage(): Promise<void> {
    this.routerService.toAdminHomePage();
  }

  async logOff(): Promise<void> {
    this.routerService.toLogoutPage();
  }

  onClick(): void {
    alert('click');
  }

  openSaysMe(component: string): void {
    // console.log(`remove classList of ${component}`);

    // Toggle the visibility of the selected component
    this.componentVisibility[component].visible = !this.componentVisibility[component].visible;

    // Toggle the font size along with visibility
    this.componentVisibility[component].fontSize = this.componentVisibility[component].visible ? '16px' : '20px';

  }
}
