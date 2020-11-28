import { WordsetService } from './_services/wordset.service';
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
    private wordsetService: WordsetService,
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
  colorset: string[];
  title = 'lang-app-front';

  ngOnInit(): void {
    this.colorset = new Array<string>();
    this.colorset.push('c1');
    this.colorset.push('c2');
    this.colorset.push('c3');
    this.colorset.push('c4');
    this.colorset.push('c5');
    
    this.userService.getUserInfo().subscribe(
      y => {
        this.router.navigateByUrl('favourites');
       }
    );
  }

  goToSearchedSets(keyword: string) {
    this.wordsetService.searchSetsKeyword = keyword;
    if (this.router.url == 'searched-sets') {
      this.router.onSameUrlNavigation = 'reload';
    }
    else {
      this.router.navigateByUrl('searched-sets');
    }
  }
}
