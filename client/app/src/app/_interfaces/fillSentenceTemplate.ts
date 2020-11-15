import { Set } from './set';
import { ExerciseTemplate } from './exerciseTemplate';
// export interface FillSentenceExerciseTemplate extends IExerciseTemplate {
//     leftPartOfSentence: string;
//     wordToFill: string;
//     rightPartOfSentance: string;
//     incorrectWords: {"word": string}[];
//     template: "FillSentenceExerciseTemplate";
// }

export class FillSentenceExerciseTemplate extends ExerciseTemplate {
    template: "FillSentenceExerciseTemplate";
    leftPartOfSentence: string;
    wordToFill: string;
    rightPartOfSentance: string;
    incorrectWords: {"word": string}[];

    addExerciseToSet(set: Set) {
        // TODO: implementation of method
    }
}