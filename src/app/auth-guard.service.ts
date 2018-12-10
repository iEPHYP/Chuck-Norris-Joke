import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from './pages/login/login.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedin = this.loginService.isLoggedIn();

    if (!isLoggedin) {
      this.router.navigate(['/login']);
      return of(false);
    } else {
      return of(true);
    }
  }
}
