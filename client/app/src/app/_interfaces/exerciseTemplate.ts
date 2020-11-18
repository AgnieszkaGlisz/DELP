import { Set } from './set';
// export interface IExerciseTemplate {
//     id: number;
//     template: string;
//     videoPath: string;
//     audioPath: string;
//     picturePath: string;
// }

export class ExerciseTemplate {
    id: number;
    template: string;
    videoPath: string;
    audioPath: string;
    picturePath: string;

    addExerciseToSet(set: Set) {
        this.id = set.generateId();
    };

    displayExerciseHTML() { }

    createExerciseInputHTML() { }

    deleteExercise(set: Set): void {
        set.exercises = set.exercises.filter(w => w !== this);
    }
}