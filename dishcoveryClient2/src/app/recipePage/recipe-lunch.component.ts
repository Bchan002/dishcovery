import { Component, inject, OnInit } from '@angular/core';
import { RecipeStore } from '../componentStore/RecipeStore';
import { Observable } from 'rxjs';
import { Recipe } from '../model/models';

@Component({
  selector: 'app-recipe-lunch',
  standalone: false,
  templateUrl: './recipe-lunch.component.html',
  styleUrl: './recipe-lunch.component.css'
})
export class RecipeLunchComponent implements OnInit {

   //Set this as lunch section 
   private state: string = "lunch"

   //Inject store 
   private recipeStore = inject(RecipeStore)
 
   //Variable 
   protected lunchRecipe$!: Observable<Recipe[]>
 
   ngOnInit(): void {
 
     //this.recipeStore.filterRecipes(this.state)
 
     this.lunchRecipe$ = this.recipeStore.getFilterRecipe(this.state)
 
   }
} 
