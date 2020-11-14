import { IExerciseTemplate } from './exerciseTemplate';
export interface FillSentenceExerciseTemplate extends IExerciseTemplate {
    leftPartOfSentence: string;
    wordToFill: string;
    rightPartOfSentance: string;
    incorrectWords: {"word": string}[];
    template: "FillSentenceExerciseTemplate";
}