import { Component, OnInit, OnDestroy } from '@angular/core';
import { Joke } from '../jokes/jokes.model';
import { RandomerService } from '../../home.randomer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public jokes: Joke[] = [];
  private destroyed = new Subject();

  constructor(private randomerService: RandomerService) {}

  ngOnInit() {
    this.randomerService
      .getRandomJoke$(this.jokes)
      .pipe(takeUntil(this.destroyed))
      .subscribe(joke => {
        joke && this.jokes.push(joke);
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
