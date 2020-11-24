import { ExerciseTemplateComponent } from './../exercise-template.component';
import { SetInfo } from './setInfo';

export class Set {
    setInfo: SetInfo;
    exercises: ExerciseTemplateComponent[];

    saveSet(): void {
        this.setInfo.id = null;
        // this.setInfo.name = null;
        // this.setInfo.info = null;
        this.setInfo.idCreator = null;
        this.setInfo.setCreation = null;
        this.setInfo.idBaseLanguage = 0;
        this.setInfo.idLearnLanguage = 0;
        this.setInfo.popularity = 0;
        this.setInfo.ifAudio = false;
        this.setInfo.ifPicture = false;
        this.setInfo.ifVideo = false;
    }

    generateId(): number {
        return this.exercises.length > 0 ? Math.max(...this.exercises.map(word => word.id)) + 1 : 1;
    }

    deleteExercise(exercise: ExerciseTemplateComponent) {
        this.exercises = this.exercises.filter(w => w.id !== exercise.id);
    }

    public addExerciseToSet(exercise: ExerciseTemplateComponent) : boolean{
        exercise.id = this.generateId();
        let exerciseCopy = new exercise.component();
        Object.assign(exerciseCopy, exercise);
        exerciseCopy.data = exerciseCopy;
        this.exercises.push(exerciseCopy);
        return true;
    }

}