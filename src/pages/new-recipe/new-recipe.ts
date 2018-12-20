import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, ActionSheetController, AlertController, NavParams, ToastController, NavController } from 'ionic-angular';

// Services
import { RecipeProvider } from './../../providers/recipe/recipe';

// Models
import { Recipe } from './../../models/recipe';


@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})
export class NewRecipePage implements OnInit {

  mode = 'New';
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private recipeService: RecipeProvider,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;

    if (value.ingredients.length === 0) {
      this.showMessage('Please, insert at least one Ingredient');
      return;
    }
    // Adiciona um objeto para cada ingrediente dentro do array ingredients,e
    // armazena na propriedade ingredients do objeto value
    value.ingredients = value.ingredients.map((name, amount) => {
      return { name: name, amount: amount === 0 ? 1 : amount };
    });

    console.log(value.ingredients)

    if (this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index, value);
    }
    else {
      this.recipeService.addRecipe(value);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
    this.showMessage(`Recipe ${ this.mode == 'Edit' ? ' edited ' : ' added '} successfuly!`);
  }

  onManageIngredient() {
    this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = formArray.length;

            if (len > 0) {
              /*
                a variável i deve ter o valor de len - 1 pois:
                o método removeAt() remove usando o índice que vai de 0 a 'x'
                enquanto o len vai de 1 a 'x'
              */
              for (let i = len - 1; i >= 0; i--) {
                formArray.removeAt(i);
              }
              this.showMessage('Ingredients removed');
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => console.log('Canceled')
        }
      ]
    }).present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Ingredient Name'
        },
        {
          name: 'amount',
          placeholder: 'Quantity of ingredient',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              this.showMessage('Please, insert a valid name');
              return;
            }

            if(data.amount == 0 || data.amount == null) {
              data.amount = 1;
            }

            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));

            this.showMessage(`${data.name} added successfuly`);
          }
        }
      ]
    });
  }

  private showMessage(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).present();
  }

  private initializeFormArray() {
    let ingredients = [];
    if (this.mode == 'Edit') {
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }
    return ingredients;
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(this.mode == 'Edit' ? this.recipe.title : null, Validators.required),
      'description': new FormControl(this.mode == 'Edit' ? this.recipe.description : null, Validators.required),
      'difficulty': new FormControl(this.mode == 'Edit' ? this.recipe.difficulty : 'Medium', Validators.required),
      'ingredients': new FormArray(this.initializeFormArray())
    });
  }

}
