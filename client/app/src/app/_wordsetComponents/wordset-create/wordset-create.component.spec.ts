import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  ViewContainerRef } from '@angular/core';
import { WordsetCreateComponent } from './wordset-create.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateWordsetComponent', () => {
  let component: WordsetCreateComponent;
  let fixture: ComponentFixture<WordsetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsetCreateComponent ],
      imports:[RouterTestingModule, HttpClientModule, NgxDropzoneModule,MatSelectModule, 
        MatFormFieldModule,ReactiveFormsModule],
      providers:[ViewContainerRef]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
