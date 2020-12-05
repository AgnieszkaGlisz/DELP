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
    public userService: UserService,
    private router: Router,
  ) { }

  user: User;
  contrastMenu:boolean

  ngOnInit(): void {
    this.user = new User();
    this.user.userInfo = new UserInfo();
    this.user.preferences = new UserPreferences();
    this.userService.getUserInfo().subscribe(x => {
      Object.assign(this.user, x);
      Object.assign(this.user.preferences, x.preferences);
      this.userService.savePreferences(this.user.preferences);
      if(this.user.preferences.idColorSets == 1){
        this.contrastMenu = false
      }else{
        this.contrastMenu = true
      }
    })
  }

  savePreferences(): void {
    if(this.contrastMenu) this.user.preferences.idColorSets=2
    else this.user.preferences.idColorSets = 1
    this.userService.savePreferences(this.user.preferences).subscribe(x => {
      localStorage.setItem("userData", JSON.stringify(this.user));
      this.userService.changeColorSet()
      this.informAboutSevedPreferences()
    });
    this.router.navigateByUrl("/user/account")
  }

  openPrefTab(){
    $("#infotab").removeClass("d-flex")
    $("#infotab").addClass("d-none")
    $("#preftab").addClass("d-flex")
    $("#preftab").removeClass("d-none")
    $("#infobutton").addClass("bg-secondary")
    $("#prefbutton").removeClass("bg-secondary")
  }
  openInfoTab(){
    $("#preftab").removeClass("d-flex")
    $("#preftab").addClass("d-none")
    $("#infotab").addClass("d-flex")
    $("#infotab").removeClass("d-none")
    $("#infobutton").removeClass("bg-secondary")
    $("#prefbutton").addClass("bg-secondary")
  }

  informAboutSevedPreferences(){
    $('#preftab>button').addClass('btn-success')
    
    setTimeout(()=>{
      $('#preftab>button').removeClass('btn-success')
 }, 1000);
  }



}
