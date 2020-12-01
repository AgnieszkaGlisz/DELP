import { UserPreferences } from './../../_interfaces/userPreferences';
import { User } from './../../_interfaces/user';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  user: User;

  ngOnInit(): void {
    this.user = new User();
    this.user.preferences = new UserPreferences();
    this.userService.getUserInfo().subscribe(x => {
      Object.assign(this.user, x);
      Object.assign(this.user.preferences, x.preferences);
      this.userService.savePreferences(this.user.preferences);
  })
  }

  savePreferences(): void {
    console.log(this.user.preferences);
    this.userService.savePreferences(this.user.preferences).subscribe(x => {
      localStorage.setItem("userData", JSON.stringify(this.user));
    });
  }

}
