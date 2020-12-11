
import { TestBed } from '@angular/core/testing';
import { FileSendingService } from './file-sending.service';

describe('FileSendingService', () => {
  let service: FileSendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  
});
