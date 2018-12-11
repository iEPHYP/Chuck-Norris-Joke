import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Joke } from './jokes.model';
import { FastMap } from 'src/app/shared/fast-map';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent {
  @Input() title: string;
  @Input() jokes: FastMap<Joke>;
  @Input() loading: boolean = true;
  @Output() likeChange = new EventEmitter<Joke>();

  constructor() {}

  update(joke: Joke) {
    joke.liked = !joke.liked;
    this.likeChange.emit(joke);
  }

}
