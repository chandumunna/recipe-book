import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

// PopOver
import { SLOptionsPage } from './sl-options/sl-options';

// Services
import { ShoppingListProvider } from './../../providers/shopping-list/shopping-list';
import { AuthService } from './../../providers/auth/auth';

// Interfaces
import { Ingredient } from './../../models/ingredient';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[] = [];

  constructor(
    private slService: ShoppingListProvider,
    private popoverCtrl: PopoverController,
    private auhtService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.loadIngredients();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value);
    form.reset();
    this.loadIngredients();
  }

  removeItem(index: number) {
    this.slService.remove(index);
    this.loadIngredients();
  }

  onShowOptions(event: MouseEvent) {
    const popOver = this.popoverCtrl.create(SLOptionsPage);

    popOver.present({ ev: event });
    popOver.onDidDismiss(data => {

      if (data) {
        switch (data.action) {

          case 'store': {
            const loading = this.loadingCtrl.create({
              content: 'Storing List...'
            });
            loading.present();

            this.auhtService.getCurrentUser().getIdToken()
              .then(
                (token: string) => {
                  this.slService.storeList(token)
                    .subscribe(() => {
                      loading.dismiss();
                      this.toastCtrl.create({
                        message: 'List stored Successfuly',
                        duration: 3000
                      }).present();
                    },
                      err => {
                        loading.dismiss();
                        this.errorHandler(err.error.error);
                      }
                    );
                }
              );
            break;
          }
          case 'load': {
            const loading = this.loadingCtrl.create({
              content: 'Loading List...'
            });

            this.auhtService.getCurrentUser().getIdToken()
              .then((token: string) => {
                this.slService.fetchList(token)
                  .subscribe((list: Ingredient[]) => {
                    if (list) {
                      this.ingredients = list;
                      this.loadIngredients();
                      loading.dismiss();
                    }
                  }, err => {
                    loading.dismiss();
                    this.errorHandler(err.error.error);
                  })
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

  private loadIngredients() {
    this.ingredients = this.slService.getAll();
  }
}
