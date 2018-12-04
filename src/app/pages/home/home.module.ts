import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSlideToggleModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';

import { RandomLikerComponent } from './components/random-liker/random-liker.component';
import { RefresherComponent } from './components/refresher/refresher.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './home.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RandomJokesComponent } from './components/random-jokes/random-jokes.component';

@NgModule({
  declarations: [
    HomeComponent,
    RandomLikerComponent,
    RefresherComponent,
    LogoutComponent,
    FavouritesComponent,
    RandomJokesComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule {}
