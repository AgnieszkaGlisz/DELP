import { TranslateWordTemplate } from './../_interfaces/translateWordTemplate';
import { Wordset } from './../_interfaces/wordset';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
// import { WORDS } from '../words-mock';
import { Injectable } from '@angular/core';
import { identity, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsetService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  url: string = `http://25.95.136.77:3500`;

  httpOptions = {
    headers: new HttpHeaders({ observe: 'body', responseType: 'text' })
  };

  // getWords1(): Observable<TranslateWordTemplate[]> {
  //   this.messageService.add("getWords in wordset srv");
  //   return of(WORDS);
  // }

  getWords(): Observable<any> {
    this.messageService.add("WordsetService: fetched words");
    const url = `http://localhost:3000`;
    return this.http.get(url);
  }

  // getWordset(id :number): Observable<Wordset> {
  //   this.messageService.add("WordsetService: fetched wordset");
  //   return this.http.get<Wordset>(`${this.url}/wordset`);
  // }
  getWordset(idNum :string): Observable<any> {
    this.messageService.add("WordsetService: fetched wordset");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'id': idNum
      })
    };
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('id', idNum);
    // let params = new HttpParams();
    // params.append('id', idNum);
    // return this.http.get<Wordset>(`${this.url}/words`);
    console.log(httpOptions.headers);
    return this.http.get<any>(`${this.url}/words-in-set`, httpOptions);
  }

  saveWordset(wordset: TranslateWordTemplate[]): Observable<any> {
    this.messageService.add("Wordset service: POST wordset");
    return this.http.post<TranslateWordTemplate[]>(`${this.url}/wordset`, wordset);
  }
  // deleteWord()
 
}
