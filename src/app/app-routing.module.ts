import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HomeBlancComponent} from 'src/app/home-blanc/home-blanc.component'
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { GoogleMapComponent } from './pages/google-map/google-map.component';

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
