import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RecipeService } from '../../service/service/RecipeService';
import { RecipeStore } from '../../componentStore/RecipeStore';
import { Recipe } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-details',
  standalone: false,
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  constructor(private snackBar: MatSnackBar) { }

  //Inject 
  private activatedRoute = inject(ActivatedRoute)
  private recipeStore = inject(RecipeStore)
  private recipeSvc = inject(RecipeService)

  //Subscription
  private recipeDetailsSub!: Subscription
  private saveRecipeDetailsSub!: Subscription

  protected recipe$!: Observable<Recipe>

  ngOnInit(): void {

    //Subscribe to the activated Route 
    this.recipeDetailsSub = this.activatedRoute.params.subscribe({
      next: (id) => {
        console.info("This is your recipeId ", id);
        const recipeId = id["id"]
        //Find the specific recipe
        localStorage.setItem("recipeId", recipeId)
      }
    })

    const recipeId = localStorage.getItem("recipeId")
    console.info("Your recipe Id is ", recipeId)


    this.recipe$ = this.recipeStore.getFilterRecipeById(recipeId)

  }

  saveRecipe($event: Recipe) {

    const recipe: Recipe = $event
    console.info("Saved ur recipe alr ", recipe.recipeId)

    this.saveRecipeDetailsSub = this.recipeSvc.saveRecipe(recipe).subscribe({
      next: (data) => {
        console.info("data is sent,", data)
      },
      error: (err) => {
        console.error("Error saving recipe:", err);
      }
    })

    this.snackBar.open('Recipe saved successfully!', 'Close', {
      duration: 3000,  
      verticalPosition: 'top',  
      horizontalPosition: 'center'  
    });

  }

  ngOnDestroy(): void {
    if (this.recipeDetailsSub && this.saveRecipeDetailsSub) {  
      this.recipeDetailsSub.unsubscribe()
      this.saveRecipeDetailsSub.unsubscribe()
    }
  }
  



}
