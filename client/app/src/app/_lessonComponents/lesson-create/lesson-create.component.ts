import { FillSentenceExerciseTemplateComponent } from './../../_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { ExerciseDirective } from './../../exercise.directive';
import { ExerciseItem } from './../../exercise-item';
// import { FillSentenceExerciseTemplateComponent } from './../_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './../../_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { WordsetService } from './../../_services/wordset.service';
import { SetInfo } from './../../_interfaces/setInfo';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, ViewContainerRef, Type, ɵConsole } from '@angular/core';
import { Set } from '../../_interfaces/set';
import { DomSanitizer } from '@angular/platform-browser'
import { ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})

export class LessonCreateComponent implements OnInit, AfterViewInit {

  constructor(
    private sanitizer: DomSanitizer,
    private wordsetService: WordsetService, 
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  set: Set;
  exercise: ExerciseTemplateComponent;
  createExercise: any;

  exerciseInput: boolean;  
  
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;
  @ViewChildren(ExerciseDirective) exersiseHosts: QueryList<ExerciseDirective>;

  ngOnInit(): void {
    this.set = new Set();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    this.exerciseInput = false;
  }

  ngAfterViewInit(): void {

  }

  newExercise(template: string) {
    switch (template) {
      case "WordExerciseTemplate":
        return new WordExerciseTemplateComponent();

      case "TranslateSentenceExerciseTemplate":
        return new TranslateSentenceExerciseTemplateComponent();

      case "FillSentenceExerciseTemplate":
        return new FillSentenceExerciseTemplateComponent();
    }
  }
  
  loadComponent(template: string): void {

    // this.exercise = new exerciseType();
    // this.exercise = this.newExercise(template)
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
    // console.log(this);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);
    componentRef.instance.data = this.exercise.data; 
    // console.log(this.set.exercises);

    console.log(this.set);

    
  }

  loadComponent2(): void {
    if(this.exersiseHosts && this.set.exercises[0] != undefined){
      // this.exersiseHosts.ViewContainerRef
      // this.exersiseHosts.viewContainerRef.clear();
      // this.set.exercises.forEach(ex => {
      //   const factory = this.componentFactoryResolver.resolveComponentFactory(ex.component);
      //   this.exersiseHosts.
      // })
      let index = 0;
      this.exersiseHosts.toArray().forEach(ex => {
        // console.log("this.exersiseHosts.length", this.exersiseHosts.length);
        // console.log("index", index);
        let currExercise = this.set.exercises[index++];
        const viewContainer = ex.viewContainerRef;
        viewContainer.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(currExercise.component);
        const compRef = viewContainer.createComponent<ExerciseTemplateComponent>(factory);
        console.log("currExercise", currExercise);
        compRef.instance.data = currExercise.data;

      });
      // index++;
    }
  }
  
  createWordExercise(): void {
    this.exercise = new WordExerciseTemplateComponent();
    this.loadComponent(this.exercise.template);
    //this.exercise.template = "WordExerciseTemplate";
    //this.exerciseInput = true;
  }
  
  createTranslateSentenceExercise(): void {
    this.exercise = new TranslateSentenceExerciseTemplateComponent();
    this.loadComponent(this.exercise.template);
    //this.exercise.template = "TranslateSentenceExerciseTemplate";
    //this.exerciseInput = true;
    // this.exercise.createExerciseInputHTML();

    // this.createAddExerciseButton();
  }
  
  createFillSentenceExercise(): void {
    this.exercise = new FillSentenceExerciseTemplateComponent();
    this.loadComponent(this.exercise.template);
    //this.exercise.template = "FillSentenceExerciseTemplate";
    //this.exerciseInput = true;
    // this.exercise.createExerciseInputHTML();

    // this.createAddExerciseButton();
  }

  addExercise(): void {
    // const tmp = new WordExerciseTemplateComponent();
    // Object.assign(tmp.data, this.exercise.data)
    console.log(this.exercise);
    this.set.addExerciseToSet(this.exercise);
    console.log("this.set",this.set);
    // this.exercise = this.newExercise(this.exercise.template);
    this.loadComponent2();
  }

  saveLesson(): void {
    this.set.saveSet();
    this.wordsetService.saveWordset(this.set).subscribe(x => {
    });
  }

  deleteExercise(exerciseI: ExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
  }
}
