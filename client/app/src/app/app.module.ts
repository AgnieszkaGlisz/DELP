import { ViewOption } from './_sets/_exercisesComponents/view-option-enum';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordsetCreateComponent } from './_sets/wordset-create/wordset-create.component';
import { UserLoginComponent } from './_userComponents/user-login/user-login.component';
import { WordsetDisplayComponent } from './_sets/wordset-display/wordset-display.component';
import { LessonCreateComponent } from './_sets/lesson-create/lesson-create.component';

import { AuthInterceptor } from './interceptor/httpconfig.interceptor';
import { FavouritesComponent } from './_sets/favourites/favourites.component';
import { WordsetLearnComponent } from './_sets/wordset-learn/wordset-learn.component';
import { UserLogoutComponent } from './_userComponents/user-logout/user-logout.component';
import { UserSetsComponent } from './_sets/user-sets/user-sets.component';
import { AlertComponent } from './alert/alert.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ExerciseDirective } from './_sets/exercise.directive';
import { WordExerciseTemplateComponent } from './_sets/_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './_sets/_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { FillSentenceExerciseTemplateComponent } from './_sets/_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { ExerciseListDirective } from './_sets/exercise-list.directive';
import { SearchedSetsComponent } from './_sets/searched-sets/searched-sets.component';
import { UserAccountComponent } from './_userComponents/user-account/user-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './_userComponents/registration/registration.component';
import { FinishedSetComponent } from './_sets/finished-set/finished-set.component';


@NgModule({
  declarations: [
    AppComponent,
    WordsetCreateComponent,
    UserLoginComponent,
    WordsetDisplayComponent,
    LessonCreateComponent,
    FavouritesComponent,
    WordsetLearnComponent,
    UserLogoutComponent,
    UserSetsComponent,
    AlertComponent,
    ExerciseDirective,
    WordExerciseTemplateComponent,
    TranslateSentenceExerciseTemplateComponent,
    FillSentenceExerciseTemplateComponent,
    ExerciseListDirective,
    SearchedSetsComponent,
    UserAccountComponent,
    RegistrationComponent,
    FinishedSetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    MatSelectModule, 
    MatFormFieldModule,
    NgxDropzoneModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
