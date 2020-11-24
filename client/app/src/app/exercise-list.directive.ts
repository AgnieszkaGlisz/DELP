import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[exerciseListHost]'
})
export class ExerciseListDirective {
  
  constructor(public viewContainerRef: ViewContainerRef) { }

}
