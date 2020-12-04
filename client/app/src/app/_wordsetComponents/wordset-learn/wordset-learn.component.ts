import { DisabilitySupportServiceService,  ViewProbabilities } from './../../_services/disability-support-service.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../_interfaces/user';
import { Set } from './../../_interfaces/set';
import { ExerciseDirective } from './../../exercise.directive';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { Wordset } from './../../_interfaces/wordset';
import { WordsetService } from './../../_services/wordset.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ViewOption } from 'src/app/_exercisesComponents/view-option-enum';

@Component({
  selector: 'app-wordset-learn',
  templateUrl: './wordset-learn.component.html',
  styleUrls: ['./wordset-learn.component.css']
})
export class WordsetLearnComponent implements OnInit, AfterViewInit {

  constructor(
    private wordsetService: WordsetService,
    private userService: UserService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private disabilitySupportServiceService: DisabilitySupportServiceService,
    ) { }

  user: User;

  set: Set;
  // exercise: ExerciseTemplateComponent;
  exercise: ExerciseTemplateComponent;// = new ExerciseTemplateComponent();
  // answer: any = { value: ''};
  wordIndex: number;
  result: string = "";
  hint: string ="";

  correctAnswer: boolean;

  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;

  ngOnInit(): void {
    this.wordIndex = -1;
    this.set = new Set();
    this.user = new User();
    this.user = this.userService.getUserData();
    // this.exercise= new ExerciseTemplateComponent();
    // this.exercise= new WordExerciseTemplateComponent();
    // this.getWordset();
    // this.exercise= <WordExerciseTemplateComponent>this.wordset.exercises[0];
  }

  ngAfterViewInit(): void {
    this.getWordset();
    // this.loadComponent();
  }

  recalculateProbabilities(): ViewProbabilities {
    let viewProbabilities = new ViewProbabilities();

    if (this.user.preferences.noSound && this.user.preferences.noSight) {
      Object.assign(viewProbabilities, this.disabilitySupportServiceService.videoAudio)
      // viewProbabilities = this.disabilitySupportServiceService.videoAudio;
    }
    else if (!this.user.preferences.noSound && this.user.preferences.noSight) {
      Object.assign(viewProbabilities, this.disabilitySupportServiceService.noVideoAudio)
      // viewProbabilities = this.disabilitySupportServiceService.noVideoAudio;
    }
    else if (this.user.preferences.noSound && !this.user.preferences.noSight) {
      Object.assign(viewProbabilities, this.disabilitySupportServiceService.videoNoAudio)
      // viewProbabilities = this.disabilitySupportServiceService.videoNoAudio;
    }
    else if (!this.user.preferences.noSound && !this.user.preferences.noSight) {
      Object.assign(viewProbabilities, this.disabilitySupportServiceService.noVideoNoAudio)
      // viewProbabilities = this.disabilitySupportServiceService.noVideoNoAudio;
    }

    if (this.exercise.audioPath && this.exercise.picturePath && this.exercise.videoPath) {
      console.log("wszystko");
      ;
    }
    else if (!this.exercise.audioPath && this.exercise.picturePath && this.exercise.videoPath) {
      console.log("obraz i video");
      viewProbabilities.imageProbability += viewProbabilities.audioProbability * viewProbabilities.imageProbability / (100 - viewProbabilities.audioProbability);
      viewProbabilities.videoProbability += viewProbabilities.audioProbability * viewProbabilities.videoProbability / (100 - viewProbabilities.audioProbability);
      viewProbabilities.nothingProbability += viewProbabilities.audioProbability * viewProbabilities.nothingProbability / (100 - viewProbabilities.audioProbability);
      viewProbabilities.audioProbability = 0;
    }
    else if (this.exercise.audioPath && !this.exercise.picturePath && this.exercise.videoPath) {
      console.log("audio i video");
      viewProbabilities.audioProbability += viewProbabilities.imageProbability * viewProbabilities.audioProbability / (100 - viewProbabilities.imageProbability);
      viewProbabilities.videoProbability += viewProbabilities.imageProbability * viewProbabilities.videoProbability / (100 - viewProbabilities.imageProbability);
      viewProbabilities.nothingProbability += viewProbabilities.imageProbability * viewProbabilities.nothingProbability / (100 - viewProbabilities.imageProbability);
      viewProbabilities.imageProbability = 0;
    }
    else if (this.exercise.audioPath && this.exercise.picturePath && !this.exercise.videoPath) {
      console.log("audio i obraz");
      viewProbabilities.audioProbability += viewProbabilities.videoProbability * viewProbabilities.audioProbability / (100 - viewProbabilities.videoProbability);
      viewProbabilities.imageProbability += viewProbabilities.videoProbability * viewProbabilities.imageProbability / (100 - viewProbabilities.videoProbability);
      viewProbabilities.nothingProbability += viewProbabilities.videoProbability * viewProbabilities.nothingProbability / (100 - viewProbabilities.videoProbability);
      viewProbabilities.videoProbability = 0;
    }
    else if (!this.exercise.audioPath && !this.exercise.picturePath && this.exercise.videoPath) {
      console.log("video");
      viewProbabilities.videoProbability += (viewProbabilities.audioProbability + viewProbabilities.imageProbability) * viewProbabilities.videoProbability / (100 - viewProbabilities.imageProbability - viewProbabilities.audioProbability);
      viewProbabilities.nothingProbability += (viewProbabilities.audioProbability + viewProbabilities.imageProbability) * viewProbabilities.nothingProbability / (100 - viewProbabilities.imageProbability - viewProbabilities.audioProbability);
      viewProbabilities.imageProbability = 0;
      viewProbabilities.audioProbability = 0;
    }
    else if (this.exercise.audioPath && !this.exercise.picturePath && !this.exercise.videoPath) {
      console.log("audio");
      viewProbabilities.audioProbability += (viewProbabilities.videoProbability + viewProbabilities.imageProbability) * viewProbabilities.audioProbability / (100 - viewProbabilities.imageProbability - viewProbabilities.videoProbability);
      viewProbabilities.nothingProbability += (viewProbabilities.videoProbability + viewProbabilities.imageProbability) * viewProbabilities.nothingProbability / (100 - viewProbabilities.imageProbability - viewProbabilities.videoProbability);
      viewProbabilities.videoProbability = 0;
      viewProbabilities.imageProbability = 0;
    }
    else if (!this.exercise.audioPath && this.exercise.picturePath && !this.exercise.videoPath) {
      console.log("obraz");
      viewProbabilities.imageProbability += (viewProbabilities.videoProbability + viewProbabilities.audioProbability) * viewProbabilities.imageProbability / (100 - viewProbabilities.audioProbability - viewProbabilities.videoProbability);
      viewProbabilities.nothingProbability += (viewProbabilities.videoProbability + viewProbabilities.audioProbability) * viewProbabilities.nothingProbability / (100 - viewProbabilities.audioProbability - viewProbabilities.videoProbability);
      viewProbabilities.videoProbability = 0;
      viewProbabilities.audioProbability = 0;
    }
    else if (!this.exercise.audioPath && !this.exercise.picturePath && !this.exercise.videoPath) {
      console.log("nic");
      viewProbabilities.nothingProbability = 100;
      viewProbabilities.audioProbability = 0;
      viewProbabilities.videoProbability = 0;
      viewProbabilities.imageProbability = 0;
    }

    return viewProbabilities;
  }

