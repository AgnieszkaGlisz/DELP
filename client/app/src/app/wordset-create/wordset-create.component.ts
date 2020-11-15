import { SetInfo } from './../_interfaces/setInfo';
import { Wordset } from './../_interfaces/wordset';
import { WordExerciseTemplate } from './../_interfaces/translateWordTemplate';
import { ExerciseTemplate } from './../_interfaces/exerciseTemplate';
import { Set } from './../_interfaces/set';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from '../_services/message.service';
import { WordsetService } from '../_services/wordset.service';
import { UserService } from '../_services/user.service';
// import { WORDS } from './../words-mock';
import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//import { userInfo } from 'os';

@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit {

  set: Wordset;
  exercise: WordExerciseTemplate;

  constructor(
    private wordsetService: WordsetService,
    private messageService: MessageService,
    private httpClient: HttpClient,
    private user: UserService
    //private user: UserComponent
    ) { }

  ngOnInit(): void {
    this.set = new Wordset();
    // this.set = <Wordset>{};
    this.set.exercises = Array<WordExerciseTemplate>();
    // this.set.exercises = <WordExerciseTemplate[]>{};
    // this.set.setInfo = new SetInfo();
    this.set.setInfo = new SetInfo();

    this.exercise = new WordExerciseTemplate();
    // this.exercise = <WordExerciseTemplate>{};

    console.log("wordset component init");
  }

  addExercise(): void {
    this.exercise.addExerciseToSet(this.set);
    console.log(this.set);
  }

  saveSet(): void {
    console.log("przed");
    this.set.saveSet();
    console.log("po");
    this.wordsetService.saveWordset(this.set).subscribe(x => {
      console.log(x);
    });
  }

  // addWord(word: string, translation: string): void {
  //   console.log("addWord wordset-create");
  //   if (!word || !translation)
  //   {
  //   return;
  //   }
  //   let translateWord = <WordExerciseTemplate>{};
  //   translateWord.id = this.genId(this.set.exercises);
  //   // translateWord.template = "WordExerciseTemplate";
  //   // translateWord.template = translateWord.constructor.name.toString();
  //   console.log(translateWord.template);
  //   translateWord.idSet = null;
  //   translateWord.word = word;
  //   translateWord.translation = translation;
  //   translateWord.audioPath = '';
  //   translateWord.videoPath = '';
  //   translateWord.picturePath = '';
  //   this.set.exercises.push(translateWord);
  // }

  
    
  
}
