import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeafletComponent } from './leaflet/leaflet.component';
import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { CreateUserComponent } from './create-user/create-user.component';



const routes: Routes = [
  { path: 'leaflet', component: LeafletComponent },
  { path: 'home', component: HomeComponent },
  { path: 'createEvent', component: CreateEventComponent },
  { path: 'googleMapComponent', component: GoogleMapComponent },
  { path: 'userLogIn', component: UserLogInComponent },
  { path: 'createUser', component: CreateUserComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
