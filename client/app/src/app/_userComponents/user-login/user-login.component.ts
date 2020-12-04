// import { UserComponent } from './../user/user.component';
import { User } from './../../_interfaces/user';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router,
    // public user: UserComponent
  ) { }
  login: string;
  password: string;

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  logIn(username: string, password: string): boolean {
    if (!this.validateLogin(username, password)) return false
    this.userService.sendLoginInfo(username, password).subscribe(
      x => {
        this.userService.setToken(x);
        this.userService.getUserInfo().subscribe(
          y => {
            localStorage.setItem('userData', JSON.stringify(y));
            this.router.navigateByUrl('user/favourite');
          }
        );
      }
    ,error=>{
      if(error){
        $("#loginalert>span").removeClass("d-none")
        $("#password").addClass("bg-error")
        $("#username").addClass("bg-error")
      }
    })
  }

  goToRegistration(): void {
    this.router.navigateByUrl('user/register');
  }

  validateLogin(username: string, password: string): boolean {
    if (!$("#password").val()) $("#password").addClass("bg-error")
    else $("#password").removeClass("bg-error")
    if (!$("#username").val()) $("#username").addClass("bg-error")
    else $("#username").removeClass("bg-error")
    if ($("#password").val() && $("#username").val()) return true
    return false
  }
  cleanErrorInput(id: string) {
    if (!$("#" + id).val()) $("#" + id).addClass("bg-error")
    else $("#" + id).removeClass("bg-error")
  }


}