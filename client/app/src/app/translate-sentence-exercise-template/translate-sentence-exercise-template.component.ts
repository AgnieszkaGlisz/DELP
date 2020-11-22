import { ExerciseTemplateComponent } from './../exercise-template.component';
import { Set } from './../_interfaces/set';
import { Component, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-translate-sentence-exercise-template',
  templateUrl: './translate-sentence-exercise-template.component.html',
  styleUrls: ['./translate-sentence-exercise-template.component.css']
})
export class TranslateSentenceExerciseTemplateComponent implements ExerciseTemplateComponent {

    constructor() {
        //   super();
          //this.template = "WordExerciseTemplate";
          this.component = TranslateSentenceExerciseTemplateComponent;
          //this.data = this;
        }


  template: "TranslateSentenceExerciseTemplate";
    oryginalSentence: string;
    translatedSentence: string;
    @Input() data: any = this;
    component: Type<any>;

    id: number;
    videoPath: string;
    audioPath: string;
    picturePath: string;

    public addExerciseToSet(set: Set) {
        // super.addExerciseToSet(set);
        this.template = "TranslateSentenceExerciseTemplate";
        let exerciseCopy = new TranslateSentenceExerciseTemplateComponent();
        let sth = Object.assign(exerciseCopy, this);
        
        set.exercises.push(exerciseCopy);
    }

    public displayExerciseHTML() {
        let listOfExercises = document.getElementById("exercise-in-lesson-create");
        listOfExercises.innerHTML += "\
        <a>\
            <span>{{exercise.id}}</span>\
            <span>{{exercise.oryginalSentence}}</span>\
            <span>{{exercise.translatedSentence}}</span>\
        </a>\
        ";
    }

    public createExerciseInputHTML() {
        let createExDiv = document.getElementById("create-exercise");
        createExDiv.innerHTML = "\
        <input [(ngModel)]='exercise.oryginalSentence' placeholder='oryginalSentence'/> \
        <input [(ngModel)]='exercise.translatedSentence' placeholder='translatedSentence'/> \
        ";
    }

}
