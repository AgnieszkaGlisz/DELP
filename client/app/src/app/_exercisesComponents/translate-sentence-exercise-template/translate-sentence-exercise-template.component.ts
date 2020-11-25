import { View, ViewOption } from './../view-option-enum';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { Set } from './../../_interfaces/set';
import { Component, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-translate-sentence-exercise-template',
  templateUrl: './translate-sentence-exercise-template.component.html',
  styleUrls: ['./translate-sentence-exercise-template.component.css']
})
export class TranslateSentenceExerciseTemplateComponent implements ExerciseTemplateComponent {

    constructor() {
        this.template = "TranslateSentenceExerciseTemplate";
        this.component = TranslateSentenceExerciseTemplateComponent;
        this.data = this;

        this.viewOption = new View(ViewOption.Create);
        }


    template: "TranslateSentenceExerciseTemplate";
    oryginalSentence: string;
    translatedSentence: string;
    answer: string;

    @Input() data: any = this;
    component: Type<any>;
    viewOption: any;
    ViewOption = ViewOption;

    id: number;
    videoPath: string;
    audioPath: string;
    picturePath: string;

    public addExerciseToSet(set: Set) {
        // super.addExerciseToSet(set);
        this.template = "TranslateSentenceExerciseTemplate";
        let exerciseCopy = new TranslateSentenceExerciseTemplateComponent();
        let sth = Object.assign(exerciseCopy, this);
        
        set.exercises.push(exerciseCopy);
    }

    setViewOption(view: ViewOption) {
      this.viewOption.type = view;
    }

    toJSON() {
        return {
          "id": this.id,
          "template": this.template,
          "oryginalSentence": this.oryginalSentence,
          "translatedSentence": this.translatedSentence,
      }
    }
}
