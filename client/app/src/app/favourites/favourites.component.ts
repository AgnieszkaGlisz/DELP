import { SetInfo } from './../_interfaces/setInfo';
import { Lesson } from './../_interfaces/lesson';
import { Wordset } from './../_interfaces/wordset';
import { Component, OnInit } from '@angular/core';
import { WordsetService } from '../_services/wordset.service';
import { Set } from '../_interfaces/set';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private router: Router,
    public userService: UserService
    ) { }

  favourites: SetInfo[];

  ngOnInit(): void {
    // this.favourites = <Set[]>{};
    this.getFavourites();
  }

  getFavourites(): void {
    
    this.favourites = new Array<SetInfo>();
    this.wordsetService.getFavourites().subscribe(x => {
      this.favourites = new Array<SetInfo>();
      Object.assign(this.favourites, x);
      let index = 0;
      x.forEach(set => {
        this.favourites[index] = new SetInfo();
        Object.assign(this.favourites[index++], set);
        console.log(set)
      });
    });
  }

  goToDisplayView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/display');
  }

  goToLearnView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/learn');
  }

  deleteSetFromFavourites(id: string): void {
    this.wordsetService.deleteSetFromFavourites(id).subscribe(x => {
      this.favourites = this.favourites.filter(it => {
        let idNum: number = +id;
        return idNum !== it.id;
      })
      //this.getFavourites();
    });
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

  openSet(){
    alert("openSet")
    
  }
}
