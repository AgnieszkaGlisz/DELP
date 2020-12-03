import { UserService } from './../../_services/user.service';
import { User } from './../../_interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPreferences } from 'src/app/_interfaces/userPreferences';
import { UserInfo } from 'src/app/_interfaces/userInfo';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  user: User;

  ngOnInit(): void {
    this.user = new User();
    this.user.userInfo = new UserInfo();
    this.user.preferences = new UserPreferences();
    this.userService.getUserInfo().subscribe(x => {
      console.log(x)
      Object.assign(this.user, x);
      Object.assign(this.user.preferences, x.preferences);
      this.userService.savePreferences(this.user.preferences);
      console.log(x)
    })
  }

  goToPreferences(): void {
    this.router.navigateByUrl("/user/preferences")
  }
}
