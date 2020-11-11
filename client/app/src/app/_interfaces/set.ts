import { IExerciseTemplate } from './exerciseTemplate';
import { SetInfo } from './setInfo';
import { TranslateWordTemplate } from './translateWordTemplate';
export interface Set {
    setInfo: SetInfo,
    exercises: IExerciseTemplate[];
}