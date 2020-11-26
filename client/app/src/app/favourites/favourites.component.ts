import { Lesson } from './../_interfaces/lesson';
import { Wordset } from './../_interfaces/wordset';
import { Component, OnInit } from '@angular/core';
import { WordsetService } from '../_services/wordset.service';
import { Set } from '../_interfaces/set';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private router: Router,
    ) { }

  favourites: Set[];

  ngOnInit(): void {
    // this.favourites = <Set[]>{};
    this.getFavourites();
  }

  getFavourites(): void {
    this.favourites = new Array<Set>();
    this.wordsetService.getFavourites().subscribe(x => {
      this.favourites = new Array<Set>();
      Object.assign(this.favourites, x);
      let index = 0;
      x.forEach(set => {
        this.favourites[index] = new Set();
        Object.assign(this.favourites[index++], set);
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
      this.getFavourites();
    });
  }

}
