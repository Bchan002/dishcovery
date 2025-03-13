import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeStore } from '../../componentStore/RecipeStore';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from '../../service/service/RecipeService';


@Component({
  selector: 'app-searched-recipes-details',
  standalone: false,
  templateUrl: './searched-recipes-details.component.html',
  styleUrl: './searched-recipes-details.component.css'
})
export class SearchedRecipesDetailsComponent {

  //Inject 
  private activatedRoute = inject(ActivatedRoute)
  private recipeStore = inject(RecipeStore)
  private recipeSvc = inject(RecipeService)

  constructor(private snackBar: MatSnackBar) {}

  //Subscription
  private recipeDetailsSub!: Subscription
  private saveRecipeDetails!:Subscription

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

   
    this.recipe$ = this.recipeStore.getSearchRecipeById(recipeId)
    
  }

  saveRecipe($event:Recipe){
    const recipe: Recipe = $event
    console.info("Saved ur recipe alr ", recipe.recipeId)

    this.saveRecipeDetails =this.recipeSvc.saveRecipe(recipe).subscribe({
      next: (data)=>{
        console.info("data is sent,", data)
      }
    }
    
    )

    this.snackBar.open('Recipe saved successfully!', 'Close', {
      duration: 3000, // Auto close after 3 seconds
      verticalPosition: 'top', // Can be 'top' or 'bottom'
      horizontalPosition: 'center' // Can be 'start', 'center', 'end'
    });

  }

  ngOnDestroy(): void {
      this.recipeDetailsSub.unsubscribe()
      this.saveRecipeDetails.unsubscribe()
  }


}
