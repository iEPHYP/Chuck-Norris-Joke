import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  constructor() {}

  public notify(message: string) {
    alert(message); // TODO: make this Snackbar or Modal
  }
}
