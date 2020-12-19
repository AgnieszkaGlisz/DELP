import { TestBed } from '@angular/core/testing';
import { WordsetService } from './wordset.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { event } from 'jquery';
import { Language } from '../_interfaces/language';

describe('WordsetService', () => {
  let service: WordsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      providers:[UserService]
    });
    service = TestBed.inject(WordsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



/*  getAllLanguages(): Observable<Array<Language>> {
    return this.http.get<Array<Language>>(`${this.url}/api/languages`, this.httpOptions);
  } */

});
