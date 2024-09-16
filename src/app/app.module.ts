import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { RouterService } from './util/router.service';
import { ErrorInterceptor } from './util/interceptors/noop-interceptor.service';
import { CurrentUserService, PermissionsService } from './util/can-activate.service';


@NgModule({
  declarations: [
    //Pages


    //Components,
    AppComponent,
    SignUpComponent,
    MainMenuComponent,
    LogInComponent,
    HeaderComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [
    RouterService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CurrentUserService,
    PermissionsService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
