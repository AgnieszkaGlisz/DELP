import { Lesson } from './../_interfaces/lesson';
import { Wordset } from './../_interfaces/wordset';
import { WordsetService } from './../_services/wordset.service';
import { Set } from './../_interfaces/set';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetInfo } from '../_interfaces/setInfo';

@Component({
  selector: 'app-searched-sets',
  templateUrl: './searched-sets.component.html',
  styleUrls: ['./searched-sets.component.css']
})
export class SearchedSetsComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private router: Router,
    ) {
      router.events.subscribe(x => {
        this.getSearchedSets();
      })
     }

  searchedSets: SetInfo[];
  favourites: SetInfo[];

  ngOnInit(): void {
    this.searchedSets = new Array<SetInfo>();
    this.getFavourites();
    this.getSearchedSets()
  }

  getSearchedSets() {
    this.searchedSets = new Array<SetInfo>();
    this.wordsetService.getSearchedSets().subscribe(x => {
      Object.assign(this.searchedSets, x);
      let index = 0;
      x.forEach(set => {
        this.searchedSets[index] = new SetInfo();
        Object.assign(this.searchedSets[index++], set);
      })
    })
  }

  getFavourites(): void {
    this.wordsetService.getFavourites().subscribe(x => {
      this.favourites = new Array<SetInfo>();
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

  goToLearnView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/learn');
  }

  addToFavourites(id: string): void {
    this.wordsetService.addSetToFavourites(id).subscribe(x => {
    });
  }

}
