import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletComponent } from './leaflet/leaflet.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from './main-header/main-header.component';
import { GigTypeDateComponent } from './gig-type-date/gig-type-date.component';
import { CalenderComponent } from './calender/calender.component';



@NgModule({
  declarations: [
    AppComponent,
    LeafletComponent,
    HomeComponent,
    CreateEventComponent,
    UserLogInComponent,
    GoogleMapComponent,
    UserComponent,
    CreateUserComponent,
    MainHeaderComponent,
    GigTypeDateComponent,
    CalenderComponent,

    
  
    
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
