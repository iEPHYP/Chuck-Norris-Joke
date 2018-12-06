import { Component, OnInit, Input } from '@angular/core';
import { Joke } from './jokes.model';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  @Input() title: string;
  @Input() jokes: Joke[];

  constructor() {}

  ngOnInit() {
  }

}
