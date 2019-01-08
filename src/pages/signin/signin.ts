import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController } from 'ionic-angular';

// Services
import { AuthService } from './../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  onSingIn(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Singin In...'
    });
    loading.present();

    this.authService.singin(form.value.email, form.value.password)
      .then(data => {
        // console.log('Token:', data.user.uid); TOKEN DO USUÁRIO
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Singin Denied!',
          message: err.message,
          buttons: ['Ok']
        }).present();
      });
  }

}
