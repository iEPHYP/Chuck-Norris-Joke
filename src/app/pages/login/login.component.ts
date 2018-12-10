import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from './login.password.validator';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, passwordValidator]]
  });

  get emailErrors(): any {
    return this.loginForm.get('email').errors;
  }

  get passwordErrors(): any {
    return this.loginForm.get('password').errors;
  }

  constructor(public fb: FormBuilder, public service: LoginService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value);
    } else {
      const controls = this.loginForm.controls;
      for (const key in controls) {
        const control = controls[key];
        control.markAsTouched();
      }
    }
  }
}
