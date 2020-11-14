import { IExerciseTemplate } from './exerciseTemplate';
export interface TranslateWordTemplate extends IExerciseTemplate  {
    idSet: number;
    word: string;
    translation: string;
    template: "WordExerciseTemplate";
}