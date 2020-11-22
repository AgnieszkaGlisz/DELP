import { FillSentenceExerciseTemplateComponent } from './../../_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './../../_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { ExerciseItem } from './../../exercise-item';
import { Wordset } from './../../_interfaces/wordset';
import { WordsetService } from './../../_services/wordset.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewChildren, Input, Type } from '@angular/core';
import { ExerciseDirective } from './../../exercise.directive';
import { SetInfo } from './../../_interfaces/setInfo';

@Component({
  selector: 'app-wordset-display',
  templateUrl: './wordset-display.component.html',
  styleUrls: ['./wordset-display.component.css']
})
export class WordsetDisplayComponent implements OnInit {

  constructor(
    private wordsetService: WordsetService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }
  wordset: Wordset;

  @Input() exerciseItems: ExerciseItem[];
  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;
  // @ViewChildren(ExerciseDirective) exerciseHost: ExerciseDirective;
  idToDis: number;
  // words: TranslateWordTemplate[];

  ngOnInit() {
    this.wordset = new Wordset();
    this.wordset.exercises = new Array<ExerciseTemplateComponent>();
    this.wordset.setInfo = new SetInfo();
    this.exerciseItems = new Array<ExerciseItem>();
    this.getWordset();
    // console.log(this.wordset);
    this.idToDis = 0;
  }

  // wordsetIntoExerciseItems(exercise): void {

  // }

  getWordset() {
    this.wordsetService.getWordset().subscribe(
      // this.wordsetService.getWordset('1').subscribe(
      x => {
        this.wordset = x;
        console.log(this.wordset);
        
        this.exerciseItems.push(new ExerciseItem(this.wordsetService.getExerciseComponent(this.wordset.exercises[0].template), this.wordset.exercises[0]))
        this.loadComponent();
    // this.words = x.exercises;
        // x.excercises.length;
        // console.log('Wordset: ', x);
        // this.exerciseItems.push(new ExerciseItem(x.exercises[0].component, x.exercises[0]));
        // this.loadComponent();
        // this.loadComponent();
      },
      err => console.log('HTTP Error: ', err)
    );
  }

  

  loadComponent(): void {
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exerciseItems[0].component);
    this.idToDis++;
    console.log(this);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);

    // console.log(componentRef);
    // console.log(this.exerciseItems[0].data);
    componentRef.instance.data = this.exerciseItems[0].data; 
  }

}
