import { Set } from './set';
import { ExerciseTemplate } from './exerciseTemplate';
export class WordExerciseTemplate extends ExerciseTemplate  {
    template: "WordExerciseTemplate";
    idSet: number;
    word: string;
    translation: string;

    public addExerciseToSet(set: Set) {
        super.addExerciseToSet(set);
        this.template = "WordExerciseTemplate";
        let exerciseCopy = new WordExerciseTemplate();
        let sth = Object.assign(exerciseCopy, this);
        
        set.exercises.push(exerciseCopy);
    }

    public displayExerciseHTML() {
        let listOfExercises = document.getElementById("exercise-in-lesson-create");
        listOfExercises.innerHTML += "\
        <a>\
            <span>{{exercise.id}}</span>\
            <span>{{exercise.word}}</span>\
            <span>{{exercise.translation}}</span>\
        </a>\
        ";
    }

    public createExerciseInputHTML() {
        let createExDiv = document.getElementById("create-exercise");
        createExDiv.innerHTML = "\
        <input [(ngModel)]='exercise.word' placeholder='word'/> \
        <input [(ngModel)]='exercise.translation' placeholder='translation'/> \
        ";
    }
}