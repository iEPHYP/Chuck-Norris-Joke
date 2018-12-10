import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import {
  MatCardModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports: [LoginComponent]
})
export class LoginModule {}
