import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserPreferences } from './../_interfaces/userPreferences';
import { HttpClient, HttpClientModule, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';
import { Observable, of } from 'rxjs';
import { WordsetService } from './wordset.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { event } from 'jquery';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule, RouterTestingModule,
        HttpTestingController, HttpClientTestingModule  ],
        providers: [WordsetService, UserPreferences,User ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //it('get user info', () => {
  //  expect(service.getUserInfo().subscribe((event : Observable<any>) => {
//
//    }))
 // })

 const userInfo = [
  { 
    "userInfo":{
        "username": "test",
        "password": "test",
        "email": "test@test.test",
        "name": "Test",
        "surname": "Test",
        "birthday": "2010-10-10",
        "idFirstLanguage": 1
    },
    "preferences":{
        "idColorSets":1,
        "fontSize":null,
        "noSound":null
    }
} ];

 it('have userData', () => {
   expect(service.getUserData().)
 })
 /*getUserData(): User {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData)
    return userData;
    
    export class User {
    id: number;
    userInfo: UserInfo;
    
    export class UserInfo {
    username: string;
    password: string;
    email: string;
    name: string;
    surname: string;
    birthday: string;
    idFirstLanguage: number;
}

    */
}


});
