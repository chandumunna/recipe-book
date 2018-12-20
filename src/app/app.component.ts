import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Firebase
import FireBase from 'firebase';

// RootPages
import { TabsPage } from './../pages/tabs/tabs';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  tabsPage: any = TabsPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;

  @ViewChild('main') navCtrl: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController
  ) {
    // Initialize FireBase
    FireBase.initializeApp({
      apiKey: "AIzaSyCt7FbWKNx51CyYKYvXd10MNdJJZ0k70XE",
      authDomain: "ionic3-recipebook-fd83f.firebaseapp.com"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page) {
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {

  }
}

