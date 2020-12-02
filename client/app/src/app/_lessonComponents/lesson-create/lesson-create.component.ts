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
import { ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Language } from '../../_interfaces/language';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})

export class LessonCreateComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(
    private wordsetService: WordsetService, 
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

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
    this.languageSubscription = this.wordsetService.getAllLanguages().subscribe( x => {
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
      /*let tmpList = new Array<Language>();
      tmpList[0] = {code: "PL",
      id: 1,
      info: "PLinfo",
      name: "Polski"};
      tmpList[1] = {code: "EN",
      id: 2,
      info: "ENinfo",
      name: "Angielski"};
      Object.assign(this.languageList, tmpList);
      console.log("got languages", this.languageList, tmpList);*/
    }, 
    () => {
      console.log("languages", this.languageList);
    }
    )
  }
  
  loadComponent(): void {
    this.exercise = this.wordsetService.newExercise(this.exercise.template);
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
    this.exercise = new WordExerciseTemplateComponent();
    this.exercise.setViewOption(ViewOption.Create);
    this.loadComponent();
  }
  
  createTranslateSentenceExercise(): void {
    this.exercise = new TranslateSentenceExerciseTemplateComponent();
    this.exercise.setViewOption(ViewOption.Create);
    this.loadComponent();
  }
  
  createFillSentenceExercise(): void {
    this.exercise = new FillSentenceExerciseTemplateComponent();
    this.exercise.setViewOption(ViewOption.Create);
    this.loadComponent();
  }

  addExercise(): void {
    // console.log(this.exercise);
    this.exercise.setViewOption(ViewOption.Display);
    this.set.addExerciseToSet(this.exercise);   
    // console.log("this.set",this.set.exercises[0]);
    this.loadComponent();
    this.exerciseHosts.changes.subscribe( x => {this.loadComponent2();})
  }

  saveLesson(): void {
    //console.log("lang12",this.lang1, this.lang2);
    this.set.setInfo.idBaseLanguage = this.lang1.value.id;
    this.set.setInfo.idLearnLanguage = this.lang2.value.id;
    this.set.saveSet();
    this.wordsetService.saveWordset(this.set).subscribe(x => {
    });
  }

  deleteExercise(exerciseI: ExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
  }
}
