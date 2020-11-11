import { IExerciseTemplate } from './exerciseTemplate';
import { SetInfo } from './setInfo';
import { TranslateWordTemplate } from './translateWordTemplate';
export interface Wordset {
    setInfo: SetInfo,
    exercises: IExerciseTemplate[];
}