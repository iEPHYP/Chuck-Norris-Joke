import { Component, OnInit, OnDestroy } from '@angular/core';
import { Joke } from '../jokes/jokes.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../home.data.service';
import { FavouriteJokesService } from '../../home.favourite-jokes.service';
import { FastMap } from 'src/app/shared/fast-map';

@Component({
  selector: 'app-random-jokes',
  templateUrl: './random-jokes.component.html',
  styleUrls: ['./random-jokes.component.scss']
})
export class RandomJokesComponent implements OnInit, OnDestroy {
  public jokes = new FastMap<Joke>();
  public loading: boolean = true;
  public destroyed = new Subject();

  constructor(
    private dataService: DataService,
    private favouriteJokesService: FavouriteJokesService
  ) {}

  ngOnInit() {
    this.setupDataFetch();
    this.setupFavouriteSyncing();
  }

  setupDataFetch() {
    this.dataService
      .getRefresher$()
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.loading = true;
      });

    this.dataService
      .getRandomJokes()
      .pipe(takeUntil(this.destroyed))
      .subscribe(jokes => {
        this.jokes = new FastMap(jokes);
        this.loading = false;
      });
  }

  setupFavouriteSyncing() {
    this.favouriteJokesService
      .getStarChange$()
      .pipe(takeUntil(this.destroyed))
      .subscribe(joke => {
        const _joke = this.jokes.read(joke.id);
        _joke && (_joke.liked = joke.liked);
      });
  }

  update(joke: Joke) {
    this.favouriteJokesService.update(joke);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
