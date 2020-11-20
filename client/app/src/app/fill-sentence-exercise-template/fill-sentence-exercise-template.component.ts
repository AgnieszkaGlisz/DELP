import { ExerciseTemplateComponent } from './../exercise-template.component';
import { Set } from './../_interfaces/set';
// import { FillSentenceExerciseTemplate } from './../_interfaces/fillSentenceTemplate';
// import { ExerciseTemplate } from '../_interfaces/exerciseTemplate';
import { Component, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-fill-sentence-exercise-template',
  templateUrl: './fill-sentence-exercise-template.component.html',
  styleUrls: ['./fill-sentence-exercise-template.component.css']
})
export class FillSentenceExerciseTemplateComponent implements ExerciseTemplateComponent {

  // constructor() {
  //   super();
  // }

  ngOnInit(): void {
  }

  template: "FillSentenceExerciseTemplate";
  leftPartOfSentence: string;
  wordToFill: string;
  rightPartOfSentence: string;
  incorrectWords: {"word": string}[];
  @Input() data: any;
  component: Type<any>;

  id: number;
    videoPath: string;
    audioPath: string;
    picturePath: string;

  addExerciseToSet(set: Set) {
    // super.addExerciseToSet(set);
    this.template = "FillSentenceExerciseTemplate";
    let exerciseCopy = new FillSentenceExerciseTemplateComponent();
    let sth = Object.assign(exerciseCopy, this);
    
    set.exercises.push(exerciseCopy);
  }

  public displayExerciseHTML() {
    let listOfExercises = document.getElementById("exercise-in-lesson-create");
    listOfExercises.innerHTML += "\
    <a>\
        <span>{{exercise.id}}</span>\
        <span>{{exercise.leftPartOfSentence}}</span>\
        <span>{{exercise.wordToFill}}</span>\
        <span>{{exercise.rightPartOfSentence}}</span>\
    </a>\
    ";
  }

  public createExerciseInputHTML() {
    let createExDiv = document.getElementById("create-exercise");
    createExDiv.innerHTML = "\
    <input [(ngModel)]='exercise.leftPartOfSentence' placeholder='leftPartOfSentence'/> \
    <input [(ngModel)]='exercise.wordToFill' placeholder='wordToFill'/> \
    <input [(ngModel)]='exercise.rightPartOfSentence' placeholder='rightPartOfSentence'/> \
    ";
  }

}
