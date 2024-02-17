import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { GoogleMapComponent } from './pages/google-map/google-map.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '',   redirectTo: '/signUp', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'map', component: GoogleMapComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
