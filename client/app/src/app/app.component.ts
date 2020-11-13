import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    ) {
      this.router.events.subscribe( x => {
        if (this.router.url.indexOf('login') > -1) 
        {
          this.logged = false;
        }
        else
        {
          this.logged = true;
        }
      }) 
    }
  
  logged: boolean = true;
  title = 'lang-app-front';

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      y => {
        this.router.navigateByUrl('favourites');
       }
    );
  }
}
