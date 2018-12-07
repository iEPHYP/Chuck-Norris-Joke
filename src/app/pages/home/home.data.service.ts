import { Injectable } from '@angular/core';
import { JokesData } from './jokes-data.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  startWith,
  takeUntil,
  debounceTime,
  switchMap
} from 'rxjs/operators';

@Injectable()
export class DataService {
  private apiUrl = 'http://api.icndb.com/jokes/random/10';
  private getDataSubject = new Subject<JokesData>();
  private destroyed = new Subject();
  private onRefreshClickSubject = new Subject();

  constructor(private http: HttpClient) {}

  addRefresher(refreshClick$: Observable<any>) {
    refreshClick$.subscribe(() => this.onRefreshClickSubject.next());

    refreshClick$
      .pipe(
        debounceTime(250),
        startWith('emit click for first data load'),
        switchMap(() => this.http.get<JokesData>(this.apiUrl)),
        takeUntil(this.destroyed)
      )
      .subscribe(data => {
        this.getDataSubject.next(data);
      });
  }

  getRandomJokes(): Observable<JokesData> {
    return this.getDataSubject.asObservable();
  }

  getRefresher$(): Observable<any> {
    return this.onRefreshClickSubject.asObservable();
  }

  destroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.getDataSubject.complete();
  }
}
