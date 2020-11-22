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
import { catchError, every, map, tap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
//import { userInfo } from 'os';
import {AlertService} from'../alert/alert.service'
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
  files: File[] = [];
  //f: File[] = [];

  constructor(
    private wordsetService: WordsetService,
    private messageService: MessageService,
    private httpClient: HttpClient,
    private user: UserService,
    private alertService: AlertService
    //private user: UserComponent
    ) { }

  ngOnInit(): void {
    this.set = new Wordset();
    this.set.exercises = Array<WordExerciseTemplate>();
    this.set.setInfo = new SetInfo();
    this.exercise = new WordExerciseTemplate();
    //this.files = Array<fileInfo>();
    console.log("wordset component init");
  }

  addExercise(): void {
    /*let id = this.exercise.addExerciseToSet(this.set);
    let imageBuble = this.fileInput.nativeElement.files[0];

    if(imageBuble){
      let newFile = new fileInfo();
      newFile.add(imageBuble, id, this.fileInput.nativeElement.files[0].type);
      //console.log(this.fileInput.nativeElement.files[0].type)
      this.files.push(newFile)
    }
    console.log(this.set);*/
  }

  saveSet(): void {
    /*this.set.saveSet();
    if (this.set.setInfo.name){
      this.wordsetService.saveWordset(this.set).subscribe(x => {
        console.log("in save set");
        console.log()
        while(this.files.length > 0){
         this.wordsetService.sendFile(this.files.pop(), x['setId']).subscribe(x => {
             console.log(x)
         });
        }
     });
    }
    else {
      console.log("in else")
        this.alertService.error("Fill set name!")
    }*/
  }

  onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
  console.log("In the on select" + this.files.length)
  /*let imageBuble = this.f.pop();
  let info = new fileInfo();

  info.add(imageBuble, 2, imageBuble.type)
  this.wordsetService.sendFile(info, 5).subscribe(x => {
    console.log(x)
  })*/
  //let formData = new FormData();
  //formData.set("image", imageBuble)
}
 
onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
  /*onSelectImage(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
       console.log(event.target.result);
      }
    }
}*/
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
