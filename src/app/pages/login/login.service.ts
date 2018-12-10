import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  constructor(private router: Router) {}

  isLoggedIn() {
    const token = sessionStorage.getItem('token');

    return !!token;
  }

  login({ email, password }: { [key: string]: string }) {
    sessionStorage.setItem(
      'token',
      `Use this object!!! :D => { email: ${email}, password: ${password} } `
    );
    setTimeout(() => this.router.navigate(['/']), 1000);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
