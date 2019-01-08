import { SLOptionsPage } from './../pages/shopping-list/sl-options/sl-options';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';


// Tabs
import { TabsPage } from './../pages/tabs/tabs';

/* PAGES */
// Shopping List
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';

// Recipes
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { NewRecipePage } from './../pages/new-recipe/new-recipe';

// Signin/Signup
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';

/* SERVICES */
import { AuthService } from './../providers/auth/auth';
import { ShoppingListProvider } from '../providers/shopping-list/shopping-list';
import { RecipeProvider } from '../providers/recipe/recipe';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    NewRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
    SLOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    NewRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
    SLOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListProvider,
    RecipeProvider,
    AuthService
  ]
})
export class AppModule {}
