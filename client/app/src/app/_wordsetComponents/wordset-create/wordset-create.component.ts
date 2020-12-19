import { User } from './../../_interfaces/user';
import { fileInfo } from './../../_interfaces/files';
import { ViewOption } from './../../_exercisesComponents/view-option-enum';
import { ExerciseListDirective } from './../../exercise-list.directive';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { ExerciseDirective } from './../../exercise.directive';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { SetInfo } from './../../_interfaces/setInfo';
import { Wordset } from './../../_interfaces/wordset';
import { Set } from './../../_interfaces/set';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WordsetService } from '../../_services/wordset.service';
import { UserService } from './../../_services/user.service';
// import { WORDS } from './../words-mock';
import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, ViewChildren, QueryList, ViewContainerRef, AfterViewInit, AfterViewChecked,Injector } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { send } from 'process';
import { FormControl } from '@angular/forms';
import { Language } from '../../_interfaces/language';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
//import { userInfo } from 'os';

@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(
    //private wordsetService: WordsetService, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    public userService: UserService, 
    public injector:Injector
    ) { }

  files: File[] = [];
  addedFile: fileInfo[] = [];
  
  set: Set;
  exercise: ExerciseTemplateComponent;
  // userService: UserService;
  lang1 = new FormControl();
  lang2 = new FormControl();
  languageList: Array<Language> = new Array<Language>();
  languageSubscription: Subscription;

  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;
  @ViewChildren(ExerciseListDirective) exerciseHosts: QueryList<ExerciseListDirective>;
  //proxy1: any; 

  ngOnInit(): void {
    this.set = new Wordset();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    this.userService.getUserInfo().subscribe(x => console.log(x));
    // this.userService = new UserService();
    // this.userService = this.injector
    // this.userService = this.injector.get(UserService);
  }

  ngAfterViewInit(): void {
    this.loadComponent();
    this.loadLanguages();
  }

  ngAfterViewChecked(): void {
    if (this.languageList.length == 0 && ((!this.languageSubscription) ||
       (this.languageSubscription && this.languageSubscription.closed)))
      this.loadLanguages();
  }

  loadLanguages(): void {
    console.log("waiting for languages...");
    this.languageSubscription = this.injector.get(WordsetService).getAllLanguages().subscribe( x => {
      console.log("got languages", x);
      let tmp = {languages:  Array<Language>()};
      Object.assign(tmp, x);
      let i = 0;
      tmp.languages.forEach( l =>
      {
        this.languageList[i] = l;
        i++;
      });
    }, err => {
      console.log("didn't get languages", err);

    }, 
    () => {
      console.log("languages", this.languageList);
    }
    )
  }
  
  loadComponent(): void {
    this.exercise = new WordExerciseTemplateComponent(this.injector);
    // this.exercise = new WordExerciseTemplateComponent(ViewOption.Create);
    this.exercise.data = this.exercise;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);
    componentRef.changeDetectorRef.detach();
    componentRef.instance.data = this.exercise.data;
    componentRef.changeDetectorRef.detectChanges();
  }

  loadComponent2(): void {
    if(this.exerciseHosts){
      let index = 0;
      this.exerciseHosts.forEach(ex => {
        const viewContainer = ex.viewContainerRef;
        viewContainer.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.set.exercises[index].component);
        const compRef = viewContainer.createComponent<ExerciseTemplateComponent>(factory);
        compRef.changeDetectorRef.detach();
        compRef.instance.data = this.set.exercises[index].data;
        compRef.changeDetectorRef.detectChanges();
        index += 1;
      });
    }
  }
  
  
  createWordExercise(): void {
    this.exercise = new WordExerciseTemplateComponent(this.injector);
    this.exercise.setViewOption(ViewOption.Create);
    // this.exercise = new WordExerciseTemplateComponent(ViewOption.Create);
    this.loadComponent();
  }
  
  removeError(idclass:string){
    $(idclass).removeClass('bg-error')
  }

  addExercise(): void {
    if(!$(".word-left").val() ||!$(".word-right").val()){
      if(!$(".word-left").val()) $(".word-left").addClass('bg-error')
      if(!$(".word-right").val())$(".word-right").addClass('bg-error')
      return
    }
    this.exercise.setViewOption(ViewOption.Display);
    if(this.files.length >0 ){
      for ( var i =0; i < this.files.length; i++) {
        console.log(this.files[i])
        if(this.files[i].type.split("/", 1)[0] == 'image'){
          this.exercise.picturePath = '1';
        }
        else if(this.files[i].type.split("/", 1)[0] == 'video'){
          this.exercise.videoPath = '1';
        }
        else if(this.files[i].type.split("/", 1)[0] == 'audio'){
          this.exercise.audioPath = '1';
        }
      }
    }

    let id = this.set.addExerciseToSet(this.exercise);
    // this.set.addExerciseToSet(this.exercise);
    this.createWordExercise(); 
    while (this.files.length != 0){
      let newFile = new fileInfo();
      let imageBuble = this.files.pop();
      newFile.add(imageBuble, id, imageBuble.type)
      this.addedFile.push(newFile);
    }
    this.exerciseHosts.changes.subscribe( x => {this.loadComponent2();})
  }

  saveSet(): void {
    if(!$(".wordsetname").val() ||!$(".wordsetinfo").val()||
      !this.lang1.value || !this.lang2.value
      ||this.set.exercises.length==0){
      if(!$(".wordsetname").val()) $(".wordsetname").addClass('bg-error')
      if(!$(".wordsetinfo").val()) $(".wordsetinfo").addClass('bg-error')
      if(!this.lang1.value) $(".fromlang").addClass('bg-error')
      if(!this.lang2.value) $(".tolang").addClass('bg-error')
      return
    }
    this.set.setInfo.idBaseLanguage = this.lang1.value.id;
    this.set.setInfo.idLearnLanguage = this.lang2.value.id;
    this.router.navigateByUrl('user/sets');
    this.set.saveSet();
    if (this.set.setInfo.name){
      this.injector.get(WordsetService).saveWordset(this.set).subscribe(x => {
        console.log(this.addedFile.length)
        while(this.addedFile.length > 0){
          this.injector.get(WordsetService).sendFile(this.addedFile.pop(), x['setId']).subscribe(x => {
             console.log(x)
         });
        }
      });
    }
    else {
      console.log("Didn't give set name")
        //this.alertService.error("Fill set name!")
    }
  }

  deleteExercise(exerciseI: ExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
    this.addedFile = this.addedFile.filter(iteam => iteam.id !== exerciseI.id);
  }

  onSelect(event) {
    console.log(event);
    console.log("In the on select" + this.files.length)
    if (this.files.length < 3) {
      let canAddTheFile = true;
      let correctTypes = true;
      let imageBuble = event.addedFiles[0];
  
      console.log(event.addedFiles[0])
      this.files.forEach(function(value){
        console.log(value.type.split("/", 1)[0] == imageBuble.type.split("/", 1)[0])
        if(value.type.split("/", 1)[0] == imageBuble.type.split("/", 1)[0]){
          canAddTheFile = false;
        }
      })
      if( imageBuble.type.split("/", 1)[0] != 'image' && imageBuble.type.split("/", 1)[0] != 'video' && imageBuble.type.split("/", 1)[0] != 'audio'){
        correctTypes = false;
        //this.alertService.error("Can't add the file of a type " + imageBuble.type.split("/", 1)[0] + '!')
      }
  
      if(canAddTheFile && correctTypes){
        this.files.push(...event.addedFiles);
      }
  
      if (!canAddTheFile) {
        //this.alertService.error("There is already one " + imageBuble.type.split("/", 1)[0] + '!')
      }
    }
    else {
      //this.alertService.warn("You can only add 3 files! (One image, one video, one audio)")
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

  getCustType(event, name){
    if (name == 'startLang'){
      console.log(event.source.value.name)
      localStorage.setItem('startLang', event.source.value.name);
    }
    else if (name == 'targetLang'){
      console.log(event.source.value.name)
      localStorage.setItem('targetLang', event.source.value.name);
    }
    else {
      console.log(":(")
    }
  }
}
