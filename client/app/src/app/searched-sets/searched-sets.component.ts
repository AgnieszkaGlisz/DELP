import { Lesson } from './../_interfaces/lesson';
import { Wordset } from './../_interfaces/wordset';
import { WordsetService } from './../_services/wordset.service';
import { Set } from './../_interfaces/set';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searched-sets',
  templateUrl: './searched-sets.component.html',
  styleUrls: ['./searched-sets.component.css']
})
export class SearchedSetsComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private router: Router,
    ) { }

  searchedSets: Set[];
  favourites: Set[];

  ngOnInit(): void {
    this.searchedSets = new Array<Set>();
    this.getFavourites();
    this.getSearchedSets()
  }

  getSearchedSets() {
    this.wordsetService.getSearchedSets().subscribe(x => {
      Object.assign(this.searchedSets, x);
      let index = 0;
      x.forEach(set => {
        this.searchedSets[index] = new Set();
        Object.assign(this.searchedSets[index++], set);
      })
    })
  }

  getFavourites(): void {
    this.wordsetService.getFavourites().subscribe(x => {
      console.log(x)
      this.favourites = new Array<Set>();
      Object.assign(this.favourites, x);
      let index = 0;
      x.forEach(set => {
        console.log(index)
        this.favourites[index] = new Set();
        Object.assign(this.favourites[index++], set);
      });
    });
  }

  goToLearnView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/learn');
  }

  // isFavourite(set: Set): boolean {
  //   if ()
  // }

  addToFavourites(id: string): void {
    this.wordsetService.addSetToFavourites(id).subscribe(x => {
      // console.log("stupid");
    });
  }

}
