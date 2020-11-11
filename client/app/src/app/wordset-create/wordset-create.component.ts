import { UserComponent } from './../user/user.component';
import { User } from './../_interfaces/user';
import { TranslateWordTemplate } from './../_interfaces/translateWordTemplate';
import { Wordset } from './../_interfaces/wordset';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from '../_services/message.service';
import { WordsetService } from '../_services/wordset.service';
// import { WORDS } from './../words-mock';
import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SetInfo } from '../_interfaces/setInfo';

@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit {

  // words: TranslateWordTemplate[];
  wordset: Wordset;

  constructor(
    private wordsetService: WordsetService,
    private messageService: MessageService,
    private httpClient: HttpClient,
    // private user: UserComponent
    ) { }

  ngOnInit(): void {
    this.wordset = <Wordset>{};
    this.wordset.exercises = <TranslateWordTemplate[]>[];
    this.wordset.setInfo = <SetInfo>{};

    console.log("wordset component init");
    this.wordset.setInfo.id = null;
    this.wordset.setInfo.idBaseLanguage = null;
    // this.wordset.setInfo.idCreator = this.user.userInfo.id;
    this.wordset.setInfo.idLearnLanguage = null;
    this.wordset.setInfo.ifAudio = false;
    this.wordset.setInfo.ifPicture = false;
    this.wordset.setInfo.ifVideo = false;
    this.wordset.setInfo.info = null;
    this.wordset.setInfo.isWordSet = true;
    this.wordset.setInfo.name = null;
    this.wordset.setInfo.popularity = 0;
    this.wordset.setInfo.setCreation = null;
  }

  addWord(word: string, translation: string): void {
    // this.wordset = <Wordset>{};
    console.log("addWord wordset-create");
    if (!word || !translation)
    {
    return;
    }
    let translateWord = <TranslateWordTemplate>{};
    // translateWord.id = 0;
    translateWord.id = this.genId(this.wordset.exercises);
    translateWord.idSet = null;
    translateWord.word = word;
    translateWord.translation = translation;
    translateWord.audioPath = '';
    translateWord.videoPath = '';
    translateWord.picturePath = '';
    this.wordset.exercises.push(translateWord);
  }

  deleteWord(word: TranslateWordTemplate): void {
    this.wordset.exercises = this.wordset.exercises.filter(w => w !== word);
  }
  
  saveWordset(): void {
    this.wordsetService.saveWordset(this.wordset.exercises).subscribe(x => {
      console.log(x);
    });
  }

  // saveWordset(): void {

  // }
    
  genId(words: TranslateWordTemplate[]): number {
    return this.wordset.exercises.length > 0 ? Math.max(...this.wordset.exercises.map(word => word.id)) + 1 : 1;
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
