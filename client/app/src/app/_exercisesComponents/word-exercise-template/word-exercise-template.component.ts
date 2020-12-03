import { WordsetService } from './../../_services/wordset.service';
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
    // console.log(this.data.picturePath);
  }

  // wordsetService: WordsetService;
  url: string;

  @Input() data: any;
  word: string;
  translation: string;
  answer: string
  
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

  setUrl(url: string) {
    this.url = url;
    console.log(url);
    if(this.picturePath) {
      let tmpPicturePath = this.picturePath.substring(1);
      this.picturePath = url+'/files'+tmpPicturePath;
      console.log(this.picturePath);
  }
    if(this.audioPath) {
      let tmpAudioPath = this.audioPath.substring(1);
      this.audioPath = url+'/files'+tmpAudioPath;
    }
    if(this.videoPath) {
      let tmpVideoPath = this.videoPath.substring(1);
      this.videoPath = url+'/files'+tmpVideoPath;
    }
    // console.log(this.picturePath)
    
    // console.log(this.picturePath);
  }

  setViewOption(view: ViewOption) {
    this.viewOption.type = view;
  }

  checkAnswer(): boolean {
    if (this.data.answer == this.translation) {
      return true;
    }
    else return false;
  }

  showHint(): string {
    return this.translation;
  }

  Translate() {
    var inputValue = (<HTMLInputElement>document.getElementById("translationWord")).value;
    console.log(inputValue);
    
  }
}
