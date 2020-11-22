import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsetDisplayComponent } from './wordset-display.component';

describe('DisplayWordsetComponent', () => {
  let component: WordsetDisplayComponent;
  let fixture: ComponentFixture<WordsetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsetDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
