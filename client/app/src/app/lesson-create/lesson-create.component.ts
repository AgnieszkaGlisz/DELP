import { ExerciseTemplateComponent } from './../exercise-template.component';
import { FillSentenceExerciseTemplateComponent } from './../fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './../translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './../word-exercise-template/word-exercise-template.component';
import { WordsetService } from './../_services/wordset.service';
import { SetInfo } from './../_interfaces/setInfo';
import { Component, OnInit } from '@angular/core';
import { Set } from '../_interfaces/set';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})

export class LessonCreateComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private wordsetService: WordsetService, 
  ) { }

  set: Set;
  exercise: ExerciseTemplateComponent;
  createExercise: any;

  exerciseInput: boolean;  
  
  ngOnInit(): void {
    this.set = new Set();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    this.exerciseInput = false;
  }
  
  // deleteExercise(exercise: IExerciseTemplate): void {
  //   // TODO: implemantation of method
  // }
  
  createWordExercise(): void {
    // this.exercise = new WordExerciseTemplateComponent();
    // this.exercise.template = "WordExerciseTemplate";
    // this.exerciseInput = true;
  }
  
  createTranslateSentenceExercise(): void {
    this.exercise = new TranslateSentenceExerciseTemplateComponent();
    this.exercise.template = "TranslateSentenceExerciseTemplate";
    this.exerciseInput = true;
    // this.exercise.createExerciseInputHTML();

    // this.createAddExerciseButton();
  }
  
  createFillSentenceExercise(): void {
    this.exercise = new FillSentenceExerciseTemplateComponent();
    this.exercise.template = "FillSentenceExerciseTemplate";
    this.exerciseInput = true;
    // this.exercise.createExerciseInputHTML();

    // this.createAddExerciseButton();
  }

  createAddExerciseButton(): void {
    this.createExercise = this.sanitizer.bypassSecurityTrustHtml("<button (click)='addExerciseToSet()'>+</button>");

    // FIXME: to nie działa, trzeba znaleźc inne rozwiązanie na dynamiczne tworzenie guzików
  }

  addExerciseToSet(): void {
    console.log("no hej");
    this.exerciseInput = false;
    // this.exercise.addExerciseToSet(this.set);
  }

  saveLesson(): void {
    this.set.saveSet();
    console.log("lesson: ", this.set);
    this.wordsetService.saveWordset(this.set).subscribe( x=> {
      console.log("set id ", x);
    });
  }
}
