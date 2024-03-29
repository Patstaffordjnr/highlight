import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { CalenderComponent } from './components/calender/calender.component';
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
// import { CorsInterceptor } from 'src/app/cors.interceptor';



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

    //Components
    MainHeaderComponent,
    EventComponent,

    CalenderComponent,
    ProgressBarComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EventsComponent,

    
  ],
  providers: [
    // CorsInterceptor,
    AuthClientService,
    RouterService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CurrentUserService,
    PermissionsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
