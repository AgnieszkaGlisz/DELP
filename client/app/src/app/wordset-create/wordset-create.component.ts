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
import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//import { userInfo } from 'os';
import {fileInfo} from '../_interfaces/files'
@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit {

  @ViewChild('fileInput', {static:false}) fileInput: ElementRef;
  set: Wordset;
  exercise: WordExerciseTemplate;
  files: fileInfo[];

  constructor(
    private wordsetService: WordsetService,
    private messageService: MessageService,
    private httpClient: HttpClient,
    private user: UserService
    //private user: UserComponent
    ) { }

  ngOnInit(): void {
    this.set = new Wordset();
    this.set.exercises = Array<WordExerciseTemplate>();
    this.set.setInfo = new SetInfo();
    this.exercise = new WordExerciseTemplate();
    this.files = Array<fileInfo>();
    console.log("wordset component init");
  }

  addExercise(): void {
    let id = this.exercise.addExerciseToSet(this.set);
    let imageBuble = this.fileInput.nativeElement.files[0];

    if(imageBuble){
      let newFile = new fileInfo();
      newFile.add(imageBuble, id, this.fileInput.nativeElement.files[0].type);
      //console.log(this.fileInput.nativeElement.files[0].type)
      this.files.push(newFile)
    }
    console.log(this.set);
  }

  saveSet(): void {
    this.set.saveSet();
    
    //this.wordsetService.saveWordset(this.set).subscribe(x => {
    //   console.log("in save set");
    //   console.log(x['setId'])
       //this.files.forEach(function(val){
       //  this.wordsetService.sendFile(val, x['setId'] )
       //})
    //});
    this.wordsetService.sendFile(this.files.pop(), 6)
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
