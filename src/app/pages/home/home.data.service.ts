import { Injectable } from '@angular/core';
import { JokesData } from './jokes-data.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  startWith,
  takeUntil,
  debounceTime,
  switchMap,
  map
} from 'rxjs/operators';
import { Joke } from './components/jokes/jokes.model';
import { FastMap } from 'src/app/shared/fast-map';

@Injectable()
export class DataService {
  private apiUrl = 'http://api.icndb.com/jokes/random/10';
  private getDataSubject = new Subject<Joke[]>();
  private destroyed = new Subject();
  private onRefreshClickSubject = new Subject();
  private favouriteJokes: FastMap<Joke>;

  constructor(private http: HttpClient) {}

  addRefresher(refreshClick$: Observable<any>) {
    refreshClick$
      .pipe(
        startWith('emit click for first data load'),
        debounceTime(250),
        switchMap(() => this.http.get<JokesData>(this.apiUrl)),
        map(data => {
          const jokes = data && Array.isArray(data.value) ? data.value : [];
          jokes.forEach(joke => {
            const fJoke = this.favouriteJokes.read(joke.id); // O(1)
            fJoke && (joke.liked = fJoke.liked);
          });
          return jokes;
        }),
        takeUntil(this.destroyed)
      )
      .subscribe(jokes => {
        this.getDataSubject.next(jokes);
      });

    refreshClick$
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.onRefreshClickSubject.next());
  }

  getRandomJokes(): Observable<Joke[]> {
    return this.getDataSubject.asObservable();
  }

  getRefresher$(): Observable<any> {
    return this.onRefreshClickSubject.asObservable();
  }

  provideFavourites(jokes: FastMap<Joke>) {
    this.favouriteJokes = jokes;
  }

  destroy() {
    this.destroyed.next();
  }
}
