import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavComponent } from './common/nav/nav.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';
import { EditEventsComponent } from './pages/edit-events/edit-events.component';
import { EditUsersComponent } from './pages/edit-users/edit-users.component';
import { CalendarComponent } from './common/calendar/calendar.component';
import { EventsComponent } from './common/event/events/events.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'mainmenu', component: NavComponent },
  { path: 'user', component: UserComponent},
  { path: 'users', component: UsersComponent},
  { path: 'editevents', component: EditEventsComponent},
  { path: 'editusers', component: EditUsersComponent},
  { path: 'calendar', component: CalendarComponent},
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
