// import { UserComponent } from './../user/user.component';
import { User } from './../_interfaces/user';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    // public user: UserComponent
  ) { }
  login: string;
  password: string;

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  logIn(username: string, password: string): void {
    this.userService.sendLoginInfo(username, password).subscribe(
      x => {
        // console.log("User logged in");
        console.log(x);
        this.userService.setToken(x);
        // this.router.navigateByUrl('main-view');
        this.userService.getUserInfo().subscribe(
          y => {
            localStorage.setItem('userData', JSON.stringify(y));
            //console.log(y);
            this.router.navigateByUrl('favourites');
           }
        );
      }
    );

    // console.log("stop");
  }
}
