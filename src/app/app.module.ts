import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserComponent } from './pages/user/user.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GoogleMapComponent } from './pages/google-map/google-map.component';
import { EventComponent } from './pages/events/event/event.component';
import { AuthClientService } from './util/auth-client.service';
import { RouterService } from './util/router.service';
import { ErrorInterceptor } from './util/interceptors/noop-interceptor.service';
import { AdminHomeComponent } from './pages/admin/home/admin-home.component';
import { CurrentUserService, PermissionsService } from './util/can-activate.service';
import { EventsComponent } from './pages/events/events.component';
import { EventTableComponent } from './pages/events/event-table/event-table.component';
import { UserInterfaceNavComponent } from './util/user-interface-nav/user-interface-nav.component';
import { EventModalComponent } from './pages/events/event-modal/event-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FooterComponent } from './footer/footer.component';
import { GlobalDateAndTimeComponent } from './util/global-date-and-time/global-date-and-time.component';
import { GlobalDateAndTimeComponentService } from './util/global-date-and-time/global-date-and-time.service';


@NgModule({
  declarations: [
    //Pages
    AppComponent,
    HomeComponent,
    UserComponent,
    GoogleMapComponent,    
    SignUpComponent,
    LogInComponent,
    AdminHomeComponent,
    UserInterfaceNavComponent,
   
    //Components
    MainHeaderComponent,
    EventComponent,
    EventsComponent,
    CalendarComponent,
    ProgressBarComponent, 
    EventModalComponent,
    FooterComponent,
    GlobalDateAndTimeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EventTableComponent,
    DragDropModule,

    
  ],
  providers: [
    // CorsInterceptor,
    AuthClientService,
    RouterService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CurrentUserService,
    PermissionsService,
    GlobalDateAndTimeComponentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
