import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { GoogleMapComponent } from './pages/google-map/google-map.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminHomeComponent } from './pages/admin/home/admin-home.component';
import { canActivateTeam } from './util/can-activate.service';
import { EventComponent } from './pages/events/event/event.component'
import { EventsComponent } from './pages/events/events.component';
import { EventTableComponent } from './pages/events/event-table/event-table.component';
import { CalendarComponent} from '../app/components/calendar/calendar.component'
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { GlobalDateAndTimeComponent } from './util/global-date-and-time/global-date-and-time.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [canActivateTeam]},
  { path: 'user', component: UserComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'map', component: GoogleMapComponent },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [canActivateTeam]},
  { path: 'createevent', component: EventComponent, canActivate: [canActivateTeam] },
  { path: 'events', component: EventsComponent},
  { path: 'googlemap', component: GoogleMapComponent},
  { path: 'eventtable', component: EventTableComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'progressbar', component: ProgressBarComponent},
  { path: 'globaldateandtime', component: GlobalDateAndTimeComponent},
  { path: 'event', component: EventComponent},
  { path: '', component: HomeComponent, children: [
    { path: '', outlet: 'map', component: GoogleMapComponent },
    { path: '', outlet: 'events', component: EventsComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
