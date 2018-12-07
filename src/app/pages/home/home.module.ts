import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSlideToggleModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { RandomLikerComponent } from './components/random-liker/random-liker.component';
import { RefresherComponent } from './components/refresher/refresher.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './home.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RandomJokesComponent } from './components/random-jokes/random-jokes.component';
import { JokesComponent } from './components/jokes/jokes.component';
import { DataService } from './home.data.service';

@NgModule({
  declarations: [
    HomeComponent,
    RandomLikerComponent,
    RefresherComponent,
    LogoutComponent,
    FavouritesComponent,
    RandomJokesComponent,
    JokesComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [HomeComponent],
  providers: [DataService]
})
export class HomeModule {}
