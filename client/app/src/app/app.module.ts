import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { WordsetCreateComponent } from './wordset-create/wordset-create.component';
import { MessagesComponent } from './messages/messages.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { WordsetDisplayComponent } from './wordset-display/wordset-display.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonCreateComponent } from './lesson-create/lesson-create.component';

import { AuthInterceptor } from './interceptor/httpconfig.interceptor';
import { FavouritesComponent } from './favourites/favourites.component';
import { WordsetLearnComponent } from './wordset-learn/wordset-learn.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    WordsetCreateComponent,
    MessagesComponent,
    UserComponent,
    UserLoginComponent,
    WordsetDisplayComponent,
    LessonComponent,
    LessonCreateComponent,
    FavouritesComponent,
    WordsetLearnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
