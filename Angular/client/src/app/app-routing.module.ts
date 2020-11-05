import { UserLoginComponent } from './user-login/user-login.component';
import { UserComponent } from './user/user.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateWordsetComponent } from './create-wordset/create-wordset.component';

const routes: Routes = [
  { path: 'main-view', component: MainViewComponent },
  { path: 'wordset/create', component: CreateWordsetComponent},
  { path: 'my-profile', component: UserComponent},
  { path: 'login', component: UserLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
