import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

// Pages
import { RecipesPage } from './../recipes/recipes';
import { ShoppingListPage } from './../shopping-list/shopping-list';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  shoppingListPage = ShoppingListPage
  recipesPage= RecipesPage


  constructor(public navCtrl: NavController) {}

}
