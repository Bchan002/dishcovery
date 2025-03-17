import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RecipeStore } from '../componentStore/RecipeStore';
import { RecipeService } from '../service/RecipeService';
import { Router } from '@angular/router';
import { Recipe } from '../model/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-recipes',
  standalone: false,
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }
  private recipeStore = inject(RecipeStore)
  private recipeSvc = inject(RecipeService)
  private router = inject(Router)

  protected savedRecipe$!: Observable<Recipe[]>
  protected recipeSub!: Subscription


  ngOnInit(): void {
    // Set up the observable once
    this.savedRecipe$ = this.recipeStore.getSavedRecipes;

    // Trigger initial data load
    this.loadRecipe();

    // Listen for navigation events
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   console.log("🔄 Navigation detected, reloading recipes");
    //   this.loadRecipe();
    // });
  }


  ngOnActivate() {
    console.log("Component activated, fetching new data");
    this.loadRecipe();
  }

  // loadRecipe(): void {
  //   this.recipeStore.fetchSavedRecipe();
  // }

  loadRecipe(): void {
    console.log("📥 Triggering recipe fetch");
    // Call the effect properly to trigger the API call
    this.recipeStore.fetchSavedRecipe();
  }

  deleteRecipe($event: Event, $recipeId: number): void {


    console.info("Deleting recipeId ", $recipeId)
    // Prevent the click from triggering the router link
    $event.stopPropagation();
    $event.preventDefault();

    // Confirm deletion if needed
    if (confirm('Are you sure you want to remove this recipe?')) {
      // Call your service to delete the recipe
      this.recipeSvc.deleteRecipe($recipeId).subscribe({
        next: () => {
          // Show success message if needed
          console.log('Recipe deleted successfully');

          // Refresh data from server or update store directly
          this.loadRecipe();
        },
        error: (error) => {
          console.error('Error deleting recipe:', error);
        }
      });
    }
  }
}
