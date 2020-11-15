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

        console.log("exerciseCopy", exerciseCopy);
        console.log("sth", sth);

        set.exercises.push(exerciseCopy);
    }
}