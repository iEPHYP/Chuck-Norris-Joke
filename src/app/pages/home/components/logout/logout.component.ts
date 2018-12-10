import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(public loginService: LoginService) { }

  onClick() {
    this.loginService.logout();
  }
}
