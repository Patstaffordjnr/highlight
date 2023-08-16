import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { UserComponent } from './model/user/user.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { LogInComponent } from './main/log-in/log-in.component';
import { CreateGigComponent } from './main/create-gig/create-gig.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
