import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../home.data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss']
})
export class RefresherComponent implements OnInit, OnDestroy {
  private subject = new Subject();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.addRefresher(this.subject.asObservable());
  }

  clicked() {
    this.subject.next();
  }

  ngOnDestroy(): void {
    this.subject.complete();
  }
}
