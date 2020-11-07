import { TranslateWordTemplate } from './../_interfaces/translateWordTemplate';
import { Wordset } from './../_interfaces/wordset';
import { WordsetService } from './../_services/wordset.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-wordset',
  templateUrl: './display-wordset.component.html',
  styleUrls: ['./display-wordset.component.css']
})
export class DisplayWordsetComponent implements OnInit {

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
