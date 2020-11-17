import { ExerciseTemplate } from './../_interfaces/exerciseTemplate';
import { FillSentenceExerciseTemplate } from './../_interfaces/fillSentenceTemplate';
import { Component, OnInit } from '@angular/core';
import { Set } from '../_interfaces/set';
import { TranslateSentenceExerciseTemplate } from '../_interfaces/translateSentenceTemplate';
import { WordExerciseTemplate } from '../_interfaces/translateWordTemplate';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

  constructor() { }

  set: Set;
  exercise: ExerciseTemplate;
  // set = <Set>{};
  // setName: string;
  // setInfo: string;

  
  
  ngOnInit(): void {
    this.set = new Set();
  }
  
  // deleteExercise(exercise: IExerciseTemplate): void {
  //   // TODO: implemantation of method
  // }
  
  createWordExercise(): void {
    this.exercise = new WordExerciseTemplate();
    this.exercise.createExerciseInputHTML();

    this.createAddExerciseButton();
  }
  
  createTranslateSentenceExercise(): void {
    this.exercise = new TranslateSentenceExerciseTemplate();
    this.exercise.createExerciseInputHTML();

    this.createAddExerciseButton();
  }
  
  createFillSentenceExercise(): void {
    this.exercise = new FillSentenceExerciseTemplate();
    this.exercise.createExerciseInputHTML();

    this.createAddExerciseButton();
  }

  createAddExerciseButton(): void {
    let createExDiv = document.getElementById("create-exercise");
    createExDiv.innerHTML += "\
    <button (click)='addExerciseToSet()'>+</button>";
    // FIXME: to nie działa, trzeba znaleźc inne rozwiązanie na dynamiczne tworzenie guzików
  }

  addExerciseToSet(): void {
    // console.log("no hej");
    this.exercise.addExerciseToSet(this.set)
  }

  saveLesson(): void {
    // TODO: implementation of method
  }
}
