import { Component, OnInit } from '@angular/core';
import { RandomerService } from '../../home.randomer.service';

@Component({
  selector: 'app-random-liker',
  templateUrl: './random-liker.component.html',
  styleUrls: ['./random-liker.component.scss']
})
export class RandomLikerComponent {

  public on = false;

  constructor(private service: RandomerService) { }

  timerClicked() {
    this.on = !this.on;
    this.on ? this.service.startTimer() : this.service.stopTimer();
  }

}
