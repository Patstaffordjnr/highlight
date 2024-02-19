import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { GoogleMapComponent } from './pages/google-map/google-map.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminHomeComponent } from './pages/admin/home/admin-home.component';
import { canActivateTeam } from './util/can-activate.service';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [canActivateTeam]},
  { path: 'user', component: UserComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'map', component: GoogleMapComponent },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [canActivateTeam]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
