import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavComponent } from './common/nav/nav.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { CalendarComponent } from './common/calendar/calendar.component';
import { EventsComponent } from './pages/events/events.component';
import { BuskerComponent } from './pages/busker/busker.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BuskersComponent } from './pages/buskers/buskers.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'mainmenu', component: NavComponent },
  { path: 'user', component: UserComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'busker', component: BuskerComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'buskers', component: BuskersComponent},
  { path: 'about', component: AboutComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]

})

export class AppRoutingModule { 
  
}
