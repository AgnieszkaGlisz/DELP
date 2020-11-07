import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWordsetComponent } from './display-wordset.component';

describe('DisplayWordsetComponent', () => {
  let component: DisplayWordsetComponent;
  let fixture: ComponentFixture<DisplayWordsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayWordsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWordsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
