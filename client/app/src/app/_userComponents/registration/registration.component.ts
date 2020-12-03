import { User } from './../../_interfaces/user';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserPreferences } from 'src/app/_interfaces/userPreferences';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(userService: UserService) { }

  user: User;

  ngOnInit(): void {
    this.user = new User();
    this.user.preferences = new UserPreferences();
  }

}
