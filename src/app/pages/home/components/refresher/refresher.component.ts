import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../../home.data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss']
})
export class RefresherComponent implements OnDestroy {
  private subject = new Subject();

  constructor(dataService: DataService) {
    dataService.addRefresher(this.subject.asObservable());
  }

  clicked() {
    this.subject.next();
  }

  ngOnDestroy(): void {
    this.subject.complete();
  }
}
