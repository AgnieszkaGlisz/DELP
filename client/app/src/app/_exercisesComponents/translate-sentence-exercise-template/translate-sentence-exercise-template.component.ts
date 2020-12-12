import { View, ViewOption } from './../view-option-enum';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { Set } from './../../_interfaces/set';
import { Component, Input, OnInit, Type, Injector } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { WordsetService } from 'src/app/_services/wordset.service';

@Component({
  selector: 'app-translate-sentence-exercise-template',
  templateUrl: './translate-sentence-exercise-template.component.html',
  styleUrls: ['./translate-sentence-exercise-template.component.css']
})
export class TranslateSentenceExerciseTemplateComponent implements ExerciseTemplateComponent, OnInit {

    constructor(private injector:Injector) {
        this.template = "TranslateSentenceExerciseTemplate";
        this.component = TranslateSentenceExerciseTemplateComponent;
        this.data = this;

        this.viewOption = new View(ViewOption.Create);
    }

    ngOnInit() {
      this.userService = this.injector.get(UserService);
    }

    url: string;
    userService: UserService;

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

    // public addExerciseToSet(set: Set) {
    //     // super.addExerciseToSet(set);
    //     this.template = "TranslateSentenceExerciseTemplate";
    //     let exerciseCopy = new TranslateSentenceExerciseTemplateComponent();
    //     let sth = Object.assign(exerciseCopy, this);
        
    //     set.exercises.push(exerciseCopy);
    // }

    setViewOption(view: ViewOption) {
      this.viewOption.type = view;
    }

    setUrl(url: string) {
      this.url = url;
    }

    toJSON() {
        return {
          "id": this.id,
          "template": this.template,
          "oryginalSentence": this.oryginalSentence,
          "translatedSentence": this.translatedSentence,
      }
    }

    checkAnswer(): boolean {
      if (this.data.answer == this.translatedSentence)
      {
        return true;
      }
      else return false;
    }

    showHint(): string {
      return this.translatedSentence;
    }
    removeError(idclass:string){
      $(idclass).removeClass('bg-error')
    }

    
  Translate() {
    console.log("xd")
    var inputValue = (<HTMLInputElement>document.getElementById("translationWord")).value;
    console.log("in translate" + inputValue + "  -  " + localStorage.getItem('targetLang'));
    if(inputValue == undefined || inputValue == ""){
      alert("There is no word to translate");
    }
    else {
        if (localStorage.getItem('targetLang') == undefined)
        {
          alert("No target language specified");
        }

        else {
          if(localStorage.getItem('startLang') == undefined){
            this.injector.get(WordsetService).detectLang(inputValue).subscribe( x => {
              console.log(x[0].language);
            });
          }
          else {
            this.injector.get(WordsetService).getDictLanguageCode(localStorage.getItem('startLang'), "").subscribe(fromLang => {
              console.log("fromLang: " + fromLang.lang);
              this.injector.get(WordsetService).getDictLanguageCode(localStorage.getItem('targetLang'), "").subscribe(toLang => {
                console.log("2" + toLang.lang);
                console.log("fromLang: " + fromLang.lang);
                this.injector.get(WordsetService).sendTranslationRequest(toLang.lang, fromLang.lang, inputValue).subscribe(t => {
                  console.log(t[0].translations[0].text);
                  (<HTMLInputElement>document.getElementById("inputTranslationWord")).value = t[0].translations[0].text; 
                  this.data.translatedSentence =  t[0].translations[0].text;
                })
              })
            });
          }
        }    
    }
  }
}
