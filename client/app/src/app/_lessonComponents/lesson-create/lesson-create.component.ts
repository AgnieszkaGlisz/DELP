import { fileInfo } from './../../_interfaces/files';
import { Lesson } from './../../_interfaces/lesson';
import { ViewOption } from './../../_exercisesComponents/view-option-enum';
import { ExerciseListDirective } from './../../exercise-list.directive';
import { FillSentenceExerciseTemplateComponent } from './../../_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { ExerciseDirective } from './../../exercise.directive';
import { ExerciseItem } from './../../exercise-item';
// import { FillSentenceExerciseTemplateComponent } from './../_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './../../_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { WordsetService } from './../../_services/wordset.service';
import { SetInfo } from './../../_interfaces/setInfo';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, ViewContainerRef, Type, ɵConsole, AfterViewChecked } from '@angular/core';
import { Set } from '../../_interfaces/set';
import { DomSanitizer } from '@angular/platform-browser'
import { ComponentFactoryResolver, Injector } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Language } from '../../_interfaces/language';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})

export class LessonCreateComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(
    //private wordsetService: WordsetService, 
    private componentFactoryResolver: ComponentFactoryResolver,
    public userService: UserService,
    private injector:Injector
  ) { }

  files: File[] = [];
  addedFile: fileInfo[] = [];
  set: Set;
  exercise: ExerciseTemplateComponent;
  createExercise: any;
  lang1 = new FormControl();
  lang2 = new FormControl();
  languageList: Array<Language> = new Array<Language>();
  languageSubscription: Subscription;

  exerciseInput: boolean;  
  
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;
  @ViewChildren(ExerciseListDirective) exerciseHosts: QueryList<ExerciseListDirective>;
  //proxy1: any; 

  ngOnInit(): void {
    this.set = new Lesson();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    this.exerciseInput = false;
    //this.proxy1 = new Proxy(this.exerciseHosts, {set: this.loadComponent2();}); 
  }

  ngAfterViewInit(): void {
    this.loadLanguages();
  }


  ngAfterViewChecked(): void {
    if (this.languageList.length == 0 && ((!this.languageSubscription) ||
       (this.languageSubscription && this.languageSubscription.closed)))
      this.loadLanguages();
  }

  loadLanguages(): void {
    console.log("waiting for languages...");
    this.languageSubscription =  this.injector.get(WordsetService).getAllLanguages().subscribe( x => {
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
    this.exercise = this.injector.get(WordsetService).newExercise(this.exercise.template);
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
    this.loadComponent();
  }
  
  createTranslateSentenceExercise(): void {
    this.exercise = new TranslateSentenceExerciseTemplateComponent(this.injector);
    this.exercise.setViewOption(ViewOption.Create);
    this.loadComponent();
  }
  
  createFillSentenceExercise(): void {
    this.exercise = new FillSentenceExerciseTemplateComponent(this.injector);
    this.exercise.setViewOption(ViewOption.Create);
    this.loadComponent();
  }

  addExercise(): void {
    if(!$(".word-left").val() || !$(".word-right").val() || ($(".word-fill").length != 0 && !$(".word-fill").val())){
      if(!$(".word-left").val()) $(".word-left").addClass('bg-error')
      if(!$(".word-right").val())$(".word-right").addClass('bg-error')
      if($(".word-fill") && !$(".word-fill").val())$(".word-fill").addClass('bg-error')
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
    while (this.files.length != 0){
      let newFile = new fileInfo();
      let imageBuble = this.files.pop();
      newFile.add(imageBuble, id, imageBuble.type)
      this.addedFile.push(newFile);
    }
    // console.log("this.set",this.set.exercises[0]);
    this.loadComponent();
    this.exerciseHosts.changes.subscribe( x => {this.loadComponent2();})
  }

  removeError(idclass:string){
    $(idclass).removeClass('bg-error')
  }

  saveLesson(): void {
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
      alert("Fill set name!")
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
        alert("Can't add the file of a type " + imageBuble.type.split("/", 1)[0] + '!')
      }
  
      if(canAddTheFile && correctTypes){
        this.files.push(...event.addedFiles);
      }
  
      if (!canAddTheFile) {
        alert("There is already one " + imageBuble.type.split("/", 1)[0] + '!')
      }
    }
    else {
      alert("You can only add 3 files! (One image, one video, one audio)")
    }
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
