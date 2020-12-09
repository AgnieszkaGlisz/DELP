import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
import {By} from '@angular/platform-browser'

import { WordsetDisplayComponent } from './wordset-display.component';

describe('DisplayWordsetComponent', () => {
  let component: WordsetDisplayComponent;
  let fixture: ComponentFixture<WordsetDisplayComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsetDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsetDisplayComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
