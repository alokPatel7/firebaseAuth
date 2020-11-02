import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { EmailAuthComponent } from './auth/email-auth/email-auth.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, LandingComponent, EmailAuthComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
