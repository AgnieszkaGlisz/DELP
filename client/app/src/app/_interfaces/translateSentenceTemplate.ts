import { TranslateWordTemplate } from './translateWordTemplate';
import { IExerciseTemplate } from './exerciseTemplate';
export interface TranslateSentenceExerciseTemplate extends IExerciseTemplate {
    leftPartOfSentance: string;
    wordToFill: string;
    rightPartOfSentance: string;
    incorrectWords: {"word": string}[];
}