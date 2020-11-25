import { ExerciseDirective } from './../../exercise.directive';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { Wordset } from './../../_interfaces/wordset';
import { WordsetService } from './../../_services/wordset.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ViewOption } from 'src/app/_exercisesComponents/view-option-enum';

@Component({
  selector: 'app-wordset-learn',
  templateUrl: './wordset-learn.component.html',
  styleUrls: ['./wordset-learn.component.css']
})
export class WordsetLearnComponent implements OnInit, AfterViewInit {

  constructor(
    private wordsetService: WordsetService,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }
  wordset: Wordset;
  // exercise: ExerciseTemplateComponent;
  exercise: WordExerciseTemplateComponent = new WordExerciseTemplateComponent();
  // answer: any = { value: ''};
  wordIndex: number;
  result: string = "";

  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  ngOnInit(): void {
    this.wordIndex = -1;
    this.wordset = new Wordset();
    // this.exercise= new ExerciseTemplateComponent();
    // this.exercise= new WordExerciseTemplateComponent();
    // this.getWordset();
    // this.exercise= <WordExerciseTemplateComponent>this.wordset.exercises[0];
  }

  ngAfterViewInit(): void {
    // this.loadComponent();
    this.getWordset();
  }

  loadComponent(): void {
    this.exercise.data = this.exercise;
    this.exercise.setViewOption(ViewOption.Learn);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WordExerciseTemplateComponent);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);

    componentRef.changeDetectorRef.detach();
    componentRef.instance.data = this.exercise.data;
    componentRef.changeDetectorRef.detectChanges();
  }

  getWordset(): void {
    this.wordsetService.getWordset().subscribe(
      x => {
        this.wordset = new Wordset();
        Object.assign(this.wordset, x);
        this.wordset = x;
        let idx = 0;
        x.exercises.forEach(exer => {
          console.log("exer", exer);
          console.log(this.wordset.exercises[idx]);
          this.wordset.exercises[idx] = new WordExerciseTemplateComponent();
          Object.assign(this.wordset.exercises[idx], exer);
          idx++;
        })

        this.nextWord();
      },
      err => console.log('HTTP Error: ', err)
    )
  }

  nextWord(): void {
    this.result = "";
    this.exercise.data.answer = '';
    if(this.wordIndex < this.wordset.exercises.length - 1)
    {
      this.wordIndex += 1;
      // this.word
      this.exercise= <WordExerciseTemplateComponent>this.wordset.exercises[this.wordIndex];
    }
    else
    {
      this.result = "You've finished this set!";
    }
    this.loadComponent();
  }

  checkWord(): void {
    console.log("this.exercise.data.answer", this.exercise.data.answer)
    if (this.exercise.data.answer == this.exercise.translation.toString())
    {
        this.result = "Correct!";
    }
    else
    {
        this.result = "Wrong :c";
    }
    // console.log(this.exercise.translation);
    // console.log(this.answer.value);
  }

}
