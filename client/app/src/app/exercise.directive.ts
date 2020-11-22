import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[exerciseHost]'
})
export class ExerciseDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
