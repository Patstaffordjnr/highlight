import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';


@NgModule({
  declarations: [
    //Pages
    AppComponent,
    SignUpComponent,
    MainMenuComponent,
    LogInComponent,
    HeaderComponent,
    FooterComponent

    //Components
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
