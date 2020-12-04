import { FinishedSetComponent } from './_wordsetComponents/finished-set/finished-set.component';
import { RegistrationComponent } from './_userComponents/registration/registration.component';
import { UserAccountComponent } from './_userComponents/user-account/user-account.component';
import { UserPreferencesComponent } from './_userComponents/user-preferences/user-preferences.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LessonCreateComponent } from './_lessonComponents/lesson-create/lesson-create.component';
import { WordsetDisplayComponent } from './_wordsetComponents/wordset-display/wordset-display.component';
import { UserLoginComponent } from './_userComponents/user-login/user-login.component';
import { UserLogoutComponent } from './_userComponents/user-logout/user-logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsetCreateComponent } from './_wordsetComponents/wordset-create/wordset-create.component';
import { WordsetLearnComponent } from './_wordsetComponents/wordset-learn/wordset-learn.component';
import { UserSetsComponent } from './user-sets/user-sets.component';
import { SearchedSetsComponent } from './searched-sets/searched-sets.component';

const routes: Routes = [
  { path: 'user/favourite', component: FavouritesComponent},
  { path: 'wordset/create', component: WordsetCreateComponent},
  { path: 'wordset/display', component: WordsetDisplayComponent},
  { path: 'set/learn', component: WordsetLearnComponent},
  { path: 'set/result', component: FinishedSetComponent},
  { path: 'user/login', component: UserLoginComponent},
  { path: 'user/register', component: RegistrationComponent},
  { path: 'lesson/create', component: LessonCreateComponent},
  { path: 'user/logout', component: UserLogoutComponent},
  { path: 'user/sets', component: UserSetsComponent},
  { path: 'sets/search', component: SearchedSetsComponent, runGuardsAndResolvers: 'always'},
  { path: 'user/preferences', component: UserPreferencesComponent},
  { path: 'user/account', component: UserAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
