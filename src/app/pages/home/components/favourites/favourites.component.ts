import { Component, OnInit } from '@angular/core';
import { Joke } from '../jokes/jokes.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public jokes: Joke[] = [];

  constructor() { }

  ngOnInit() {
  }

}
