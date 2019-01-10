import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Firebase
import FireBase from 'firebase';

// Services
import { AuthService } from './../providers/auth/auth';

// RootPages
import { TabsPage } from './../pages/tabs/tabs';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;
  isLoged: boolean = false;

  @ViewChild('main') navCtrl: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    // Initialize FireBase
    FireBase.initializeApp({
      apiKey: "AIzaSyCt7FbWKNx51CyYKYvXd10MNdJJZ0k70XE",
      authDomain: "ionic3-recipebook-fd83f.firebaseapp.com"
    });

    FireBase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLoged = true;
        this.rootPage = TabsPage;
      }
      else {
        this.isLoged = false;
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if (platform.is('cordova')) {
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }

  onLoad(page) {
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.singout();
    this.menuCtrl.close();
    this.navCtrl.setRoot(SigninPage);
  }
}

