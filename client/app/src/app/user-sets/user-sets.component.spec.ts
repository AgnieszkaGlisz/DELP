/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSetsComponent } from './user-sets.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { WordsetService } from '../_services/wordset.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { SetInfo } from '../_interfaces/setInfo';
import { Set } from './../_interfaces/set';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserSetsComponent', () => {
  let component: UserSetsComponent;
  let fixture: ComponentFixture<UserSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSetsComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        Set,
        Component], 
      providers: [WordsetService, 
        UserService, 
        SetInfo]
    })
    .compileComponents();
  });



  it('should have service', (done) => {
    const service: WordsetService = TestBed.get(WordsetService);
    expect(WordsetService).toBeTruthy();
    done();
  });

  it('should have service', () => {
    const user: UserSetsComponent = TestBed.get(UserSetsComponent)
      console.log(component)
      expect(user.getFavourites()).toBeDefined();
        //expect(component).toBeTruthy();
  });
});
*/