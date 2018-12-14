import { Injectable } from '@angular/core';

// Models
import { Recipe } from '../../models/recipe';


@Injectable()
export class RecipeProvider {

  private recipes: Recipe[] = [];

  getAll(){
    return this.recipes.slice();
  }

  addItem(recipe: Recipe){
    this.recipes.push(recipe);
  }

}
