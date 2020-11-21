import { ExerciseTemplateComponent } from './../exercise-template.component';
import { Set } from './../_interfaces/set';
import { notJsoned } from './../_interfaces/set';
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
    this.data = this;
  }

  //@notJsoned() 
  @Input() data: any;//{word: 'xd', translation: 'heh'};
  word: string;
  translation: string;
  
  set: Set;
  idSet: number;
  component: Type<any>;

  id: number;
  template: string = "WordExerciseTemplate";
  videoPath: string;
  audioPath: string;
  picturePath: string;

  toJSON(){
    return { "id" : this.id, "template" : this.template, "word": this.word, "translation" : this.translation};
  }

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
