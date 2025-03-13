import { Component, inject, OnInit } from '@angular/core';
import { RecipeStore } from '../../componentStore/RecipeStore';
import { Observable, of } from 'rxjs';
import { Recipe, SearchRecipe } from '../../models';
import { RecipeService } from '../../service/service/RecipeService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searched-recipes',
  standalone: false,
  templateUrl: './searched-recipes.component.html',
  styleUrl: './searched-recipes.component.css'
})
export class SearchedRecipesComponent implements OnInit {

  searchedRecipe$!: Observable<any[]>; 
  errorMessage$!: Observable<string>;
  isLoading: boolean = false; // Track loading state

  constructor(private recipeStore: RecipeStore) {}

  ngOnInit(): void {

    
      this.loadLatestRecipes();
     

  }

  private loadLatestRecipes() {
      const savedRecipes = localStorage.getItem("searchedRecipes");
      
      //Reset Error Message 
      this.recipeStore.removeErrorMessage()

      if (savedRecipes) {
          console.info("Loading recipes from LocalStorage...");
          this.searchedRecipe$ = of(JSON.parse(savedRecipes)); // Load from LocalStorage
          this.recipeStore.removeErrorMessage()
          
      } else {
          this.isLoading = true; 
          this.searchedRecipe$ = this.recipeStore.getSearchedRecipes;

         
      }

      this.errorMessage$ = this.recipeStore.getErrorMessage
  }

  
}
