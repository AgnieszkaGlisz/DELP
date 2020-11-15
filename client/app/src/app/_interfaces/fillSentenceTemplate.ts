import { Set } from './set';
import { ExerciseTemplate } from './exerciseTemplate';
// export interface FillSentenceExerciseTemplate extends IExerciseTemplate {
//     leftPartOfSentence: string;
//     wordToFill: string;
//     rightPartOfSentance: string;
//     incorrectWords: {"word": string}[];
//     template: "FillSentenceExerciseTemplate";
// }

export class FillSentenceExerciseTemplate extends ExerciseTemplate {
    template: "FillSentenceExerciseTemplate";
    leftPartOfSentence: string;
    wordToFill: string;
    rightPartOfSentance: string;
    incorrectWords: {"word": string}[];

    addExerciseToSet(set: Set) {
        super.addExerciseToSet(set);
        this.template = "FillSentenceExerciseTemplate";
        let exerciseCopy = new FillSentenceExerciseTemplate();
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
            <span>{{exercise.rightPartOfSentance}}</span>\
        </a>\
        ";
    }

    public createExerciseInputHTML() {
        let createExDiv = document.getElementById("create-exercise");
        createExDiv.innerHTML = "\
        <input [(ngModel)]='exercise.leftPartOfSentence' placeholder='leftPartOfSentence'/> \
        <input [(ngModel)]='exercise.wordToFill' placeholder='wordToFill'/> \
        <input [(ngModel)]='exercise.rightPartOfSentance' placeholder='rightPartOfSentance'/> \
        ";
    }
}