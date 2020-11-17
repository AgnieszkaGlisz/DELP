import { Set } from './set';
import { ExerciseTemplate } from './exerciseTemplate';
export class TranslateSentenceExerciseTemplate extends ExerciseTemplate {
    template: "TranslateSentenceExerciseTemplate";
    originalSentence: string;
    translatedSentance: string;

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
            <span>{{exercise.originalSentence}}</span>\
            <span>{{exercise.translatedSentance}}</span>\
        </a>\
        ";
    }

    public createExerciseInputHTML() {
        let createExDiv = document.getElementById("create-exercise");
        createExDiv.innerHTML = "\
        <input [(ngModel)]='exercise.originalSentence' placeholder='originalSentence'/> \
        <input [(ngModel)]='exercise.translatedSentance' placeholder='translatedSentance'/> \
        ";
    }
}