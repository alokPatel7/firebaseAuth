import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailAuthComponent } from './auth/email-auth/email-auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'contact', component: SignupComponent },
  { path: '', component: LandingComponent },
  { path: 'email', component: EmailAuthComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
