import { FavouritesComponent } from './favourites/favourites.component';
import { LessonCreateComponent } from './_lessonComponents/lesson-create/lesson-create.component';
import { WordsetDisplayComponent } from './_wordsetComponents/wordset-display/wordset-display.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsetCreateComponent } from './_wordsetComponents/wordset-create/wordset-create.component';
import { WordsetLearnComponent } from './_wordsetComponents/wordset-learn/wordset-learn.component';
import { UserSetsComponent } from './user-sets/user-sets.component';
import { SearchedSetsComponent } from './searched-sets/searched-sets.component';

const routes: Routes = [
  { path: 'favourites', component: FavouritesComponent},
  { path: 'wordset/create', component: WordsetCreateComponent},
  { path: 'wordset/display', component: WordsetDisplayComponent},
  { path: 'wordset/learn', component: WordsetLearnComponent},
  { path: 'my-profile', component: UserComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'lesson/create', component: LessonCreateComponent},
  { path: 'logout', component: UserLogoutComponent},
  { path: 'my-sets', component: UserSetsComponent},
  { path: 'searched-sets', component: SearchedSetsComponent},
  // { path: 'lesson/create', component: LessonCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
