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

  set: Wordset;
  exercise: WordExerciseTemplateComponent;

  // @Input() exerciseItems: ExerciseItem[];
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  constructor(
    private wordsetService: WordsetService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  ngOnInit(): void {
    this.set = new Wordset();
    this.set.exercises = Array<WordExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    this.exercise = new WordExerciseTemplateComponent();
    // this.exerciseItems = new Array<ExerciseItem>();
    this.loadComponent();
  }

  loadComponent(): void {
    // const currentExercise = this.exe
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordExerciseTemplateComponent);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);

    componentRef.instance.data = this.exercise.data; 
  }

  addExercise(): void {
    this.set.addExerciseToSet(this.exercise);
  }

  saveSet(): void {
    this.set.saveSet();
    this.wordsetService.saveWordset(this.set).subscribe(x => {
    });
  }

  deleteExercise(): void {
    this.set.deleteExercise(this.exercise);
  }
  
}
