import { Injectable } from '@angular/core';
import { JokesData } from './jokes-data.model';
import { Subject, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntil, switchMap, filter } from 'rxjs/operators';
import { Joke } from './components/jokes/jokes.model';

@Injectable()
export class RandomerService {
  private apiUrl = 'http://api.icndb.com/jokes/random/1';
  private timerPeriod = 1000;
  private getRandomJokeSubject = new Subject<Joke>();
  private timerStoppedSubject = new Subject();

  constructor(private http: HttpClient) {}

  startTimer() {
    interval(this.timerPeriod)
      .pipe(
        takeUntil(this.timerStoppedSubject),
        switchMap(() => this.http.get<JokesData>(this.apiUrl))
      )
      .subscribe(data => {
        const joke = data && data.value && data.value.length && data.value[0];
        joke && (joke.liked = true);
        this.getRandomJokeSubject.next(joke);
      });
  }

  stopTimer() {
    this.timerStoppedSubject.next();
  }

  getRandomJoke$() {
    return this.getRandomJokeSubject.asObservable();
  }

  destroy() {
    this.timerStoppedSubject.next();
    this.timerStoppedSubject.complete();
    this.getRandomJokeSubject.complete();
  }
}
