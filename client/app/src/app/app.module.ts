import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { CreateWordsetComponent } from './create-wordset/create-wordset.component';
import { MessagesComponent } from './messages/messages.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { DisplayWordsetComponent } from './display-wordset/display-wordset.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    CreateWordsetComponent,
    MessagesComponent,
    UserComponent,
    UserLoginComponent,
    DisplayWordsetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
