import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
import { ShoppingListProvider } from '../providers/shopping-list/shopping-list';
import { RecipeProvider } from '../providers/recipe/recipe';

// Signin/Signup
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    NewRecipePage,
    RecipePage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListProvider,
    RecipeProvider
  ]
})
export class AppModule {}
