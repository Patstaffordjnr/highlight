import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './util/create-event/create-event.component';
import { UserComponent } from './model/user/user.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { LogInComponent } from './main/log-in/log-in.component';
import { GoogleMapComponent } from './util/google-map/google-map.component';

import { HomeBlancComponent} from 'src/app/home-blanc/home-blanc.component'

const routes: Routes = [
  { path: '',   redirectTo: '/home-blanc', pathMatch: 'full' },
  { path: 'home-blanc', component: HomeBlancComponent }, // Define a route for HomeBlancComponent
  { path: 'user', component: UserComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'userLogIn', component: LogInComponent },
  { path: 'createEvent', component: CreateEventComponent },
  { path: 'googleMapComponent', component: GoogleMapComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
