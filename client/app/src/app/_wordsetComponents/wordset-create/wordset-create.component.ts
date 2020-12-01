import { fileInfo } from './../../_interfaces/files';
import { AlertService } from './../../_services/alert.service';
import { ViewOption } from './../../_exercisesComponents/view-option-enum';
import { ExerciseListDirective } from './../../exercise-list.directive';
import { ExerciseTemplateComponent } from './../../exercise-template.component';
import { ExerciseDirective } from './../../exercise.directive';
import { WordExerciseTemplateComponent } from './../../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { SetInfo } from './../../_interfaces/setInfo';
import { Wordset } from './../../_interfaces/wordset';
import { Set } from './../../_interfaces/set';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WordsetService } from '../../_services/wordset.service';
import { UserService } from './../../_services/user.service';
// import { WORDS } from './../words-mock';
import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, ViewChildren, QueryList, ViewContainerRef, AfterViewInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { send } from 'process';
//import { userInfo } from 'os';

@Component({
  selector: 'app-wordset-create',
  templateUrl: './wordset-create.component.html',
  styleUrls: ['./wordset-create.component.css']
})
export class WordsetCreateComponent implements OnInit, AfterViewInit {

  constructor(
    private wordsetService: WordsetService, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private alertService: AlertService,
    ) { }

  files: File[] = [];
  addedFile: fileInfo[] = [];

  set: Set;
  exercise: ExerciseTemplateComponent;

  @ViewChild(ExerciseDirective, {static: true}) exerciseHost: ExerciseDirective;
  @ViewChildren(ExerciseListDirective) exerciseHosts: QueryList<ExerciseListDirective>;
  //proxy1: any; 

  ngOnInit(): void {
    this.set = new Wordset();
    this.set.exercises = new Array<ExerciseTemplateComponent>();
    this.set.setInfo = new SetInfo();
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }
  
  loadComponent(): void {
    this.exercise = new WordExerciseTemplateComponent();
    // this.exercise = new WordExerciseTemplateComponent(ViewOption.Create);
    this.exercise.data = this.exercise;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.exercise.component);
    const viewContainerRef = this.exerciseHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ExerciseTemplateComponent>(componentFactory);
    componentRef.changeDetectorRef.detach();
    componentRef.instance.data = this.exercise.data;
    componentRef.changeDetectorRef.detectChanges();
  }

  loadComponent2(): void {
    if(this.exerciseHosts){
      let index = 0;
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
  
  createWordExercise(): void {
    this.exercise = new WordExerciseTemplateComponent();
    this.exercise.setViewOption(ViewOption.Create);
    // this.exercise = new WordExerciseTemplateComponent(ViewOption.Create);
    this.loadComponent();
  }
  

  addExercise(): void {
    this.exercise.setViewOption(ViewOption.Display);
    let id = this.set.addExerciseToSet(this.exercise);
    // this.set.addExerciseToSet(this.exercise);
    this.createWordExercise(); 
    while (this.files.length != 0){
      let newFile = new fileInfo();
      let imageBuble = this.files.pop();
      newFile.add(imageBuble, id, imageBuble.type)
      this.addedFile.push(newFile);
    }
    this.exerciseHosts.changes.subscribe( x => {this.loadComponent2();})
  }

  saveSet(): void {
    this.set.saveSet();
    if (this.set.setInfo.name){
      this.wordsetService.saveWordset(this.set).subscribe(x => {
        console.log("in save set");
        console.log(this.addedFile.length)
        while(this.addedFile.length > 0){
            this.wordsetService.sendFile(this.addedFile.pop(), x['setId']).subscribe(x => {
             console.log(x)
         });
        }
     });
    }
    else {
      console.log("Didn't give set name")
        this.alertService.error("Fill set name!")
    }
  }

  deleteExercise(exerciseI: ExerciseTemplateComponent): void {
    this.set.deleteExercise(exerciseI);
    this.addedFile = this.addedFile.filter(iteam => iteam.id !== exerciseI.id);
  }

  onSelect(event) {
    console.log(event);
    console.log("In the on select" + this.files.length)
    if (this.files.length < 3) {
      let canAddTheFile = true;
      let correctTypes = true;
      let imageBuble = event.addedFiles[0];
  
      console.log(event.addedFiles[0])
      this.files.forEach(function(value){
        console.log(value.type.split("/", 1)[0] == imageBuble.type.split("/", 1)[0])
        if(value.type.split("/", 1)[0] == imageBuble.type.split("/", 1)[0]){
          canAddTheFile = false;
        }
      })
      if( imageBuble.type.split("/", 1)[0] != 'image' && imageBuble.type.split("/", 1)[0] != 'video' && imageBuble.type.split("/", 1)[0] != 'audio'){
        correctTypes = false;
        this.alertService.error("Can't add the file of a type " + imageBuble.type.split("/", 1)[0] + '!')
      }
  
      if(canAddTheFile && correctTypes){
        this.files.push(...event.addedFiles);
      }
  
      if (!canAddTheFile) {
        this.alertService.error("There is already one " + imageBuble.type.split("/", 1)[0] + '!')
      }
    }
    else {
      this.alertService.warn("You can only add 3 files! (One image, one video, one audio)")
    }
    
    
  
    //this.files.push(...event.addedFiles);
    
    /*let imageBuble = this.f.pop();
    let info = new fileInfo();
  
    info.add(imageBuble, 2, imageBuble.type)
    this.wordsetService.sendFile(info, 5).subscribe(x => {
      console.log(x)
    })*/
    //let formData = new FormData();
    //formData.set("image", imageBuble)
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
}
