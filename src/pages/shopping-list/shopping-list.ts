import { Component } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
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
    private auhtService: AuthService
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

  onShowOptions(event: MouseEvent) {
    const popOver = this.popoverCtrl.create(SLOptionsPage);

    popOver.present({ev: event});
    popOver.onDidDismiss(data => {
      if (data.action == 'store') {
        this.auhtService.getCurrentUser().getIdToken()
          .then(
            (token: string) => {
              this.slService.storeList(token)
                .subscribe(() => console.log('Success!'), err => console.log(err));
            }
          )
          .catch();
      }
      else {

      }
    });
  }

  private loadIngredients(){
    this.ingredients = this.slService.getAll();
  }
}
