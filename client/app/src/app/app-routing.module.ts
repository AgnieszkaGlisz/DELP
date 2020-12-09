import { FinishedSetComponent } from './_sets/finished-set/finished-set.component';
import { RegistrationComponent } from './_userComponents/registration/registration.component';
import { UserAccountComponent } from './_userComponents/user-account/user-account.component';
import { FavouritesComponent } from './_sets/favourites/favourites.component';
import { LessonCreateComponent } from './_sets/lesson-create/lesson-create.component';
import { WordsetDisplayComponent } from './_sets/wordset-display/wordset-display.component';
import { UserLoginComponent } from './_userComponents/user-login/user-login.component';
import { UserLogoutComponent } from './_userComponents/user-logout/user-logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsetCreateComponent } from './_sets/wordset-create/wordset-create.component';
import { WordsetLearnComponent } from './_sets/wordset-learn/wordset-learn.component';
import { UserSetsComponent } from './_sets/user-sets/user-sets.component';
import { SearchedSetsComponent } from './_sets/searched-sets/searched-sets.component';

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
  { path: 'user/account', component: UserAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


