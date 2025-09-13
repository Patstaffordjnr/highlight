import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavComponent } from './common/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { RouterService } from './util/router.service';
import { ErrorInterceptor } from './util/interceptors/noop-interceptor.service';
import { CurrentUserService, PermissionsService } from './util/can-activate.service';
import { CalendarComponent } from './common/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './common/map/map.component';
import { EventService } from './common/event/event-service';
import { EventsTableComponent } from './common/event/events-table/events-table.component';

import { ProgressBarComponent } from './common/progress-bar/progress-bar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserComponent } from './pages/user/user.component';

import { EventsTableControlComponent } from './common/event/events-table-control/events-table-control.component';
import { EventsComponent } from './pages/events/events.component';
import { GlobalDateService } from './pages/home/global-date.service';
import { CommonEventsComponent } from './common/events/common-events.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import { EventModalComponent } from './common/event/event-modal/event-modal.component';
import { BuskersComponent } from './pages/buskers/buskers.component';
import { BuskerComponent } from './pages/busker/busker.component';
import { BuskersTableComponent } from './common/busker/buskers-table/buskers-table.component';

@NgModule({
  declarations: [
    // Pages
    EventsComponent,
    BuskersComponent,
    BuskerComponent,


    // Components
    AppComponent,
    SignUpComponent,
    NavComponent,
    LogInComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CalendarComponent,
    MapComponent,
    ProgressBarComponent,
    UserComponent,
    EventsTableControlComponent,
    EventModalComponent
  ],
  bootstrap: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    EventsTableComponent,
    CommonEventsComponent,
    UserProfileComponent,
        BuskersTableComponent,
  ],

  exports: [
    MapComponent,           // ✅ now export
    EventModalComponent     // ✅ now export
  ],

  providers: [
    RouterService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CurrentUserService,
    PermissionsService,
    GlobalDateService,
    EventService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
