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

  urlAga: string = `http://25.95.136.77:3500`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getWords(): Observable<any> {
    this.messageService.add("WordsetService: fetched words");
    const url = `http://localhost:3000`;
    return this.http.get(url);
  }

  // setHttpOptions(): HttpHeaders {
  //   const headers = new HttpHeaders({
  //       'Content-Type ': 'application/json',
  //     });

  //     return headers;
  // }

  getFavourites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlAga}/favourite`, this.httpOptions);
  }

  getWordset(idNum :string): Observable<Wordset> {
    this.messageService.add("WordsetService: fetched wordset");
    
    // const httpHeaders = this.setHttpOptions();

    // console.log(httpHeaders);
    return this.http.get<Wordset>(`${this.urlAga}/wordset/${idNum}`, this.httpOptions);
  }

  saveWordset(wordset: TranslateWordTemplate[]): Observable<any> {
    this.messageService.add("Wordset service: POST wordset");
    return this.http.post<TranslateWordTemplate[]>(`${this.urlAga}/wordset`, wordset);
  }
 
}
