import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController, ToastController, AlertController } from 'ionic-angular';

// Services
import { ShoppingListProvider } from './../../providers/shopping-list/shopping-list';
import { RecipeProvider } from './../../providers/recipe/recipe';

// Models
import { Recipe } from './../../models/recipe';

// Pages
import { NewRecipePage } from './../new-recipe/new-recipe';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  newRecipePage = NewRecipePage;

  recipe: Recipe;
  index: number;

  constructor(
    private navParams: NavParams,
    private shoppingListService: ShoppingListProvider,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private recipeService: RecipeProvider
  ) { }

  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  addIngredientsToShoppingList() {
    this.shoppingListService
      .addItems(this.recipe.ingredients);
    this.showToast('Ingredients added to Shopping List');
  }

  updateRecipe() {
    this.navCtrl.push(this.newRecipePage, {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.index
    });
  }

  removeRecipe(){
    this.checkRemove();
  }

  private checkRemove(){
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Want to delete this recipe?',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.recipeService.removeRecipe(this.index);
            this.showToast('Recipe Deleted');
            this.navCtrl.popToRoot();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).present();
  }

  private showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).present();
  }
}
