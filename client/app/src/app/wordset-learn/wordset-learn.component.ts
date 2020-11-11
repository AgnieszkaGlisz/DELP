import { TranslateWordTemplate } from '../_interfaces/translateWordTemplate';
import { Wordset } from '../_interfaces/wordset';
import { WordsetService } from '../_services/wordset.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wordset-learn',
  templateUrl: './wordset-learn.component.html',
  styleUrls: ['./wordset-learn.component.css']
})
export class WordsetLearnComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService
  ) { }
  wordset: Wordset;
  word: TranslateWordTemplate;
  answer: any = { value: ''};
  wordIndex: number;
  result: string = "";

  ngOnInit(): void {
    this.wordIndex = -1;
    this.wordset = <Wordset>{};
    this.getWordset();
  }

  getWordset(): void {
    this.wordsetService.getWordset('1').subscribe(
      x => {
        this.wordset = x;
        // this.words = x.exercises;
        // x.excercises.length;
        console.log('Wordset: ', x);
        this.nextWord();
      },
      err => console.log('HTTP Error: ', err)
    )
  }

  nextWord(): void {
    this.result = "";
    this.answer.value = '';
    if(this.wordIndex < this.wordset.exercises.length - 1)
    {
      this.wordIndex += 1;
      this.word = this.wordset.exercises[this.wordIndex];
    }
    else
    {
      this.result = "You've finished this set!";
    }
  }

  checkWord(): void {
    if (this.answer.value == this.word.translation.toString())
    {
        this.result = "Correct!";
    }
    else
    {
        this.result = "Wrong :c";
    }
    console.log(this.word.translation);
    console.log(this.answer.value);
  }

}
