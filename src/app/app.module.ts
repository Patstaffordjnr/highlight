import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './util/create-event/create-event.component';

import { GoogleMapComponent } from './util/google-map/google-map.component';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from './util/main-header/main-header/main-header.component';
import { GigTypeDateComponent } from './util/gig-type-date/gig-type-date/gig-type-date.component';
import { CalenderComponent } from './util/calender/calender/calender.component';
import { SiteComponent } from '../app/main/site/site.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { EditUserComponent } from './main/edit-user/edit-user.component';
import { UserComponent } from './model/user/user.component';
import { ProgressBarComponent } from './util/progress-bar/progress-bar.component';
import { LogInComponent } from './main/log-in/log-in.component';
import { HomeBlancComponent } from './home-blanc/home-blanc.component';
import { ContemporaryEventsComponent } from './util/contemporary-events/contemporary-events.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CorsInterceptor } from 'src/app/cors.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateEventComponent,
    GoogleMapComponent,
    MainHeaderComponent,
    GigTypeDateComponent,
    CalenderComponent,
    SiteComponent,
    SignUpComponent,
    EditUserComponent,
    UserComponent,
    ProgressBarComponent,
    LogInComponent,
    HomeBlancComponent,
    ContemporaryEventsComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    
  ],
  providers: [
    // CorsInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
