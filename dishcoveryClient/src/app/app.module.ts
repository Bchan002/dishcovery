import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './authenticationComponent/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './authenticationComponent/signUp/sign-up.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { SignUpSuccessComponent } from './authenticationComponent/signUp/sign-up-success.component';
import { UserService } from './UserService';
import { DashboardComponent } from './dashboard/dashboard.component';
import { hasSaved, isAuthenticated } from './RouteGuards';

import { DashBoardService } from './service/DashboardService';
import { authInterceptor } from './AuthInterceptor';
import { ForgetPasswordComponent } from './authenticationComponent/forgetPassword/forget-password.component';


const appRoutes: Routes = [

  {path: '', component: LoginComponent}, 
  {path: 'signUp', component:SignUpComponent, canDeactivate: [hasSaved]},
  {path: 'signUpSuccess', component:SignUpSuccessComponent},
  {path:'forgetPassword', component:ForgetPasswordComponent},
  {path:'dashboard',component:DashboardComponent, 
    canActivate:[isAuthenticated]
  },

   // wild card must be the last route
   { path: '**', redirectTo: '/', pathMatch: 'full'}
  
]



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SignUpSuccessComponent,
    DashboardComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor])), UserService, DashBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
