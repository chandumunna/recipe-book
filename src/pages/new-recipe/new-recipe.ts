import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, ActionSheetController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})
export class NewRecipePage {

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {
  }

  onManageIngredient() {
    this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.alertCtrl.create({
              title: 'Add Ingredient',
              inputs: [
                {
                  name: 'name',
                  placeholder: 'Ingredient Name'
                }
              ],
              buttons: [
                {
                  text: 'Cancel',
                  handler: data => console.log('Canceled')
                },
                {
                  text: 'Add',
                  handler: data => console.log(data)
                }
              ]
            }).present()
          }
        },
        {
          text: 'Remove Ingredient',
          role: 'destructive',
          handler: () => console.log('Removed')
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => console.log('Canceled')
        }
      ]
    }).present()
  }

  onAddRecipe(recipe: NgForm) {
    console.log(recipe.value)
  }

}
