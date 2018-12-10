import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './app.notification.service';
import { LoginService } from './pages/login/login.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule
  ],
  providers: [NotificationService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
