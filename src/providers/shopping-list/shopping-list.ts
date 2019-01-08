import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Services
import { AuthService } from './../auth/auth';

// Interfaces
import { Ingredient } from './../../models/ingredient';


@Injectable()
export class ShoppingListProvider {

  private ingredients: Ingredient[] = [];
  private dbAddress = 'https://ionic3-recipebook-fd83f.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}

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

  storeList(token: string) {
    const userId = this.authService.getCurrentUser().uid;

    return this.http
      .put(this.dbAddress
        + userId
        + '/shopping-list.json?auth='
        + token, this.ingredients);
  }

}
