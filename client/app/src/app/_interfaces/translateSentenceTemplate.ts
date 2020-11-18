import { Set } from './set';
import { ExerciseTemplate } from './exerciseTemplate';
export class TranslateSentenceExerciseTemplate extends ExerciseTemplate {
    template: "TranslateSentenceExerciseTemplate";
    oryginalSentence: string;
    translatedSentence: string;

    public addExerciseToSet(set: Set) {
        super.addExerciseToSet(set);
        this.template = "TranslateSentenceExerciseTemplate";
        let exerciseCopy = new TranslateSentenceExerciseTemplate();
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