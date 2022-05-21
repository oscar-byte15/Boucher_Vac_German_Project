import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/AuthGuard';

import {UserProfileComponent} from './components/user-profile/user-profile/user-profile.component';
import {CronogramaComponent} from './components/cronograma/cronograma/cronograma.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'main', component: MainComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'cronograma', component: CronogramaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
