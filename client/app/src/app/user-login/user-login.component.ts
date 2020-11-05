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

  ngOnInit(): void {
  }

  logIn(login: string, password: string): void {
    this.userService.sendLoginInfo(login, password).subscribe(
      () => {
        console.log("User logged in");
        // this.router.navigateByUrl('main-view');
      }
    );
  }

}
