import { TestBed } from '@angular/core/testing';

import { DisabilitySupportServiceService } from './disability-support-service.service';

describe('DisabilitySupportServiceService', () => {
  let service: DisabilitySupportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisabilitySupportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
