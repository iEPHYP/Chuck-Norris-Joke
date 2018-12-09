import { Component, OnInit, OnDestroy } from '@angular/core';
import { Joke } from '../jokes/jokes.model';
import { RandomerService } from '../../home.randomer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FavouriteJokesService } from '../../home.favourite-jokes.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public jokes: Joke[] = [];
  private destroyed = new Subject();

  private jokesLimit = 10;

  constructor(
    private randomerService: RandomerService,
    private favouriteJokesService: FavouriteJokesService
  ) {}

  ngOnInit() {
    this.setupFavouriteSyncing();
    this.setupRandomingTimer();
  }

  setupFavouriteSyncing() {
    this.jokes = this.favouriteJokesService.getFavouriteJokes();

    this.favouriteJokesService
      .getStarChange$()
      .pipe(takeUntil(this.destroyed))
      .subscribe(joke => {
        let listMutated = false;

        const _jokeIndex = this.jokes.findIndex(j => j.id === joke.id);
        const _joke = _jokeIndex >= 0 && this.jokes[_jokeIndex];
        if (!_joke && joke.liked) {
          const iCould = this.addJokeIfYouCan(joke);
          listMutated = true;
          if (!iCould) {
            joke.liked = false;
            this.update(joke);
            listMutated = false;
          }
        } else if (_joke && !joke.liked) {
          this.jokes.splice(_jokeIndex, 1);
          listMutated = true;
        }

        listMutated &&
          this.favouriteJokesService.updateFavouritesInStorage(this.jokes);
        // this is for the case when prop jokes is map
      });
  }

  setupRandomingTimer() {
    this.randomerService
      .getRandomJoke$()
      .pipe(takeUntil(this.destroyed))
      .subscribe(joke => {
        joke && this.update(joke);
      });
  }

  update(joke: Joke) {
    this.favouriteJokesService.update(joke);
  }

  addJokeIfYouCan(joke: Joke) {
    return this.jokes.length < this.jokesLimit && this.jokes.push(joke);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
