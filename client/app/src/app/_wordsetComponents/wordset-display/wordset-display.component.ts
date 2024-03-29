import { ViewOption } from './../../_exercisesComponents/view-option-enum';
import { ExerciseListDirective } from './../../exercise-list.directive';
import { FillSentenceExerciseTemplateComponent } from './../../_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './../../_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { ExerciseItem } from './../../exercise-item';
import { Wordset } from './../../_interfaces/wordset';
import { Set } from './../../_interfaces/set';
import { WordsetService } from './../../_services/wordset.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewChildren, Input, Type, QueryList, AfterViewInit } from '@angular/core';
import { ExerciseDirective } from './../../exercise.directive';
import { SetInfo } from './../../_interfaces/setInfo';

@Component({
  selector: 'app-wordset-display',
  templateUrl: './wordset-display.component.html',
  styleUrls: ['./wordset-display.component.css']
})
export class WordsetDisplayComponent implements OnInit, AfterViewInit {

  constructor(
    private wordsetService: WordsetService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  set: Set;

  @ViewChildren(ExerciseListDirective) exerciseHosts: QueryList<ExerciseListDirective>;

  ngOnInit() {
    this.set = new Set();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
    // this.getWordset();
  }

  ngAfterViewInit(): void {
    // console.log(this.set.exercises)
    this.getWordset();
    // this.loadComponent2();
    this.exerciseHosts.changes.subscribe( x => {this.loadComponent2();})
  }

  getWordset(): void {
    this.wordsetService.getWordset().subscribe(x => {
        // this.set = new Set();
        // this.set.exercises = new Array<ExerciseTemplateComponent>();
        // this.set = x;
        let idx = 0;
        x.exercises.forEach(exer => {
          this.set.exercises[idx] = this.wordsetService.newExercise(exer.template);
          Object.assign(this.set.exercises[idx], exer);
          this.set.exercises[idx].setViewOption(ViewOption.Display);
          idx++;
        });
        // console.log(this.set.exercises);
        // this.loadComponent2();
      },
      err => console.log('HTTP Error: ', err)
    )
  }

  loadComponent2(): void {
    console.log(this.set.exercises);
    if(this.exerciseHosts){
      let index = 0;
      // console.log(this.exerciseHosts)
      // console.log(this.exerciseHosts.length)
      this.exerciseHosts.forEach(ex => {
        const viewContainer = ex.viewContainerRef;
        viewContainer.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.set.exercises[index].component);
        const compRef = viewContainer.createComponent<ExerciseTemplateComponent>(factory);
        compRef.changeDetectorRef.detach();
        compRef.instance.data = this.set.exercises[index].data;
        compRef.changeDetectorRef.detectChanges();
        index += 1;
      });
    }
  }

}
