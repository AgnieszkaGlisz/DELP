import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsetCreateComponent } from './wordset-create.component';

describe('CreateWordsetComponent', () => {
  let component: WordsetCreateComponent;
  let fixture: ComponentFixture<WordsetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsetCreateComponent ]
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
