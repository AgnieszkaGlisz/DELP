import { MessageService } from './message.service';
import { WORDS } from './words-mock';
import { TranslateWordTemplate } from './translateWordTemplate';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsetService {

  constructor(private messageService: MessageService) { }

  getWords(): Observable<TranslateWordTemplate[]> {
    this.messageService.add("getWords in wordset srv");
    return of(WORDS);
  }
}
