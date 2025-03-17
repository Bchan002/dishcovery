import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecipeStore } from '../componentStore/RecipeStore';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

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
