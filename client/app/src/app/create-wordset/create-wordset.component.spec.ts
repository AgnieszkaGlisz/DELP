import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordsetComponent } from './create-wordset.component';

describe('CreateWordsetComponent', () => {
  let component: CreateWordsetComponent;
  let fixture: ComponentFixture<CreateWordsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWordsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWordsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
