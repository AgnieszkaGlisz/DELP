import { TranslateWordTemplate } from '../_interfaces/translateWordTemplate';
import { Wordset } from '../_interfaces/wordset';
import { WordsetService } from '../_services/wordset.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wordset-display',
  templateUrl: './wordset-display.component.html',
  styleUrls: ['./wordset-display.component.css']
})
export class WordsetDisplayComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService
  ) { }
  wordset: Wordset;
  words: TranslateWordTemplate[];

  ngOnInit(): void {
  }

  getWordset(): void {
    this.wordsetService.getWordset('1').subscribe(
      x => {
        this.wordset = x;
        console.log(x);
      }
    )
  }

}
