import { Component, OnInit, OnDestroy } from '@angular/core';
import { Joke } from '../jokes/jokes.model';
// import { jokesMocks } from './jokes.mock';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../home.data.service';

@Component({
  selector: 'app-random-jokes',
  templateUrl: './random-jokes.component.html',
  styleUrls: ['./random-jokes.component.scss']
})
export class RandomJokesComponent implements OnInit, OnDestroy {
  public jokes: Joke[] = [];
  public loading: boolean = true;
  public destroyed = new Subject();

  constructor(private service: DataService) {}

  ngOnInit() {
    this.service
      .getRefresher$()
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.loading = true;
      });

    this.service
      .getRandomJokes()
      .pipe(takeUntil(this.destroyed))
      .subscribe(data => {
        this.jokes = data.value;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
