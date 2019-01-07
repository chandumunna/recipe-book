import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';

// Services
import { AuthService } from './../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  onSignUp(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Singing Up...'
    });
    loading.present();

    this.authService.singup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Singup Failed!',
          message: err.message,
          buttons: [
            'OK'
          ]
        }).present();
      });
  }

}
