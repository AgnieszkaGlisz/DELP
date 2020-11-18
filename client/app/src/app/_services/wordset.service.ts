import { Wordset } from './../_interfaces/wordset';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
// import { WORDS } from '../words-mock';
import { Injectable } from '@angular/core';
import { identity, Observable, of } from 'rxjs';
import { Set } from '../_interfaces/set';

@Injectable({
  providedIn: 'root'
})
export class WordsetService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  urlAga: string = `http://25.95.136.77:3500`;
  urlCezar: string = `http://25.68.211.177:3500`;
  urlLocal: string = `http://localhost:3500`;
  url: string = this.urlCezar;
  setToDisplayId: string = '0';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getFavourites(): Observable<Set[]> {
    return this.http.get<Set[]>(`${this.url}/favourite`, this.httpOptions);
  }

  getUserSets(): Observable<Set[]> {
    return this.http.get<Set[]>(`${this.url}/my-sets`, this.httpOptions);
  }

  // getWordset(idNum :string): Observable<Set> {
    getWordset(): Observable<Set> {
    this.messageService.add("WordsetService: fetched wordset");
    
    // const httpHeaders = this.setHttpOptions();

    console.log("setToDisplayId: ", this.setToDisplayId);

    return this.http.get<Set>(`${this.url}/set/${this.setToDisplayId}`, this.httpOptions);
    // return this.http.get<Set>(`${this.urlAga}/wordset/${idNum}`, this.httpOptions);
  }

  saveWordset(wordset: Wordset): Observable<Set> {
    this.messageService.add("Wordset service: POST wordset");
    console.log(wordset);
    return this.http.post<Set>(`${this.url}/add-set`, wordset, this.httpOptions);
  }
 
}
