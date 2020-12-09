import { ViewOption } from '../_sets/_exercisesComponents/view-option-enum';
import { Type } from '@angular/core';
export interface ExerciseTemplateComponent {
    data: any;
    component: Type<any>;

    id: number;
    template: string;
    picturePath: string
    videoPath: string;
    audioPath: string;

    setViewOption(view: ViewOption);
    setUrl(url: string);
    checkAnswer(): boolean;
    showHint(): string;
}

