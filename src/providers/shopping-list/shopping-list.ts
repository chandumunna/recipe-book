import { Injectable } from '@angular/core';

// Interfaces
import { Ingredient } from './../../models/ingredient';


@Injectable()
export class ShoppingListProvider {

  private ingredients: Ingredient[] = [];

  getAll() {
    return this.ingredients.slice();
  }

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addItems(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  remove(index: number) {
    this.ingredients.splice(index, 1);
  }


}
