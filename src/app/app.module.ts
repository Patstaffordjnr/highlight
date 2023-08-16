import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CreateEventComponent } from './create-event/create-event.component';

import { GoogleMapComponent } from './util/google-map/google-map.component';

import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from './util/main-header/main-header/main-header.component';
import { GigTypeDateComponent } from './util/gig-type-date/gig-type-date/gig-type-date.component';
import { CalenderComponent } from './util/calender/calender/calender.component';
import { SiteComponent } from '../app/main/site/site.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { CreateGigComponent } from './main/create-gig/create-gig.component';
import { EditUserComponent } from './main/edit-user/edit-user.component';
import { UserComponent } from './model/user/user.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LogInComponent } from './main/log-in/log-in.component';
import { HomeComponent } from './pages/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    GoogleMapComponent,
    MainHeaderComponent,
    GigTypeDateComponent,
    CalenderComponent,
    SiteComponent,
    SignUpComponent,
    CreateGigComponent,
    EditUserComponent,
    UserComponent,
    ProgressBarComponent,
    LogInComponent,
    HomeComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
