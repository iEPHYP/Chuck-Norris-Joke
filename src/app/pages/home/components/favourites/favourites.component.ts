import { Component, OnInit, OnDestroy } from '@angular/core';
import { Joke } from '../jokes/jokes.model';
import { RandomerService } from '../../home.randomer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FavouriteJokesService } from '../../home.favourite-jokes.service';
import { DataService } from '../../home.data.service';
import { FastMap } from 'src/app/shared/fast-map';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public jokes = new FastMap<Joke>();
  private destroyed = new Subject();

  private jokesLimit = 10;

  constructor(
    private randomerService: RandomerService,
    private favouriteJokesService: FavouriteJokesService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.setupFavouriteSyncing();
    this.dataService.provideFavourites(this.jokes);
    this.setupRandomingTimer();
  }

  setupFavouriteSyncing() {
    this.jokes = new FastMap(this.favouriteJokesService.getFavouriteJokes());

    this.favouriteJokesService
      .getStarChange$()
      .pipe(takeUntil(this.destroyed))
      .subscribe(joke => {
        let listMutated = false;

        const _joke = this.jokes.read(joke.id);
        if (!_joke && joke.liked) {
          const iCould = this.addJokeIfYouCan(joke);
          listMutated = true;
          if (!iCould) {
            joke.liked = false;
            this.update(joke);
            listMutated = false;
          }
        } else if (_joke && !joke.liked) {
          this.jokes.remove(joke.id);
          listMutated = true;
        }

        listMutated &&
          this.favouriteJokesService.updateFavouritesInStorage(
            this.jokes.values()
          );
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

  addJokeIfYouCan(joke: Joke): boolean {
    return this.jokes.length < this.jokesLimit && !!this.jokes.insert(joke);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
