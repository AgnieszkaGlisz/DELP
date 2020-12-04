import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../_services/user.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.logOut();
    
  }

  logOut(): void{
    this.userService.deleteToken();
    this.userService.deleteUserData()
    this.router.navigateByUrl('user/login');
  }
}
