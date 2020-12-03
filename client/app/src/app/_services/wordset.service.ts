import { ExerciseTemplateComponent } from './../exercise-template.component';
import { FillSentenceExerciseTemplateComponent } from './../_exercisesComponents/fill-sentence-exercise-template/fill-sentence-exercise-template.component';
import { TranslateSentenceExerciseTemplateComponent } from './../_exercisesComponents/translate-sentence-exercise-template/translate-sentence-exercise-template.component';
import { WordExerciseTemplateComponent } from './../_exercisesComponents/word-exercise-template/word-exercise-template.component';
import { Wordset } from './../_interfaces/wordset';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { identity, Observable, of } from 'rxjs';
import { Set } from '../_interfaces/set';
import {fileInfo} from '../_interfaces/files'
import { Language } from '../_interfaces/language';
@Injectable({
  providedIn: 'root'
})

export class WordsetService {

  constructor(private http: HttpClient) { }

  urlAga: string = `http://25.95.136.77:3500`;
  urlCezar: string = `http://25.68.211.177:3500`;
  urlLocal: string = `http://localhost:3500`;
  url: string = this.urlAga;
  setToDisplayId: string = '0';
  // searchSetsKeyword: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  httpOptionsFile = {
    headers: new HttpHeaders({
      'Content-Type': ''
    })
  }

  getFavourites(): Observable<Set[]> {
    return this.http.get<Set[]>(`${this.url}/user/favourite`, this.httpOptions);
  }

  getSearchedSets(keyword: string,noSound:boolean,noSight:boolean,page:number): Observable<Set[]> {
    if(!page) page =0
    if(!noSound) noSound= false
    if(!noSight) noSight= false
    if(!keyword) keyword= ""
    let data = {
      "userQuery": keyword,
      "noSound": noSound,
      "noSight": noSight,
      "page": page
    }

    return this.http.post<Set[]>(`${this.url}/sets/search`, data, this.httpOptions);
  }

  getUserSets(): Observable<Set[]> {
    return this.http.get<Set[]>(`${this.url}/user/sets`, this.httpOptions);
  }

  getExerciseComponent(exerciseTemplate: string) : Type<any> {
    switch (exerciseTemplate) {
      case "WordExerciseTemplate":
        return WordExerciseTemplateComponent;
      case "TranslateSentenceExerciseTemplate":
        return TranslateSentenceExerciseTemplateComponent;
      case "FillSentenceExerciseTemplate":
        return FillSentenceExerciseTemplateComponent;
    }
  }

  addSetToFavourites(id: string): Observable<any> {
    return this.http.get(`${this.url}/user/favourite/add/${id}`)
  }

  deleteSetFromFavourites(id:string): Observable<any> {
    return this.http.get(`${this.url}/user/favourite/delete/${id}`);
  }

  deleteSet(id:string): Observable<any> {
    return this.http.get(`${this.url}/sets/delete/${id}`);
  }

  getWordset(): Observable<Set> {
    return this.http.get<Set>(`${this.url}/sets/${this.setToDisplayId}`, this.httpOptions);
  }

  newExercise(template: string) {
    switch (template) {
      case "WordExerciseTemplate":
        return new WordExerciseTemplateComponent(this);

      case "TranslateSentenceExerciseTemplate":
        return new TranslateSentenceExerciseTemplateComponent();

      case "FillSentenceExerciseTemplate":
        return new FillSentenceExerciseTemplateComponent();
    }
  }

  saveWordset(wordset: Wordset): Observable<JSON> {
    console.log(wordset);
    return this.http.post<JSON>(`${this.url}/sets/add`, wordset, this.httpOptions);
  }
  
  sendFile(file: fileInfo, setId: number): Observable<any> {
    //console.log(`${this.url}/file/`+ file.type + '?idSet=' +setId +'&id='+ file.id)
    //console.log(`${this.url}/`+file.type+'?idSet='+setId+'&id='+file.id)
    return this.http.post<any>(`${this.url}/files/`+file.type+'?idSet='+setId+'&id='+file.id, file.file);
  }
 
  sendTranslationRequest(languageTo: string, languageFrom: string, text:string): Observable<JSON> {
    //localhost:3500/dict/translation?translateToLang=es&translateFromLang=en&word=hello
    return this.http.post<JSON>(`${this.url}/dict/translation?translateToLang=`+ languageTo + `&translateFromLang=` + languageFrom + '&word='+text, text);
  }

  getAllLanguages(): Observable<Array<Language>> {
    return this.http.get<Array<Language>>(`${this.url}/api/languages`, this.httpOptions);
  }

  getDictLanguageCode(nativeNameLang: string, englishNameLang: string): Observable<any> {
    var query:string = "";
    var isnativeNameLang = false;
    if(nativeNameLang != undefined){
      query='languageNameNative=' + nativeNameLang;
      isnativeNameLang = true;
    }
    else if(englishNameLang != undefined){
      if(isnativeNameLang){
        query+='&';
      }
      query+='languageNameEng=' + englishNameLang;
    }
    console.log()
    return this.http.post<any>(`${this.url}/dict/languageCode?`+query, this.httpOptions);
  }

  detectLang(text:string): Observable<JSON>{
    return this.http.post<JSON>(`${this.url}/dict/detect?text=`+ text, this.httpOptions);
  }

}
