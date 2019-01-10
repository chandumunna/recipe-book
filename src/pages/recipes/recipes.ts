import { AuthService } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, LoadingController, AlertController, ToastController } from 'ionic-angular';

// Pages
import { NewRecipePage } from './../new-recipe/new-recipe';
import { RecipePage } from './../recipe/recipe';
// PopOver
import { DatabaseOptionsPage } from '../database-options/database-options';

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
  recipeDetailsPage: any = RecipePage;

  recipes: Recipe[];

  constructor(
    private recipeService: RecipeProvider,
    private navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getAll();
  }

  onAddRecipe() {
    this.navCtrl.push(this.newRecipePage, { mode: 'New' });
  }

  onRecipeDetails(recipe: Recipe, index: number) {
    this.navCtrl.push(this.recipeDetailsPage, { recipe: recipe, index: index });
  }

  onShowOptions(event: MouseEvent) {
    const popOver = this.popoverCtrl.create(DatabaseOptionsPage);

    popOver.present({ ev: event });
    popOver.onDidDismiss(data => {

      if (data) {
        switch (data.action) {

          case 'store': {
            const loading = this.loadingCtrl.create({
              content: 'Storing Recipes...'
            });
            loading.present();

            this.authService.getCurrentUser().getIdToken()
              .then(
                (token: string) => {
                  this.recipeService.storeRecipes(token)
                    .subscribe(() => {
                      loading.dismiss();
                      this.toastCtrl.create({
                        message: 'Recipes stored Successfuly',
                        duration: 3000
                      }).present();
                    },
                      err => {
                        loading.dismiss();
                        this.errorHandler(err.error.error);
                      });
                }
              );
            break;
          }
          case 'load': {
            const loading = this.loadingCtrl.create({
              content: 'Loading Recipes...'
            });

            this.authService.getCurrentUser().getIdToken()
              .then((token: string) => {
                this.recipeService.fetchRecipes(token)
                  .subscribe((recipes: Recipe[]) => {
                    if (recipes) {
                      this.recipes = recipes;
                      loading.dismiss();
                    }
                  },
                    err => {
                      loading.dismiss();
                      this.errorHandler(err.error.error);
                    });
              });
            break;
          }

        }
      }
      else {
        console.log('Dismissed');
      }

    });

  }

  private errorHandler(ErrorMessage: string) {
    this.alertCtrl.create({
      message: ErrorMessage,
      title: 'An Error Ocurred!',
      buttons: ['OK']
    }).present();
  }

}
