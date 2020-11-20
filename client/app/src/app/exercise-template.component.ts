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
    
    // addExerciseToSet(set: Set);

    // addExerciseToSet(set: Set) {
    //     this.id = set.generateId();
    // }
}