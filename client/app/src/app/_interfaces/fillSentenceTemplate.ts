import { IExerciseTemplate } from './exerciseTemplate';
export interface FillSentenceExerciseTemplate extends IExerciseTemplate {
    originalSentence: string;
    translatedSentance: string;
}