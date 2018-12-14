import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Pages
import { NewRecipePage } from './../new-recipe/new-recipe';

// Models
import { Recipe } from '../../models/recipe';

// Services
import { RecipeProvider } from '../../providers/recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  newRecipePage: any = NewRecipePage;

  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeProvider,
    private navCtrl: NavController
  ) {
  }

  ionViewWillEnter(){
    this.recipes = this.recipeService.getAll();
  }

  onAddRecipe(){
    this.navCtrl.push(this.newRecipePage,{mode: 'New'});
  }

}
