import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from './../message.service';
import { WordsetService } from './../wordset.service';
import { WORDS } from './../words-mock';
import { Component, OnInit } from '@angular/core';
import { TranslateWordTemplate } from './../translateWordTemplate';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-wordset',
  templateUrl: './create-wordset.component.html',
  styleUrls: ['./create-wordset.component.css']
})
export class CreateWordsetComponent implements OnInit {

  words: TranslateWordTemplate[];

  constructor(private wordsetService: WordsetService, private messageService: MessageService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.messageService.add("wordset component init");
    this.getWords();
  }

  getWords(): void {
    this.wordsetService.getWords().subscribe(words => this.words = words);
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

  saveWordset(): void {
    // const writeJsonFile = require('write-json-file');
    // (async() => {
    //   await writeJsonFile('foo.json', this.words);
    // });

    this.messageService.add("jestem tu");
    var jsonData = JSON.stringify(this.words);
    // this.messageService.add(jsonData);
    const url = `http://25.68.211.177:3000/users`;
    let testReturned: string;
    // var testReturned;
    this.messageService.add("before get");
    var test = this.httpClient.get<string>(url).pipe(
      tap(_ => this.messageService.add("blablabla")),
      catchError(this.handleError<string>(`aaaaaaaaaa`))
    ).subscribe(x => testReturned = x);
    this.messageService.add(testReturned);
    this.messageService.add("after get");
    if (test) {
      // toString(test);
      this.messageService.add("testRetunded not empty");
      this.messageService.add(testReturned);
    }
    else {
      this.messageService.add("fuck");
    }
    this.messageService.add("koniec");
  }

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