  setLearnView(): void {
    let viewProbabilities = this.recalculateProbabilities();

    let percent = Math.random() * 100;
    console.log(percent)
    console.log("audio: ", viewProbabilities.audioProbability);
    console.log("image: ", viewProbabilities.imageProbability);
    console.log("video: ", viewProbabilities.videoProbability);
    console.log("nothing: ", viewProbabilities.nothingProbability);
    if (percent < viewProbabilities.audioProbability) {
      this.exercise.setViewOption(ViewOption.LearnAudio);
    }
    else if (percent < viewProbabilities.audioProbability + viewProbabilities.imageProbability) {
      this.exercise.setViewOption(ViewOption.LearnImage);
    }
    else if (percent < viewProbabilities.audioProbability + viewProbabilities.imageProbability + viewProbabilities.videoProbability) {
      this.exercise.setViewOption(ViewOption.LearnVideo);
    }
    else {
      this.exercise.setViewOption(ViewOption.Learn);
    }

  }

  loadComponent(): void {
    this.correctAnswer = true;
    this.exercise.data = this.exercise;
    this.exercise.setUrl(this.wordsetService.url);
        // this.exercise.setViewOption(ViewOption.LearnImage);
    this.setLearnView();
    

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);

    componentRef.changeDetectorRef.detach();
    componentRef.instance.data = this.exercise.data;
    componentRef.changeDetectorRef.detectChanges();
  }

  shuffle(array): any {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  getWordset(): void {
    this.wordsetService.getWordset().subscribe(
      x => {
        this.set = new Set();
        Object.assign(this.set, x);
        this.set = x;
        let idx = 0;
        this.exercise = this.wordsetService.newExercise(this.set.exercises[0].template);
        x.exercises.forEach(exer => {
          this.set.exercises[idx] = this.wordsetService.newExercise(exer.template);
          Object.assign(this.set.exercises[idx], exer);
          console.log(this.set.exercises[idx])
          idx++;
        })
        this.shuffle(this.set.exercises)
        this.nextWord();
        // this.loadComponent();
  },
      err => console.log('HTTP Error: ', err)
    )
  }

  nextWord(): void {
    this.result = "";
    this.hint = "";
    this.correctAnswer == true;
    this.exercise.data.answer = '';
    if(this.wordIndex < this.set.exercises.length - 1)
    {
      this.wordIndex += 1;
      // this.word
      this.exercise= this.set.exercises[this.wordIndex];
    }
    else
    {
      this.result = "You've finished this set!";
    }
    this.loadComponent();
  }

  showHint(): void {
    this.hint = this.exercise.showHint();
  }

  checkWord(): void {
    this.correctAnswer = this.exercise.checkAnswer();
    if (this.correctAnswer) {
      this.result = "Correct!";
      this.nextWord();
    }
    else {
      this.result = "Wrong :c";
    }
    // if (this.exercise.data.answer == this.exercise.translation.toString())
    // {
    //     this.result = "Correct!";
    // }
    // else
    // {
    //     this.result = "Wrong :c";
    // }
    // console.log(this.exercise.translation);
    // console.log(this.answer.value);
  }

}
