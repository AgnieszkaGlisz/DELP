import { ViewOption } from './../view-option-enum';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { Set } from './../../_interfaces/set';
import { Component, Inject, Input, OnInit, Type } from '@angular/core';
import { View } from '../view-option-enum';


@Component({
  selector: 'app-word-exercise-template',
  templateUrl: './word-exercise-template.component.html',
  styleUrls: ['./word-exercise-template.component.css'],
  // providers: [ViewOption]
})
export class WordExerciseTemplateComponent implements ExerciseTemplateComponent {

  // constructor() {
  // //   super();
  //   this.template = "WordExerciseTemplate";
  //   this.component = WordExerciseTemplateComponent;
  //   this.data = this;
  // }

  constructor() {
    // this.viewOption = view;

    this.template = "WordExerciseTemplate";
    this.component = WordExerciseTemplateComponent;
    this.data = this;

    this.viewOption = new View(ViewOption.Create);
  }

  @Input() data: any;
  word: string;
  translation: string;
  
  set: Set;
  idSet: number;
  component: Type<any>;
  viewOption: View;
  ViewOption = ViewOption;

  id: number;
  template: string = "WordExerciseTemplate";
  videoPath: string;
  audioPath: string;
  picturePath: string;

  toJSON(){
    return { "id" : this.id, "template" : this.template, "word": this.word, "translation" : this.translation};
  }

  setViewOption(view: ViewOption) {
    this.viewOption.type = view;
  }
}
