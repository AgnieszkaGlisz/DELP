import { Component, OnInit } from '@angular/core';
import { WordsetService } from '../_services/wordset.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService
    ) { }

    favouritesWordsets: any[];

  ngOnInit(): void {
    // this.favouritesWordsers = this.getFavourites();
  }

  getFavourites(): any {
    return this.wordsetService.getFavourites().subscribe(x => {
      console.log(x);
    })
  }

}
