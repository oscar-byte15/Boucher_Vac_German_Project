import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Reactive Forms
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// angular materail
import { MaterialModule } from './material.module';
// components
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
// services
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
// guards
import { AuthGuard } from './guards/AuthGuard';
// interceptor
import { AuthInterceptor } from './interceptor/AuthInterceptor';



import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { UserProfileComponent } from './components/user-profile/user-profile/user-profile.component';
import { UpdateUserDialogComponent } from './components/user-profile/update-dialog/update-user-dialog/update-user-dialog.component';
import { UserProfilePublicationComponent } from './components/main/UserProfileByPublication/user-profile-publication/user-profile-publication.component';
import { CronogramaComponent } from './components/cronograma/cronograma/cronograma.component';
import {ResultadoFinalService} from './services/resultado-final.service';
import { IndicadoresComponent } from './components/indicadores/indicadores/indicadores.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    SidebarComponent,

    UserProfileComponent,
    UpdateUserDialogComponent,
    UserProfilePublicationComponent,
    CronogramaComponent,
    IndicadoresComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthService, StorageService, AuthGuard, UserService, ResultadoFinalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
