import { ViewOption } from './_exercisesComponents/view-option-enum';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordsetCreateComponent } from './_wordsetComponents/wordset-create/wordset-create.component';
import { MessagesComponent } from './messages/messages.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { WordsetDisplayComponent } from './_wordsetComponents/wordset-display/wordset-display.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonCreateComponent } from './_lessonComponents/lesson-create/lesson-create.component';

import { AuthInterceptor } from './interceptor/httpconfig.interceptor';
import { FavouritesComponent } from './favourites/favourites.component';
import { WordsetLearnComponent } from './_wordsetComponents/wordset-learn/wordset-learn.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserSetsComponent } from './user-sets/user-sets.component';
import { ExerciseDirective } from './exercise.directive';
import { WordExerciseTemplateComponent } from './_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { FillSentenceExerciseTemplateComponent } from './_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { ExerciseListDirective } from './exercise-list.directive';

@NgModule({
  declarations: [
    AppComponent,
    WordsetCreateComponent,
    MessagesComponent,
    UserComponent,
    UserLoginComponent,
    WordsetDisplayComponent,
    LessonComponent,
    LessonCreateComponent,
    FavouritesComponent,
    WordsetLearnComponent,
    UserLogoutComponent,
    UserSetsComponent,
    ExerciseDirective,
    WordExerciseTemplateComponent,
    TranslateSentenceExerciseTemplateComponent,
    FillSentenceExerciseTemplateComponent,
    ExerciseListDirective,
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
