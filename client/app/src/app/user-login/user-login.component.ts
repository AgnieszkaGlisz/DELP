import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: RouterModule
  ) { }
  login: string;
  password: string;
  token: string;

  ngOnInit(): void {
  }

  logIn(username: string, password: string): void {
    this.userService.sendLoginInfo(username, password).subscribe(
      x => {
        console.log("User logged in");
        console.log(x);
        this.token = x.accessToken;
        // this.router.navigateByUrl('main-view');
        this.userService.getUserInfo(x.accessToken).subscribe(
          y => {
            console.log(y);
          }
        );
      }
    );

    // console.log("stop");
  }

}
