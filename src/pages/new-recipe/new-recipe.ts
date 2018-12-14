import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, ActionSheetController, AlertController, NavParams } from 'ionic-angular';

// Services
import { RecipeProvider } from './../../providers/recipe/recipe';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';


@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})
export class NewRecipePage implements OnInit {

  mode = 'New';
  recipeForm: FormGroup;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private recipeService: RecipeProvider,
    private navParams: NavParams
  ) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit(){

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

  private initializeForm(){
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required)
    });
  }

}
