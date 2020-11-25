import { View, ViewOption } from './../view-option-enum';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { Set } from './../../_interfaces/set';
// import { FillSentenceExerciseTemplate } from './../_interfaces/fillSentenceTemplate';
// import { ExerciseTemplate } from '../_interfaces/exerciseTemplate';
import { Component, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-fill-sentence-exercise-template',
  templateUrl: './fill-sentence-exercise-template.component.html',
  styleUrls: ['./fill-sentence-exercise-template.component.css']
})
export class FillSentenceExerciseTemplateComponent implements ExerciseTemplateComponent {

  constructor() {
    //   super();
      this.template = "FillSentenceExerciseTemplate";
      this.component = FillSentenceExerciseTemplateComponent;
      this.data = this;

      this.viewOption = new View(ViewOption.Create);
    }

  ngOnInit(): void {
  }

  template: "FillSentenceExerciseTemplate";
  leftPartOfSentence: string;
  wordToFill: string;
  answer: string;
  rightPartOfSentence: string;

  incorrectWords: {"word": string}[];
  @Input() data: any = this;
  component: Type<any>;
  viewOption: View;
  ViewOption = ViewOption;

  id: number;
  videoPath: string;
  audioPath: string;
  picturePath: string;

  // addExerciseToSet(set: Set) {
  //   // super.addExerciseToSet(set);
  //   this.template = "FillSentenceExerciseTemplate";
  //   let exerciseCopy = new FillSentenceExerciseTemplateComponent();
  //   let sth = Object.assign(exerciseCopy, this);
    
  //   set.exercises.push(exerciseCopy);
  // }

  setViewOption(view: ViewOption) {
    this.viewOption.type = view;
  }

  toJSON() {
    return {
      "id": this.id,
      "template": this.template,
      "leftPartOfSentence": this.leftPartOfSentence,
      "wordToFill": this.wordToFill,
      "rightPartOfSentence": this.rightPartOfSentence };
  }

  checkAnswer(): boolean {
    if(this.data.answer == this.wordToFill) {
      return true;
    }
    else return false;
  }
  
}
