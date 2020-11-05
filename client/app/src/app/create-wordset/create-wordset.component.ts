import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from '../_services/message.service';
import { WordsetService } from '../_services/wordset.service';
import { WORDS } from './../words-mock';
import { Component, OnInit } from '@angular/core';
import { TranslateWordTemplate } from '../_interfaces/translateWordTemplate';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-wordset',
  templateUrl: './create-wordset.component.html',
  styleUrls: ['./create-wordset.component.css']
})
export class CreateWordsetComponent implements OnInit {

  words: TranslateWordTemplate[];

  constructor(
    private wordsetService: WordsetService,
    private messageService: MessageService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.messageService.add("wordset component init");
    this.getWords();
  }

  getWords(): void {
    this.wordsetService.getWords1().subscribe(words => this.words = words);
  }

  addWord(original: string, translation: string): void {
    this.messageService.add("addWord create-wordset");
    if (!original || !translation)
    {
    return;
    }
    let word = <TranslateWordTemplate>{};
    word.id = this.genId(this.words);
    word.original = original;
    word.translation = translation;
    this.words.push(word);
  }

  deleteWord(word: TranslateWordTemplate): void {
    this.words = this.words.filter(w => w !== word);
  }
  
  dupa: string;
  saveWordset(): void {
    this.messageService.add("before get");
    this.wordsetService.getWords().subscribe(test => this.dupa = test.text);
    // this.wordsetService.getWords().subscribe(test => console.log(test.text));
    console.log(this.dupa);
    this.messageService.add(this.dupa);
    this.messageService.add("after get");
  }

  // saveWordset(): void {

  // }
    
  genId(words: TranslateWordTemplate[]): number {
    return this.words.length > 0 ? Math.max(...this.words.map(word => word.id)) + 1 : 1;
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
