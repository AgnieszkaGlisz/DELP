import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedSetComponent } from './finished-set.component';

describe('FinishedSetComponent', () => {
  let component: FinishedSetComponent;
  let fixture: ComponentFixture<FinishedSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
