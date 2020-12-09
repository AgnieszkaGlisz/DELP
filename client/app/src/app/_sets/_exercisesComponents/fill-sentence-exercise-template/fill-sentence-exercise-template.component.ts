import { View, ViewOption } from './../view-option-enum';
import { ExerciseTemplateComponent } from '../../../_interfaces/exercise-template.component';
import { Set } from './../../../_interfaces/set';
// import { FillSentenceExerciseTemplate } from './../_interfaces/fillSentenceTemplate';
// import { ExerciseTemplate } from '../_interfaces/exerciseTemplate';
import { Component, Input, OnInit, Type, Injector } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-fill-sentence-exercise-template',
  templateUrl: './fill-sentence-exercise-template.component.html',
  styleUrls: ['./fill-sentence-exercise-template.component.css']
})
export class FillSentenceExerciseTemplateComponent implements ExerciseTemplateComponent {

  constructor(
    private injector:Injector
    ) {
    //   super();
      this.template = "FillSentenceExerciseTemplate";
      this.component = FillSentenceExerciseTemplateComponent;
      this.data = this;

      this.viewOption = new View(ViewOption.Create);
    }

  ngOnInit(): void {
    this.userService = this.injector.get(UserService);
  }

  url: string;
  userService: UserService;

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

  setUrl(url: string) {
    this.url = url;
  }

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

  showHint(): string {
    return this.wordToFill;
  }
  removeError(idclass:string){
    $(idclass).removeClass('bg-error')
  }
}
