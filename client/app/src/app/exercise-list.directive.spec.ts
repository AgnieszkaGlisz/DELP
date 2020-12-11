import { ViewContainerRef } from '@angular/core';
import { ExerciseListDirective } from './exercise-list.directive';

describe('ExerciseListDirective', () => {
  it('should create an instance', () => {
    let contRef: ViewContainerRef;
    const directive = new ExerciseListDirective(contRef);
    expect(directive).toBeTruthy();
  });
});
