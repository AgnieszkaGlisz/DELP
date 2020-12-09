import { ViewOption } from '../_sets/_exercisesComponents/view-option-enum';
import { Set } from './set';
import { Type } from '@angular/core';
export interface ExerciseTemplateComponent {
    data: any;
    component: Type<any>;

    picturePath: string
    id: number;
    template: string;
    videoPath: string;
    audioPath: string;

    setViewOption(view: ViewOption);
    setUrl(url: string);
    checkAnswer(): boolean;
    showHint(): string;
    // viewOption: ViewOption;
}