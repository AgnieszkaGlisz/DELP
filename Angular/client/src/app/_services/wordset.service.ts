import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { WORDS } from '../words-mock';
import { TranslateWordTemplate } from '../_interfaces/translateWordTemplate';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsetService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  url: string = `http://localhost:3000`;

  httpOptions = {
    headers: new HttpHeaders({ observe: 'body', responseType: 'text'})
  };

  getWords1(): Observable<TranslateWordTemplate[]> {
    this.messageService.add("getWords in wordset srv");
    return of(WORDS);
  }

  getWords(): Observable<any> {
    this.messageService.add("WordsetService: fetched words");
    const url = `http://localhost:3000`;
    return this.http.get(url);
  }

  getWordset(id :number): Observable<any> {
    this.messageService.add("WordsetService: fetched words");
    return this.http.get(`${this.url}/wordset/${id}`);
  }

  // deleteWord()
 
}
