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
import { RecipeComponent } from './pages/recipePage/recipe.component';
import { DashboardComponent } from './pages/dashboardPage/dashboard.component';
import { RecipeService } from './service/service/RecipeService';
import { RecipeDetailsComponent } from './pages/recipePage/recipe-details.component';
import { ComponentStore } from '@ngrx/component-store';
import { RecipeStore } from './componentStore/RecipeStore';
import { MenuItemComponent } from './layoutComponent/menu-item.component';
import { RecipeBreakfastComponent } from './pages/recipePage/recipe-breakfast.component';
import { RecipeLunchComponent } from './pages/recipePage/recipe-lunch.component';
import { RecipeDinnerComponent } from './pages/recipePage/recipe-dinner.component';
import { SearchedRecipesComponent } from './pages/recipePage/searched-recipes.component';
import { SearchedRecipesDetailsComponent } from './pages/recipePage/searched-recipes-details.component';
import { SavedRecipesComponent } from './pages/dashboardPage/saved-recipes.component';
import { SavedRecipesDetailsComponent } from './pages/dashboardPage/saved-recipes-details.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { NotificationService } from './service/NotificationService';

 


const appRoutes: Routes = [

  {path: '', component: LoginComponent}, 
  {path: 'signUp', component:SignUpComponent, canDeactivate: [hasSaved]},
  {path: 'signUpSuccess', component:SignUpSuccessComponent},
  {path:'forgetPassword', component:ForgetPasswordComponent},
  {path:'dashboard',component:LayoutComponentComponent, 
    canActivate:[isAuthenticated],
    children: [
      {path:'recipe', component:RecipeComponent},
      {path:'searchRecipe',component:SearchedRecipesComponent},
      {path:'searchRecipeDetails/:id',component:SearchedRecipesDetailsComponent},
      {path:'savedRecipes',component:SavedRecipesComponent},
      {path:'savedRecipeDetails/:id',component:SavedRecipesDetailsComponent},
      {path:'recipe/:id', component:RecipeDetailsComponent},
      {path:'breakfast', component:RecipeBreakfastComponent},
      {path:'lunch', component:RecipeLunchComponent},
      {path:'dinner', component:RecipeDinnerComponent},
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
    DashboardComponent,
    RecipeDetailsComponent,
    MenuItemComponent,
    RecipeBreakfastComponent,
    RecipeLunchComponent,
    RecipeDinnerComponent,
    SearchedRecipesComponent,
    SearchedRecipesDetailsComponent,
    SavedRecipesComponent,
    SavedRecipesDetailsComponent,
    
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,ReactiveFormsModule, RouterModule.forRoot(appRoutes,  {useHash: true}), 
    MaterialModule, CommonModule, AngularFireModule.initializeApp(environment), AngularFireMessagingModule
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor])), UserService, DashBoardService,
   RecipeService,ComponentStore, RecipeStore, NotificationService,provideFirebaseApp( () => initializeApp(environment)),
  provideMessaging(() => getMessaging())],
  bootstrap: [AppComponent]
})
export class AppModule { }
