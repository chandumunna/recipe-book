import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// Interfaces
import { Recipe } from '../../models/recipe';

// Services
import { AuthService } from './../auth/auth';


@Injectable()
export class RecipeProvider {

  private recipes: Recipe[] = [];
  private dbAddress = 'https://ionic3-recipebook-fd83f.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    console.log(this.recipes);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeRecipes(token: string) {
    const userId = this.authService.getCurrentUser().uid;

    // Arruma o erro de enviar receita sem ingredientes
    // porém minha versão precisa de ingredientes para funcionar

    // for (let item of this.recipes) {
    //   if(!item.hasOwnProperty('ingredients')) {
    //     item.ingredients = [];
    //   }
    // }

    return this.http
      .put(this.dbAddress
        + userId
        + '/recipes.json?auth='
        + token, this.recipes);
  }

  fetchRecipes(token: string) {
    const userId = this.authService.getCurrentUser().uid;

    return this.http
      .get<Recipe[]>(this.dbAddress
        + userId
        + '/recipes.json?auth='
        + token)
      .pipe(
        map((recipes: Recipe[]) => {
          this.recipes = recipes;
          return recipes;
        })
      );
  }

}
