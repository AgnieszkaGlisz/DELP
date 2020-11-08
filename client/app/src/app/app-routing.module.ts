import { LessonCreateComponent } from './lesson-create/lesson-create.component';
import { LessonComponent } from './lesson/lesson.component';
import { WordsetDisplayComponent } from './wordset-display/wordset-display.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserComponent } from './user/user.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsetCreateComponent } from './wordset-create/wordset-create.component';

const routes: Routes = [
  { path: 'main-view', component: MainViewComponent },
  { path: 'wordset/create', component: WordsetCreateComponent},
  { path: 'wordset/display', component: WordsetDisplayComponent},
  { path: 'my-profile', component: UserComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'lesson', component: LessonComponent},
  { path: 'lesson/create', component: LessonCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
