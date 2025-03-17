import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ComponentStore } from '@ngrx/component-store';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './service/UserService';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './utils/AuthInterceptor';
import { LoginComponent } from './components/loginComponent/login.component';
import { SignUpComponent } from './components/signUpComponent/sign-up.component';
import { hasSaved, isAuthenticated } from './utils/RouteGuards';
import { ForgotPasswordComponent } from './components/forgotPasswordComponent/forgot-password.component';
import { NavbarComponent } from './nav/navbar.component';
import { MainLayoutComponent } from './layout/main-layout.component';

import { RecipeBreakfastComponent } from './recipePage/recipe-breakfast.component';
import { SignUpSuccessComponent } from './components/signUpComponent/sign-up-success.component';
import { RecipeService } from './service/RecipeService';
import { RecipeStore } from './componentStore/RecipeStore';
import { RecipeLunchComponent } from './recipePage/recipe-lunch.component';
import { RecipeDinnerComponent } from './recipePage/recipe-dinner.component';
import { RecipeDetailsComponent } from './recipePage/recipe-details.component';
import { SearchRecipesComponent } from './recipePage/search-recipes.component';
import { SearchResultsComponent } from './recipePage/search-results.component';
import { SearchRecipeDetailsComponent } from './recipePage/search-recipe-details.component';
import { SavedRecipesComponent } from './savedRecipes/saved-recipes.component';
import { SavedRecipesDetailsComponent } from './savedRecipes/saved-recipes-details.component';
import { GroceryService } from './service/GroceryService';
import { AddGroceryComponent } from './grocery/add-grocery.component';
import { GroceryStore } from './componentStore/GroceryStore';
import { SavedGroceryComponent } from './grocery/saved-grocery.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { NotificationService } from './service/NotificationService';

const appRoutes: Routes = [

  {path:'', component:LoginComponent}, 
  {path: 'signUp', component:SignUpComponent, canDeactivate: [hasSaved]},
  {path: 'signUpSuccess', component:SignUpSuccessComponent},
  {path: 'forgotPassword', component:ForgotPasswordComponent},
  {path: 'layout', component:MainLayoutComponent, 
    canActivate: [isAuthenticated],
    children: [
      {path: 'recipeBreakfast', component:RecipeBreakfastComponent}, 
      {path: 'recipeLunch', component:RecipeLunchComponent}, 
      {path: 'recipeDinner', component:RecipeDinnerComponent}, 
      {path:  'recipe/:id', component:RecipeDetailsComponent}, 
      {path: 'searchRecipe', component:SearchRecipesComponent}, 
      {path: 'searchResults', component:SearchResultsComponent}, 
      {path: 'searchRecipeDetails/:id', component:SearchRecipeDetailsComponent}, 
      {path: 'savedRecipes', component:SavedRecipesComponent}, 
      {path: 'savedRecipeDetails/:id', component:SavedRecipesDetailsComponent}, 
      {path: 'addGrocery', component:AddGroceryComponent}, 
      {path: 'groceryStore', component:SavedGroceryComponent}
    ]

   },




  {path:'**', redirectTo:'/',pathMatch:'full'}




]



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    NavbarComponent,
    MainLayoutComponent,
    RecipeBreakfastComponent,
    SignUpSuccessComponent,
    RecipeLunchComponent,
    RecipeDinnerComponent,
    RecipeDetailsComponent,
    SearchRecipesComponent,
    SearchResultsComponent,
    SearchRecipeDetailsComponent,
    SavedRecipesComponent,
    SavedRecipesDetailsComponent,
    AddGroceryComponent,
    SavedGroceryComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, MaterialModule, LayoutModule,RouterModule.forRoot(appRoutes, { useHash: true }), 
    AngularFireModule.initializeApp(environment), AngularFireMessagingModule
],
  providers: [UserService, RecipeService, GroceryService,NotificationService, RecipeStore, GroceryStore, ComponentStore, 
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideFirebaseApp( () => initializeApp(environment)),  provideMessaging(() => getMessaging()),],
  bootstrap: [AppComponent]
})
export class AppModule { }
