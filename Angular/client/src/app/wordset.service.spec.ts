import { TestBed } from '@angular/core/testing';

import { WordsetService } from './wordset.service';

describe('WordsetService', () => {
  let service: WordsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
