import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainMenuComponent } from './common/main-menu/main-menu.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'mainmenu', component: MainMenuComponent },
  { path: 'user', component: UserComponent},
  { path: 'users', component: UsersComponent},

  

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]

})

export class AppRoutingModule { 
  
}
