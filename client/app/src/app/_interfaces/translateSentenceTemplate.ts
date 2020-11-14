import { TranslateWordTemplate } from './translateWordTemplate';
import { IExerciseTemplate } from './exerciseTemplate';
export interface TranslateSentenceExerciseTemplate extends IExerciseTemplate {
    originalSentence: string;
    translatedSentance: string;
    template: "TranslateSentenceExerciseTemplate";
}