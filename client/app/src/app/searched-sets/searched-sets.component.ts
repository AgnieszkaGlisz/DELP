import { Lesson } from './../_interfaces/lesson';
import { Wordset } from './../_interfaces/wordset';
import { WordsetService } from './../_services/wordset.service';
import { Set } from './../_interfaces/set';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetInfo } from '../_interfaces/setInfo';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-searched-sets',
  templateUrl: './searched-sets.component.html',
  styleUrls: ['./searched-sets.component.css']
})
export class SearchedSetsComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private router: Router,
    public userService: UserService
    ) {
      // router.events.subscribe(x => {
      //   this.getSearchedSets('');
      // })
     }

  searchedSets: SetInfo[];
  favourites: SetInfo[];

  ngOnInit(): void {
    this.searchedSets = new Array<SetInfo>();
    this.getFavourites();
    this.getSearchedSets("")
  }

  // searchSets(keyword: string) {
  //   this.wordsetService.searchSetsKeyword = keyword;
  //   this.router.navigateByUrl('sets/search');
  // }

  getSearchedSets(keyword: string) {
    this.searchedSets = new Array<SetInfo>();
    this.wordsetService.getSearchedSets(keyword).subscribe(x => {
      Object.assign(this.searchedSets, x);
      let index = 0;
      x.forEach(set => {
        this.searchedSets[index] = new SetInfo();
        Object.assign(this.searchedSets[index++], set);
      })
    })
  }

  getFavourites(): void {
    this.favourites = new Array<SetInfo>();
    this.wordsetService.getFavourites().subscribe(x => {
      Object.assign(this.favourites, x);
      let index = 0;
      x.forEach(set => {
        this.favourites[index] = new SetInfo();
        Object.assign(this.favourites[index++], set);
      });
    });
  }

  isFavourite(id: string): boolean {
    let isFav: boolean = false;
    if (this.favourites) {
      this.favourites.forEach(fav => {
        var idNum: number = +id;
        if (idNum == fav.id) {
          isFav = true;;
        }
      });
    }
    return isFav;
  }

  goToDisplayView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/display');
  }

  goToLearnView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/learn');
  }

  addToFavourites(id: string): void {
    this.wordsetService.addSetToFavourites(id).subscribe(x => {
      let setInfoTmp = new SetInfo();
      let idNum: number = + id;
      setInfoTmp.id = idNum;
      this.favourites.push(setInfoTmp)
    });
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

  openSet(id){
    $('#set'+id + ' .popwindow').removeClass('invisible')    
  }
  closeSet(id){
    $('#set'+id + ' .popwindow').addClass('invisible')
  }

  likeSet(id){
    var setid = '#set'+id
    var img = setid + ' .star > img'
    var likes = setid + ' .numoflikes'
    
    if($(img).attr('src') == "../assets/icons/like.png"){
      $(img).attr("src","../assets/icons/nolike.png")
      var num = parseInt($.trim($(likes).html()))
      $(likes).html((--num).toString())
      this.deleteSetFromFavourites(id);
    }
    else{
      // this.addToFavourites(id)
      $(img).attr("src","../assets/icons/like.png")
      var num = parseInt($.trim($(likes).html()))
      $(likes).html((++num).toString())
      this.addToFavourites(id);
    }
  }

}
