import { ExerciseTemplateComponent } from './../exercise-template.component';
import { Set } from './../_interfaces/set';
import { Component, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-word-exercise-template',
  templateUrl: './word-exercise-template.component.html',
  styleUrls: ['./word-exercise-template.component.css']
})
export class WordExerciseTemplateComponent implements ExerciseTemplateComponent {

  constructor() {
  //   super();
    this.template = "WordExerciseTemplate";
    this.component = WordExerciseTemplateComponent;
    
  //   // console.log("jestem w konstruktorze");
  //   // super(WordExerciseTemplateComponent, {});
  //   // this.data = {template: "WordExerciseTemplateContent"}
  //   // console.log(this.data);
  }

  @Input() data: any = {word: 'xd', translation: 'heh'};
  set: Set;

  template: "WordExerciseTemplate";
  idSet: number;
  word: string;
  translation: string;
  component: Type<any>;

  id: number;
  videoPath: string;
  audioPath: string;
  picturePath: string;

  // public addExerciseToSet() {
  //   this.id = this.set.generateId();
  //   // super.addExerciseToSet(set);
  //   this.template = "WordExerciseTemplate";
  //   let exerciseCopy = new WordExerciseTemplateComponent();
  //   let sth = Object.assign(exerciseCopy, this);
    
  //   this.set.exercises.push(exerciseCopy);
  // }

  // deleteExercise(set: Set): void {
  //   set.exercises = set.exercises.filter(e => e !== this);
  // }

  // public displayExerciseHTML() {
  //     let listOfExercises = document.getElementById("exercise-in-lesson-create");
  //     listOfExercises.innerHTML += "\
  //     <a>\
  //         <span>{{exercise.id}}</span>\
  //         <span>{{exercise.word}}</span>\
  //         <span>{{exercise.translation}}</span>\
  //     </a>\
  //     ";
  // }

  // public createExerciseInputHTML() {
  //     let createExDiv = document.getElementById("create-exercise");
  //     createExDiv.innerHTML = "\
  //     <input [(ngModel)]='exercise.word' placeholder='word'/> \
  //     <input [(ngModel)]='exercise.translation' placeholder='translation'/> \
  //     ";
  // }

}
