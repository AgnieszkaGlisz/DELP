import { Set } from './../../_interfaces/set';
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
  set: Set;
  // exercise: ExerciseTemplateComponent;
  exercise: ExerciseTemplateComponent;// = new ExerciseTemplateComponent();
  // answer: any = { value: ''};
  wordIndex: number;
  result: string = "";
  hint: string ="";

  correctAnswer: boolean;

  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  ngOnInit(): void {
    this.wordIndex = -1;
    this.set = new Set();
    // this.exercise= new ExerciseTemplateComponent();
    // this.exercise= new WordExerciseTemplateComponent();
    // this.getWordset();
    // this.exercise= <WordExerciseTemplateComponent>this.wordset.exercises[0];
  }

  ngAfterViewInit(): void {
    this.getWordset();
    // this.loadComponent();
  }

  loadComponent(): void {
    this.correctAnswer = true;
    this.exercise.data = this.exercise;
    this.exercise.setUrl(this.wordsetService.url);
    if (this.exercise.picturePath) {
      this.exercise.setViewOption(ViewOption.LearnImage);
    }
    else if (this.exercise.audioPath) {
      this.exercise.setViewOption(ViewOption.LearnAudio);
    }
    else if (this.exercise.videoPath) {
      this.exercise.setViewOption(ViewOption.LearnVideo);
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
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
        this.set = new Set();
        Object.assign(this.set, x);
        this.set = x;
        let idx = 0;
        this.exercise = this.wordsetService.newExercise(this.set.exercises[0].template);
        x.exercises.forEach(exer => {
          this.set.exercises[idx] = this.wordsetService.newExercise(exer.template);
          Object.assign(this.set.exercises[idx], exer);
          console.log(this.set.exercises[idx])
          idx++;
        })

        this.nextWord();
        // this.loadComponent();
  },
      err => console.log('HTTP Error: ', err)
    )
  }

  nextWord(): void {
    this.result = "";
    this.hint = "";
    this.correctAnswer == true;
    this.exercise.data.answer = '';
    if(this.wordIndex < this.set.exercises.length - 1)
    {
      this.wordIndex += 1;
      // this.word
      this.exercise= this.set.exercises[this.wordIndex];
    }
    else
    {
      this.result = "You've finished this set!";
    }
    this.loadComponent();
  }

  showHint(): void {
    this.hint = this.exercise.showHint();
  }

  checkWord(): void {
    this.correctAnswer = this.exercise.checkAnswer();
    if (this.correctAnswer) {
      this.result = "Correct!";
      this.nextWord();
    }
    else {
      this.result = "Wrong :c";
    }
    // if (this.exercise.data.answer == this.exercise.translation.toString())
    // {
    //     this.result = "Correct!";
    // }
    // else
    // {
    //     this.result = "Wrong :c";
    // }
    // console.log(this.exercise.translation);
    // console.log(this.answer.value);
  }

}
