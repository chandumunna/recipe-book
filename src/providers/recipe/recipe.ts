import { Injectable } from '@angular/core';

// Models
import { Recipe } from '../../models/recipe';


@Injectable()
export class RecipeProvider {

  private recipes: Recipe[] = [];

  getAll(){
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    console.log(this.recipes);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

}
