import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor() { }

  onSingIn(form: NgForm){
    console.log(form.value)
  }

}
