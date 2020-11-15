import { ExerciseTemplate } from './exerciseTemplate';
import { SetInfo } from './setInfo';
export class Set {
    setInfo: SetInfo;
    exercises: ExerciseTemplate[];

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
}