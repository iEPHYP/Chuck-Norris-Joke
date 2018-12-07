import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './home.data.service';
import { RandomerService } from './home.randomer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  constructor(
    private randomerService: RandomerService,
    private dataService: DataService
  ) {}

  ngOnDestroy(): void {
    this.randomerService.destroy();
    this.dataService.destroy();
  }
}
