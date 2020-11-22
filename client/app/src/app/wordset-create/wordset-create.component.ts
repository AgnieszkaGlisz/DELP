import { ExerciseTemplateComponent } from './../exercise-template.component';
import { ExerciseDirective } from './../exercise.directive';
import { ExerciseItem } from './../exercise-item';
import { WordExerciseTemplateComponent } from './../word-exercise-template/word-exercise-template.component';
import { SetInfo } from './../_interfaces/setInfo';
import { Wordset } from './../_interfaces/wordset';
import { Set } from './../_interfaces/set';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MessageService } from '../_services/message.service';
import { WordsetService } from '../_services/wordset.service';
import { UserService } from '../_services/user.service';
// import { WORDS } from './../words-mock';

import { catchError, every, map, tap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { Component, Input, OnInit, ViewChild, ElementRef,ComponentFactoryResolver } from '@angular/core';
import { send } from 'process';
//import { userInfo } from 'os';
import {AlertService} from'../alert/alert.service'
import {fileInfo} from '../_interfaces/files'


@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})


export class WordsetCreateComponent implements OnInit {
  //@Input() exerciseItems: ExerciseItem[];
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  files: File[] = [];
  addedFile: fileInfo[] = [];
  set: Wordset;
  exercise: WordExerciseTemplateComponent;

  constructor(
    private wordsetService: WordsetService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private alertService: AlertService,
    private httpClient: HttpClient,
    private user: UserService,

    ) { }

  ngOnInit(): void {
    this.set = new Wordset();
    this.set.exercises = Array<WordExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();

    
    // this.exerciseItems = new Array<ExerciseItem>(); 
    this.loadComponent();
  }

  loadComponent(): void {
    this.exercise = new WordExerciseTemplateComponent();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
    console.log(this);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);
    componentRef.instance.data = this.exercise.data; 
    console.log(this.exercise.data);
  }


  addExercise(): void {
    this.set.addExerciseToSet(this.exercise);
    this.loadComponent();

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
    this.set.saveSet();
    if (this.set.setInfo.name){
      this.wordsetService.saveWordset(this.set).subscribe(x => {
        console.log("in save set");
        console.log()
        //while(this.files.length > 0){
        // this.wordsetService.sendFile(this.files.pop(), x['setId']).subscribe(x => {
        //     console.log(x)
        // });
       // }
     });
    }
    else {
      console.log("Didn't give set name")
        this.alertService.error("Fill set name!")
    }
  }

  onSelect(event) {
  console.log(event);
  console.log("In the on select" + this.files.length)
  if (this.files.length < 3) {
    let canAddTheFile = true;
    let imageBuble = event.addedFiles[0];

    console.log(event.addedFiles[0])
    this.files.forEach(function(value){
      console.log(value.type.split("/", 1) +" == " + imageBuble.type.split("/", 1))
      if(value.type.split("/", 1) == imageBuble.type.split("/", 1)){
        this.alertService.warn("There is already one audio!");
        canAddTheFile = false;
      }
    })
    if(canAddTheFile){
      this.files.push(...event.addedFiles);
    }
  }
  else {
    this.alertService.warn("You can only add 3 files! (One image, one video, one audio)")
  }
  
  

  //this.files.push(...event.addedFiles);
  
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
  deleteExercise(exerciseI: WordExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
  } 
  
}
