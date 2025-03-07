import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './authenticationComponent/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './authenticationComponent/signUp/sign-up.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { SignUpSuccessComponent } from './authenticationComponent/signUp/sign-up-success.component';
import { UserService } from './UserService';
import { hasSaved, isAuthenticated } from './RouteGuards';

import { DashBoardService } from './service/DashboardService';
import { authInterceptor } from './AuthInterceptor';
import { ForgetPasswordComponent } from './authenticationComponent/forgetPassword/forget-password.component';
import { LayoutComponentComponent } from './layoutComponent/layout-component.component';

import { MaterialModule } from './MaterialModule';
import { CommonModule } from '@angular/common';
import { CustomSidenavComponent } from './layoutComponent/custom-sidenav.component';
import { RecipeComponent } from './pages/recipe.component';
import { DashboardComponent } from './pages/dashboard.component';


const appRoutes: Routes = [

  {path: '', component: LoginComponent}, 
  {path: 'signUp', component:SignUpComponent, canDeactivate: [hasSaved]},
  {path: 'signUpSuccess', component:SignUpSuccessComponent},
  {path:'forgetPassword', component:ForgetPasswordComponent},
  {path:'dashboard',component:LayoutComponentComponent, 
    canActivate:[isAuthenticated],
    children: [
      {path:'recipe', component:RecipeComponent},
      {path:'dashboard', component:DashboardComponent}
    ]
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
    ForgetPasswordComponent,
    LayoutComponentComponent,
    CustomSidenavComponent,
    RecipeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,ReactiveFormsModule, RouterModule.forRoot(appRoutes), MaterialModule, CommonModule
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor])), UserService, DashBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
