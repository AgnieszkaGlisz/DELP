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
    this.favourites = <Set[]>{};
    this.getFavourites();
  }

  getFavourites(): void {
    this.wordsetService.getFavourites().subscribe(x => {
      console.log(x);
      this.favourites = x;
      // console.log(x[0].exercises.length);
    })
  }

  goToDisplayView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    this.router.navigateByUrl('/wordset/display');
  }

  goToLearnView(id: string): void {
    this.wordsetService.setToDisplayId = id;
    console.log(this.wordsetService.setToDisplayId);
    this.router.navigateByUrl('/wordset/learn');
  }

}
