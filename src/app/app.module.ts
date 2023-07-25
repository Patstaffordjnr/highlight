import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './create-event/create-event.component';

import { GoogleMapComponent } from './google-map/google-map.component';

import { FormsModule } from '@angular/forms';
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
    CreateGigComponent,
    EditUserComponent,
    UserComponent,
    ProgressBarComponent,
 
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
