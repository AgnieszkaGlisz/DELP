import { WordsetService } from './../_services/wordset.service';
import { SetInfo } from './../_interfaces/setInfo';
import { ExerciseTemplate } from './../_interfaces/exerciseTemplate';
import { FillSentenceExerciseTemplate } from './../_interfaces/fillSentenceTemplate';
import { Component, OnInit } from '@angular/core';
import { Set } from '../_interfaces/set';
import { TranslateSentenceExerciseTemplate } from '../_interfaces/translateSentenceTemplate';
import { WordExerciseTemplate } from '../_interfaces/translateWordTemplate';
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
  exercise: ExerciseTemplate;
  createExercise: any;

  exerciseInput: boolean;  
  
  ngOnInit(): void {
    this.set = new Set();
    this.set.exercises = new Array<ExerciseTemplate>();
    this.set.setInfo = new SetInfo();
    this.exerciseInput = false;
  }
  
  // deleteExercise(exercise: IExerciseTemplate): void {
  //   // TODO: implemantation of method
  // }
  
  createWordExercise(): void {
    this.exercise = new WordExerciseTemplate();
    this.exercise.template = "WordExerciseTemplate";
    this.exerciseInput = true;
  }
  
  createTranslateSentenceExercise(): void {
    this.exercise = new TranslateSentenceExerciseTemplate();
    this.exercise.template = "TranslateSentenceExerciseTemplate";
    this.exerciseInput = true;
    // this.exercise.createExerciseInputHTML();

    // this.createAddExerciseButton();
  }
  
  createFillSentenceExercise(): void {
    this.exercise = new FillSentenceExerciseTemplate();
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
    this.exercise.addExerciseToSet(this.set);
  }

  saveLesson(): void {
    this.set.saveSet();
    console.log("lesson: ", this.set);
    this.wordsetService.saveWordset(this.set).subscribe( x=> {
      console.log("set id ", x);
    });
  }
}
