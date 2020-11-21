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
import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { send } from 'process';
//import { userInfo } from 'os';

@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  set: Wordset;
  exercise: WordExerciseTemplateComponent;

  //@Input() exerciseItems: ExerciseItem[];
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  

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
    //const tmp = new WordExerciseTemplateComponent();
    //Object.assign(tmp.data, this.exercise.data);
    //this.exercise.word = this.exercise.data.word;
    //this.exercise.translation = this.exercise.data.translation;
    this.set.addExerciseToSet(this.exercise);
    this.loadComponent();
  }

  saveSet(): void {
    this.set.saveSet();
    this.wordsetService.saveWordset(this.set).subscribe(x => {
    });
  }

  deleteExercise(exerciseI: WordExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
  }
  
}
