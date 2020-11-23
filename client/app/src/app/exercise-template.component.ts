import { FillSentenceExerciseTemplateComponent } from './_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { Set } from './_interfaces/set';
import { Type } from '@angular/core';
export interface ExerciseTemplateComponent {
    data: any;
    component: Type<any>;

    picturePath: string
    id: number;
    template: string;
    videoPath: string;
    audioPath: string;

    // new(): WordExerciseTemplateComponent;
    // new(): TranslateSentenceExerciseTemplateComponent;
    // new(): FillSentenceExerciseTemplateComponent;
    
}