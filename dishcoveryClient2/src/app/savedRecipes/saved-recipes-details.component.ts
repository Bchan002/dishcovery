import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeStore } from '../componentStore/RecipeStore';
import { RecipeService } from '../service/RecipeService';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from '../model/models';

@Component({
  selector: 'app-saved-recipes-details',
  standalone: false,
  templateUrl: './saved-recipes-details.component.html',
  styleUrl: './saved-recipes-details.component.css'
})
export class SavedRecipesDetailsComponent {
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


    this.recipe$ = this.recipeStore.getFilterSavedRecipeById(recipeId)

  }
}
