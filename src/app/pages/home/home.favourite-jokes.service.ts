import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Joke } from './components/jokes/jokes.model';
import { NotificationService } from 'src/app/app.notification.service';
import { jokesMocks } from './components/random-jokes/jokes.mock';

@Injectable()
export class FavouriteJokesService {
  private destroyed = new Subject();
  private jokeUpdatedSubject = new Subject<Joke>();

  constructor(private notificationService: NotificationService) {}

  public updateFavouritesInStorage(jokes: Joke[]) {
    localStorage.setItem('favourite-jokes', JSON.stringify(jokes));
  }

  getFavouriteJokes() {
    const jokes = localStorage.getItem('favourite-jokes');
    let parsedJokes = [];
    try {
      parsedJokes = JSON.parse(jokes);
    } catch (error) {
      this.notificationService.notify(
        'Could not parse favourite jokes list from storage'
      );
    }
    return jokes && Array.isArray(parsedJokes) ? parsedJokes : [];
  }

  getStarChange$() {
    return this.jokeUpdatedSubject.asObservable();
  }

  update(joke: Joke) {
    this.jokeUpdatedSubject.next(joke);
  }

  destroy() {
    this.jokeUpdatedSubject.complete();
    this.destroyed.next();
    this.destroyed.complete();
  }

}
