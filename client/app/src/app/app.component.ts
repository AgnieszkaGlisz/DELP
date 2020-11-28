import { WordsetService } from './_services/wordset.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';
import * as $ from "jquery";
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
  
  title = 'lang-app-front';

  ngOnInit(): void {
   
    this.userService.getUserInfo().subscribe(
      y => {
        this.router.navigateByUrl('user/favourite');
       }
    );
  }

  goToSearchedSets(keyword: string) {
    this.wordsetService.searchSetsKeyword = keyword;
    // if (this.router.url == 'searched-sets') {
    //   this.router.onSameUrlNavigation = 'reload';
    // }
    // else {
    this.router.navigateByUrl('sets/search');
    // }
  }

  toggle(){
    $('#wrapper').toggleClass('toggled');
  }


  likeSet(id){
    var setid = '#set'+id
    var img = setid + ' .star > img'
    var likes = setid + ' .numoflikes'
    
    if($(img).attr('src') == "../assets/icons/like.png"){
      $(img).attr("src","../assets/icons/nolike.png")
      var num = parseInt($.trim($(likes).html()))
      $(likes).html((--num).toString())
    }
    else{
      $(img).attr("src","../assets/icons/like.png")
      var num = parseInt($.trim($(likes).html()))
      $(likes).html((++num).toString())
    }
  }

  
}
