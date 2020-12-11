import { AppModule } from './../app.module';
import { TestBed } from '@angular/core/testing';

import { WordsetService } from './wordset.service';

describe('WordsetService', () => {
  let service: WordsetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [ WordExerciseTemplateComponent ],
      imports: [ AppModule ]
    });
    service = TestBed.inject(WordsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
