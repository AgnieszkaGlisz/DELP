import { FillSentenceExerciseTemplate } from './../_interfaces/fillSentenceTemplate';
import { Component, OnInit } from '@angular/core';
import { Set } from '../_interfaces/set';
import { TranslateSentenceExerciseTemplate } from '../_interfaces/translateSentenceTemplate';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

  constructor() { }

  set: Set;
  // set = <Set>{};
  // setName: string;
  // setInfo: string;

  
  
  ngOnInit(): void {
    this.set = <Set>{};
  }
  
  // deleteExercise(exercise: IExerciseTemplate): void {
  //   // TODO: implemantation of method
  // }
  
  // wordExercise: TranslateWordTemplate;
  // createWordExercise(): void {
  //   // TODO: implementation of method
  //   let createExDiv = document.getElementById("create-exercise");
  //   createExDiv.innerHTML = "\
  //   <input [(ngModel)]='wordExercise.word' placeholder='word'/> \
  //   <input [(ngModel)]='wordExercise.translation' placeholder='translation'/> \
  //   ";

  //   this.createAddExerciseButton();
  // }
  
  // translateExercise: TranslateSentenceExerciseTemplate;
  // createTranslateSentenceExercise(): void {
  //   // TODO: implementation of method
  // }
  
  // fillSentenceExercise: FillSentenceExerciseTemplate;
  // createFillSentenceExercise(): void {
  //   // TODO: implementation of method
  // }

  // createAddExerciseButton(): void {
  //   let createExDiv = document.getElementById("create-exercise");
  //   createExDiv.innerHTML += "\
  //   <button (click)='addExercise()'>+</button>";
  // }

  // addExercise(): void {
  // }

  // saveLesson(): void {
  //   // TODO: implementation of method
  // }
}
