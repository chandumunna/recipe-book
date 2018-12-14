import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

// Services
import { ShoppingListProvider } from './../../providers/shopping-list/shopping-list';

// Interfaces
import { Ingredient } from './../../models/ingredient';
import { ThrowStmt } from '@angular/compiler';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[] = [];

  constructor(
    private slService: ShoppingListProvider,
    private alertCtrl: AlertController
    ){}

  ionViewWillEnter(){
    this.loadIngredients();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value);
    form.reset();
    this.loadIngredients();
  }

  removeItem(index: number){
    this.slService.remove(index);
    this.loadIngredients();
  }

  private loadIngredients(){
    this.ingredients = this.slService.getAll();
  }
}
